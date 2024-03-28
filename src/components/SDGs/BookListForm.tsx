import {  Button, Divider, Modal } from "antd";
import type { ActionType, ProColumns } from '@ant-design/pro-components';  
import React, { useEffect, useState ,useRef} from "react";
import { ProTable } from '@ant-design/pro-components'; 
import { SDGsItems } from "../SDGs/data";
import request from 'umi-request'; 

const BookListForm: React.FC<{}> = (props) => {
    const { modalVisible, onCancel,isbn} = props; 
    const actionRef = useRef<ActionType>();  
    const openNewWindow = (url: string) => {
        // Specify your URL and other window.open parameters
        window.open(url, '_blank')
        
      };

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
            title: 'ISBN', 
            ellipsis: true,  
            hideInSearch: true,
            render: (_, record: any) => {
                return record.isbn === "" || record.isbn  === null ? isbn: record.isbn ;
            },
        },
        {
            title: '題名',
            dataIndex: 'title', 
            ellipsis: true,   
            hideInSearch: true,
        },  
        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            width: 300,
            render: (_, record: any) => {
            return ( 
                <><Button
                type="default"
                onClick={() => {
                    openNewWindow(record.url);
                }}
                >
                詳細
                </Button></>);
            },
        },
         
      ];

  return (
    <>
    <Modal destroyOnClose title="館內有書" visible={modalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
        <Divider /> 
        <ProTable<SDGsItems>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={(params) => {
                return request<{
                data: SDGsItems[];
            
                }>('../../hysdgs/searchISBN', {
                params,
                });
            }} 
            editable={{
                type: 'multiple',
            }} 
            rowKey="id"
            params={{
                isbn: isbn, 
            }}
            search={false}  
            options={{ setting: false }}
            pagination={{ 
                showSizeChanger: true,
                onChange: (page) => console.log(page),
            }}
            dateFormatter="string"  
        /> 
        <Divider />
    </Modal> 
    </>
  );
};

export default BookListForm;
