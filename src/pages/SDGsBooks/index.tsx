import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, {   useRef  } from "react";
import Tab from '../../components/SDGs/Tab'; 
 

 
type SDGsBooksItem = {
  url: string;
  id: number;
  number: number;
  title: string;
  isbn: string;
  pubyear: string;
  source: string;
  insert_date: string;
  marcId: string;
  isshow: string;
};

const SDGsBooks: React.FC<{}>  = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
      sdgsId = parseInt(q[1]);
    } 
  }); 
  const actionRef = useRef<ActionType>(); 
  const columns: ProColumns<SDGsBooksItem>[] = [
    {
      title: "#",
      dataIndex: "seq",
      hideInSearch: true,
      hideInForm: true,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "id",
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true,
      width: 30,
    },
    {
      title: '題名',
      dataIndex: 'title', 
      ellipsis: true,  
      width: 300,
    },
    { 
      title: 'ISBN',
      dataIndex: 'isbn', 
      ellipsis: true,  
    },
    { 
      title: '出版年',
      dataIndex: 'pubyear', 
      ellipsis: true,  
      hideInSearch: true,
    }, 
    { 
      title: '資料來源',
      dataIndex: 'source', 
      ellipsis: true,  
      hideInSearch: true,
    },   
    {
      title: '新增時間',
      key: 'showTime',
      dataIndex: 'insert_date',
      valueType: 'date', 
      hideInSearch: true,
    }, 
    { 
      title: '館內有書',
      dataIndex: 'marcId', 
      valueEnum: { 
        0: {
          text: '無', 
        },
        1: {
          text: '有',  
        }, 
      },
      ellipsis: true,  
      hideInSearch: true,
    },   
    { 
      title: '是否顯示',
      dataIndex: 'isshow', 
      valueEnum: { 
        0: {
          text: '否', 
        },
        1: {
          text: '是',  
        }, 
      },
      ellipsis: true,  
      hideInSearch: true,
    },     
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [ 
        <a
          key="editable"
          onClick={() => {
            action?.startEditable?.(record.id);
          }}
        >
          編輯
        </a>,
        <a
        key="editable"
        onClick={() => {
          action?.startEditable?.(record.id);
        }}
      >
        刪除
      </a>,
        <a href={record.url} target="_blank" rel="noopener noreferrer" key="view">
          查看
        </a>
      ],
    },
  ];

  return (  
    <Tab
      match={{ url: '/', path: '/' }}
      location={{ pathname: '/sdgsbooks' }}
    >
    <ProTable<SDGsBooksItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return request<{
          data: SDGsBooksItem[];
        }>('http://10.10.24.76/HyLibMainDEV/hysdgs/getSDGsBooks', {
          params,
        });
      }}
       
      editable={{
        type: 'multiple',
      }}
       
      rowKey="id"
      params={{
        sdgsId: sdgsId,
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
    </Tab> 
 
  );
};
export default SDGsBooks;