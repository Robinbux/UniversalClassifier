import React, {useState} from 'react';
import axios from 'axios';
import { Col, Row, message} from 'antd';
import ImageUploader from './modules/ImageUploader';
import LabelAdder, {Label} from './modules/LabelAdder';
import './App.css'

const App: React.FC = () => {
    const [labels, setLabels] = useState<Label[]>([]);
    const [image, setImage] = useState<File | null>(null);
    const [messageApi, contextHolder] = message.useMessage();

    const handlePredictClick = (event: React.MouseEvent) => {
        console.log('JO')
        if (labels.length === 0 || !image) {
            messageApi.open({
                type: 'error',
                content: 'Please provide both labels and an image to predict'
            });
            return;
        }

        const formData = new FormData();
        formData.append('labels', JSON.stringify(labels.map((label) => label.label)));
        formData.append('image', image, image.name);

        axios
            .post('http://localhost:8000/predict/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response: any) => {
                // Update the label table with the predicted probabilities
                setLabels(
                    labels.map((label, index) => {
                        return {
                            label: label.label,
                            probability: response.data[0][index].toFixed(2),
                        };
                    })
                );
            })
            .catch((error: any) => {
                console.error(error);
            });
    };

    return (
        <Row justify="center">
            {contextHolder}
            <Col sm={10} >
                <ImageUploader image={image} setImage={setImage}/>
                <div style={{ margin: 20 }}>
                    <LabelAdder labels={labels} setLabels={setLabels} handlePredictClick={handlePredictClick}/>
                </div>

            </Col>
        </Row>
    );
}

export default App;
