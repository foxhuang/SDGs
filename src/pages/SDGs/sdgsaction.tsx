import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/SDGs/Tab'; 
import {  getSDGs,delSDGsItem  } from "../service";
import { Button,  Space, message } from "antd";
import { history } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { SDGsItems } from "./data";

const SDGsAction: React.FC<{}>  = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  let maincodeId = 81001; 
 

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
      title: '項目',
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
        title: "操作",
        dataIndex: "option",
        valueType: "option",
        render: (_, record: any) => {
          return (<Space> 
            {(record.source==='本館') && (
              <>
              <Button
                type="default"
                onClick={() => {
                  history.push("/sdgsaction/edit?sdgsId="+sdgsId+"&id=" + record.id);
                }}
              >
                修改
              </Button>
              <Button
                type="default"
                danger
                onClick={async () => {
                  if (confirm("確定刪除嗎？")) {
                    const hide = message.loading("正在配置");
                    try {
                      const result = await delSDGsItem(record.id);
                      hide();
    
                      if (result !== null && result.success) {
                        message.success("刪除成功");
                        if (actionRef.current) actionRef.current.reload();
                      } else {
                        message.success("刪除失敗請重試！");
                      }
                    } catch (error) {
                      hide();
                    }
                    
                  }
                }}
              >
                刪除
              </Button>
            </>
            )}
             
          </Space>);
        },
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
            title: "一起行動", 
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
      match={{ url: '/sdgs', path: '/sdgsaction'  }}
      location={{ pathname: 'sdgsaction' }}
    >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
    <Button
      type="primary"
      onClick={() => {
        history.push("/sdgsaction/edit?sdgsId="+sdgsId+"&id=0");
      }}
    >
      <PlusOutlined /> 新建
    </Button>
    <ProTable<SDGsItems>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return request<{
          data: SDGsItems[];
     
        }>('../../hysdgs/getSDGsItem', {
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
    </Space>
    </Tab>  
  );
};
export default SDGsAction;