import React, {useState} from 'react';
import {Input, Button, Table, Statistic, Col, Row} from 'antd';
import './LabelAdder.css'

export type Label = {
    label: string,
    probability: number
}

type LabelAdderProps = {
    labels: Label[],
    setLabels: (labels: Label[]) => void,
    handlePredictClick: (event: React.MouseEvent) => void
}

const LabelAdder: React.FC<LabelAdderProps> = ({labels, setLabels, handlePredictClick}) => {
    const [newLabel, setNewLabel] = useState('');

    const handleLabelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewLabel(event.target.value);
    };

    const handleLabelAdd = () => {
        if (newLabel) {
            setLabels([...labels, {label: newLabel, probability: 0}]);
            setNewLabel('');
        }
    };

    const handleLabelDelete = (index: number) => {
        const newLabels = [...labels];
        newLabels.splice(index, 1);
        setLabels(newLabels);
    };

    const columns = [
        {
            title: 'Label',
            dataIndex: 'label',
            key: 'label',
        },
        {
            title: 'Confidence',
            dataIndex: 'probability',
            key: 'probability',
            render: (probability: number) => <Statistic value={probability}/>,
            sorter: (a: any, b: any) => a.probability - b.probability,
        },
        {
            title: 'Action',
            key: 'action',
            render: (value: any, label: Label, index: number) => (
                <Button type="link" onClick={() => handleLabelDelete(index)}>
                    Delete
                </Button>
            ),
        },
    ];
    return (
        <div>
            <Row gutter={16} justify="space-between">
                <Col span={16}>
                    <Row gutter={16}>
                        <Col>
                            <Input placeholder="Label to add" value={newLabel} onChange={handleLabelChange}
                                   onPressEnter={handleLabelAdd}/>
                        </Col>
                        <Col>
                            <Button type="primary" onClick={handleLabelAdd}>
                                Add Label
                            </Button>
                        </Col>
                    </Row>

                </Col>
                <Col>
                    <Button type="primary" onClick={handlePredictClick}>
                        Predict
                    </Button>
                </Col>
            </Row>
            <Table dataSource={labels} columns={columns} rowKey="label" pagination={false} style={{marginTop: 20}}/>
        </div>
    );
};

export default LabelAdder;
