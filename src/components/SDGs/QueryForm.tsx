import React, { useRef } from "react";
import type { ActionType, ProColumns } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import { ProTable } from '@ant-design/pro-components'; 
import { Button, Divider, Modal, Space } from "antd"; 
import { SDGsItems } from "../SDGs/data";

 
const QueryForm: React.FC<{}> = (props) => {
    const { modalVisible, onCancel, setRecord ,title,sdgsId} = props; 
     
    const actionRef = useRef<ActionType>();  
  
  
    let searchType = new Map();
    searchType.set("TI", "題名");
    searchType.set("ISBN", "ISBN");

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
            title: "",
            dataIndex: "searchField", 
            hideInTable: true,
            valueEnum: searchType,
            initialValue: "TI"
        },
        {
            title: "",
            dataIndex: "searchInput", 
            hideInTable: true,
        },
        {
          title: '題名',
          dataIndex: 'title', 
          ellipsis: true,  
          width: 300, 
          hideInSearch: true,
        }, 
        { 
          title: 'ISBN',
          dataIndex: 'isbn', 
          ellipsis: true,  
          hideInSearch: true,
        }, 
        { 
            title: '出版社',
            dataIndex: 'publisher', 
            ellipsis: true,   
            hideInSearch: true,
          },   
          { 
            title: '出版年',
            dataIndex: 'pubyear', 
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
                        setRecord(record);
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
        {sdgsId !== 0 ? (
         <Modal destroyOnClose title={title} visible={modalVisible} onCancel={() => onCancel()} width={1000} footer={null}>  
            <Divider /> 
            <ProTable<SDGsItems>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                request={(params) => {
                    return request<{
                    data: SDGsItems[];
                
                    }>('../../hysdgs/search', {
                    params,
                    });
                }} 
                editable={{
                    type: 'multiple',
                }} 
                rowKey="id"
                params={{
                    sdgsId: sdgsId,
                    maincodeId:1, 
                }}
                search={{
                    labelWidth: 'auto',
                }} 
                options={{
                    setting: {
                    listsHeight: 400,
                    },
                }} 
                pagination={{ 
                    showSizeChanger: true,
                    onChange: (page) => console.log(page),
                }}
                dateFormatter="string"  
            /> 
            <Divider />
        </Modal>
        ) : (
            <></>
        )}</>
    );
};

export default QueryForm;
