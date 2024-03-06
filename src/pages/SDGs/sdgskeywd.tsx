import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/SDGs/Tab'; 
import {  getSDGs   } from "../service";

 
type SDGsItems = {
  url: string;
  id: number;
  number: number;
  title: string;
  source: string;
  isshow: string;
  insert_date: string; 
};

const SDGsKeywd: React.FC<{}>  = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  let maincodeId = 1; 
 

  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
        sdgsId = parseInt(q[1]);
    }  
  }); 
  const actionRef = useRef<ActionType>(); 
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
      dataIndex: "id",
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true, 
    },
    {
      title: '關鍵字',
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
 
  const [breadcrumb, setData] = useState({});

  useEffect(() => {
    setData({ items: [
        {
          title: 'SDGs 目標管理',
        },
        { 
            title: <a href="../sdgs/">SDGs 目標列表</a>, 
        },
        { 
            title: "關鍵字", 
        },
    ],});
  }, []);

  const [SDGsData, setSDGsData]  = useState({}); 
  useEffect(() => {
    const fetchData = async () => {
      let data = await getSDGs();
      if (data != undefined) setSDGsData(data);
    };
    fetchData();
  }, []);
  let title  = "SDG "+sdgsId+" ";
  if(SDGsData!==undefined && SDGsData.data!==undefined && SDGsData.data.length>0 && sdgsId <= SDGsData.data.length  ){
    title += SDGsData.data[sdgsId-1].title;
  }
  
  return (  
    <Tab
      title={title} 
      sdgsId={sdgsId} 
      breadcrumb={breadcrumb}
      match={{ url: '/sdgs', path: '/sdgskeywd'  }}
      location={{ pathname: 'sdgskeywd' }}
    >
    <ProTable<SDGsItems>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return request<{
          data: SDGsItems[];
     
        }>('../../hysdgs/getSDGsKeyword', {
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
export default SDGsKeywd;