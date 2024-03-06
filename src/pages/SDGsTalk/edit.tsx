import React, { useEffect, useState } from "react";
import { history } from "umi";
import {  getSDGsItemById  ,addSDGsItem } from "../service"; 
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Form, Input,  message, Space,Radio} from "antd";

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
    let maincodeId = 81002; 
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
    const [isshow, setIsshow] = useState<number>(0);
    const [initialValues, setInitialValues] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let item = await getSDGsItemById(id);
                console.info("item", item.data); 
                if (item !== undefined) { 
                    setInitialValues({
                        id: item.data.id,
                        title: item.data.title, 
                        isshow: item.data.isshow, 
                    }); 
                    setIsshow(parseInt(item.data.isshow));
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
                title: <a href={"../sdgs/sdgstalk?sdgsId="+sdgsId+"&maincodeId="+maincodeId}>一起討論</a>, 
            },
            { 
                title: "編輯討論", 
            },
        ],});
    }, []);
    const title = "SDGs "+sdgsId+"  討論";

    const onFinish = async (values: SDGsItems) => {
        console.info("onFinish", values);
        if (await onSubmit(values)) history.push("/sdgs/sdgstalk?sdgsId="+sdgsId+"&maincodeId="+maincodeId);
    };

    const onSubmit = async (values: SDGsItems) => {
        values.id = id; 
        values.sdgsId = sdgsId;
        values.maincodeId = maincodeId;
        const hide = message.loading("正在配置");
        try {
            const result = await addSDGsItem(values);
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
            <Form<SDGsItems>
            {...formItemLayout}
            style={{ backgroundColor: "white", padding: "20px" }}
            ref={formRef}
            name="control-ref" 
            onFinish={onFinish}
            initialValues={initialValues}
            labelWrap
            >
            <h2>一起討論</h2>
            <Form.Item name="title" label="討論項目" rules={[{ required: true }]}>
                <Input /> 
            </Form.Item>
            <Form.Item name="isshow" label="是否顯示" rules={[{ required: true }]}>
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
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() => history.push("/sdgs/sdgstalk?sdgsId="+sdgsId+"&maincodeId="+maincodeId)}>
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
