import React, { useEffect, useState } from "react";
import { history } from "umi";
import {  getSDGsBooksById  ,addSDGsBooks } from "../service"; 
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Form, Input,  message, Space } from "antd";

import { FormInstance } from "antd/lib/form";
import { SDGsBooksItem } from "../SDGs/data";

const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 3 }
};

const AddForm: React.FC<{}> = (props: any) => {
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&');
    let sdgsId = 0;
    let id = 0;
    params.map(param => {
      var q = param.split('=');
      if (q[0] === 'sdgsId') {
        sdgsId = parseInt(q[1]);
      }else if (q[0] === 'id') {
        id = parseInt(q[1]);
      }
    }); 
    
    console.info("sdgsId", sdgsId);
    console.info("id", id); 
    const [initialValues, setInitialValues] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let sdgsbook = await getSDGsBooksById(id);
                console.info("sdgsbook", sdgsbook.data); 
                if (sdgsbook !== undefined) { 
                    setInitialValues({
                        id: sdgsbook.data.id,
                        title: sdgsbook.data.title,
                        isbn: sdgsbook.data.isbn,
                        pubyear: sdgsbook.data.pubyear, 
                    }); 
                }; 
            }
        };
        fetchData();
    }, []);
  
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
                title: <a href={"../sdgs/sdgsbooks?sdgsId="+sdgsId}>書單</a>, 
            },
            { 
                title: "編輯書單", 
            },
        ],});
    }, []);
    const title = "SDGs "+sdgsId+" 書單";

    const onFinish = async (values: SDGsBooksItem) => {
        console.info("onFinish", values);
        if (await onSubmit(values)) history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId);
    };

    const onSubmit = async (values: SDGsBooksItem) => {
        values.id = id; 
        values.sdgsId = sdgsId;
        const hide = message.loading("正在配置");
        try {
            const result = await addSDGsBooks(values);
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
      
    return (
        <>
        <PageContainer
            header={{
            title: title, 
            breadcrumb:  breadcrumb ,
            }} 
        >
        {sdgsId !== 0  && (initialValues.id !== undefined || id===0) ? (
            <Form<SDGsBooksItem>
            {...formItemLayout}
            style={{ backgroundColor: "white", padding: "20px" }}
            ref={formRef}
            name="control-ref" 
            onFinish={onFinish}
            initialValues={initialValues}
            labelWrap
            >
            <h2>書籍資訊</h2>
            <Form.Item name="title" label="題名" rules={[{ required: true }]}>
                <Input /> 
            </Form.Item>
            <Form.Item name="isbn" label="ISBN" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item name="pubyear" label="出版年" rules={[{ required: false }]}>
                <Input />
            </Form.Item>  
            <Divider /> 
            <h2>推薦資訊及討論</h2>
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() => history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId)}>
                    回上一頁
                </Button>
                <Button type="primary" htmlType="submit">
                    送出
                </Button>
                </Space>
            </Form.Item>
        </Form>
        ) : (
            <></>
        )} 
        </PageContainer></>
    );
};

export default AddForm;
