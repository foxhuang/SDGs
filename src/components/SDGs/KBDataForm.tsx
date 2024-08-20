import React, { useRef } from "react";
import type { ActionType, ProColumns } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import { ProTable } from '@ant-design/pro-components'; 
import { Button, Divider, Modal, Space } from "antd"; 
import { SDGsItems } from "../SDGs/data";

 
const KBDataForm: React.FC<{}> = (props) => {
    const { modalVisible, onCancel, setKBRecord ,GPTData} = props;  
    const columns: ProColumns<SDGsItems>[] = [
        {
          title: "#",
          dataIndex: "seq",
          hideInSearch: true,
          hideInForm: true,
          width: 50,
          render: (text, record, index) => {
            return index + 1;
          },
        }, 
        {
          title: '題名',
          dataIndex: 'title', 
          ellipsis: true,  
          width: 300, 
          hideInSearch: true,
        },
        { 
          title: '來源',
          dataIndex: 'source', 
          ellipsis: true,  
          hideInSearch: true,
        },   
        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            width: 100,
            render: (_, record: any) => {
                return (<Space> 
                <Button
                    type="default"
                    onClick={() => {
                        setKBRecord(record);
                    }}
                >
                    選取
                </Button>  
                </Space>);
            }, 
        },
      ];

    return (
        <>  
         <Modal destroyOnClose   visible={modalVisible} onCancel={() => onCancel()} width={1000} footer={null}>  
            <Divider /> 
            <ProTable 
                columns={columns}
                dataSource={GPTData.data}
                search={false}  
                pagination={false}   
                rowKey="id"  
                dateFormatter="string"  
            /> 
            <Divider />
        </Modal>
       </>
    );
};

export default KBDataForm;
