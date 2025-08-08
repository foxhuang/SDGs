import React, { useEffect, useRef, useState } from "react";
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { history } from "umi";
import request from 'umi-request'; 
import {  addSDGsKeyword } from "../service"; 
import { ProTable } from '@ant-design/pro-components'; 
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Form, Input,  message, Space,Radio } from "antd";
import moment from "moment";
import { FormInstance } from "antd/lib/form";
import { SDGsItems } from "../SDGs/data";

const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 3 }
};

const AddForm: React.FC<{}> = (props: any) => {
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&');
    let sdgsId = 0;
    let id = 0;
    let maincodeId = 1; 
    params.map(param => {
      var q = param.split('=');
      if (q[0] === 'sdgsId') {
        sdgsId = parseInt(q[1]);
      }
    }); 
    const actionRef = useRef<ActionType>();
    const [isshow, setIsshow] = useState<number>(1);  
    const [kwTitle, setKWTitle] =useState('');  
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
                title: <a href={"../sdgs/sdgskeywd?sdgsId="+sdgsId}>關鍵字</a>, 
            },
            { 
                title: "新增關鍵字", 
            },
        ],});
    }, []);

    const handleKWChange = (value) => { 
        console.log("value",value);
        setKWTitle(value); 
    };
    
   
    const title = "SDGs "+sdgsId+"  關鍵字";

    const onFinish = async (values: SDGsItems) => {
        console.info("onFinish", values); 
        if (await onSubmit(values)) history.push("/sdgs/sdgskeywd?sdgsId="+sdgsId);
    };

    const onSubmit = async (values: SDGsItems) => {
        values.id = id; 
        values.sdgsId = sdgsId;
        values.maincodeId = 1;
        values.title = kwTitle; 
        values.isshow = isshow; 
        const hide = message.loading("正在配置");
        try {
            const result = await addSDGsKeyword(values);
            console.log(result);
            hide();

            if (result !== null && result.success) {
                message.success("修改成功");
                return true;
            } else {
                message.success("修改失敗請重試！");
                return false;
            }
        } catch (error) {
            hide();
            message.error("修改失敗請重試！");
            return false;
        }
    }

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
          title: '關鍵字',
          dataIndex: 'title', 
          ellipsis: true,  
          hideInSearch: true,
          width: 300, 
        }, 
        { 
          title: '筆數',
          dataIndex: 'cnts', 
          ellipsis: true,  
          hideInSearch: true,
        },   
        {
            title: "操作",
            dataIndex: "option",
            valueType: "option",
            width: 300,
            render: (_, record: any) => {
                return (<Space> 
                <Button
                    type="default"
                    onClick={() => {
                        handleKWChange(record.title);
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
        <PageContainer
            header={{
            title: title, 
            breadcrumb:  breadcrumb ,
            }} 
        >
        {sdgsId !== 0 ? (
        <Form<SDGsItems>
            {...formItemLayout}
            style={{ backgroundColor: "white", padding: "20px" }}
            ref={formRef}
            name="control-ref" 
            onFinish={onFinish} 
            labelWrap
            >
            <h2>關鍵字</h2>
            <Form.Item label="* 關鍵字" >
                <Input value={kwTitle||''}   required
                    onChange={(e) => { 
                        handleKWChange(e.target.value);
                    }}
                /> 
            </Form.Item>   
            <Form.Item label="* 前台顯示" >
            <Radio.Group
              onChange={(e) => {
                setIsshow(e.target.value);
              }}
              value={isshow}
            >
              <Radio value={0}>否</Radio>
              <Radio value={1}>是</Radio>
            </Radio.Group>
            </Form.Item> 
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() => history.push("/sdgs/sdgskeywd?sdgsId="+sdgsId)}>
                    回上一頁
                </Button>
                <Button type="primary" htmlType="submit">
                    送出
                </Button>
                </Space>
            </Form.Item>
            <Divider />
            <h2>讀者自訂關鍵字參考</h2>
            <ProTable<SDGsItems>
                columns={columns}
                actionRef={actionRef}
                cardBordered
                search={false}
                request={(params) => {
                    return request<{
                    data: SDGsItems[];
                
                    }>('../../hysdgs/getRdSDGsKeyword', {
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
        </Form>
        ) : (
            <></>
        )} 
        </PageContainer></>
    );
};

export default AddForm;
