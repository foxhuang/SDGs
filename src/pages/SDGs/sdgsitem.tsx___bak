import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, {   useRef  } from "react";
import Tab from '../../components/SDGs/Tab'; 
 

 
type SDGsItems = {
  url: string;
  id: number;
  number: number;
  title: string;
  source: string;
  isshow: string;
  insert_date: string; 
};

const SDGsItem: React.FC<{}>  = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  let maincodeId = 81001; 
  let isshow = 1; 

  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
        sdgsId = parseInt(q[1]);
    } else if (q[0] === 'maincodeId') {
        maincodeId = parseInt(q[1]);
    } else if (q[0] === 'isshow') {
        isshow = parseInt(q[1]);
    } 
  }); 
  const actionRef = useRef<ActionType>(); 
  const columns: ProColumns<SDGsItems>[] = [
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
      title: '資料來源',
      dataIndex: 'source', 
      ellipsis: true,  
      hideInSearch: true,
    },   
    
    { 
      title: '前台顯示',
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
    }, 
    {
        title: '新增時間',
        key: 'showTime',
        dataIndex: 'insert_date',
        valueType: 'date', 
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
     title={"SDGs "+sdgsId} 
      match={{ url: '/sdgs', path: '/sdgsitem' ,sdgsId:sdgsId }}
      location={{ pathname: 'sdgsitem' }}
    >
    <ProTable<SDGsItems>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return request<{
          data: SDGsItems[];
        }>('http://10.10.24.76/HyLibMainDEV/hysdgs/getSDGsItem', {
          params,
        });
      }}
       
      editable={{
        type: 'multiple',
      }}
       
      rowKey="id"
      params={{
        sdgsId: sdgsId,
        maincodeId:maincodeId,
        isshow:isshow,
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
export default SDGsItem;