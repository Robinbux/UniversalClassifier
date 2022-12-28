import React, { useState } from 'react';
import { Card, Image, Upload, FloatButton } from 'antd';
import {InboxOutlined} from '@ant-design/icons';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrashAlt} from "@fortawesome/free-solid-svg-icons";
import './ImageUploader.css'

type ImageUploaderProps = {
    image: File | null;
    setImage: (file: File | null) => void;
};

const ImageUploader: React.FC<ImageUploaderProps> = ({ image, setImage }) => {
    const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(null);

    const handleImageChange = (file: File) => {
        setImage(file || null);
        if (file) {
            setPreviewImageUrl(URL.createObjectURL(file));
        }
    };

    const handleImageRemove = () => {
        setImage(null);
        setPreviewImageUrl(null);
    };

    const handleImageDrop = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setImage(file);
        setPreviewImageUrl(URL.createObjectURL(file));
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
        event.preventDefault();
    };

    return (
        <Card key="light" title="Image to classify" style={{ minHeight: 300 }}>
            <div
                className="image-uploader"
                onDrop={handleImageDrop}
                onDragOver={handleDragOver}
            >
                {previewImageUrl ? (
                    <div className="image-container">
                        <Image src={previewImageUrl} alt="Uploaded" className='image' />
                        <FloatButton
                            onClick={handleImageRemove}
                            className="delete-btn"
                            icon={<FontAwesomeIcon icon={faTrashAlt} color="red" />}
                            type="default"
                        />
                    </div>
                ) : (
                    <Upload.Dragger
                        name="file"
                        accept="image/*"
                        customRequest={() => {}}
                        beforeUpload={handleImageChange}
                    >
                        <p className="ant-upload-drag-icon">
                            <InboxOutlined />
                        </p>
                        <p className="ant-upload-text">
                            Click or drag file to this area to upload
                        </p>
                        <p className="ant-upload-hint">
                            Support for a single or bulk upload.
                        </p>
                    </Upload.Dragger>
                )}
            </div>
        </Card>
    );

}

export default ImageUploader;
