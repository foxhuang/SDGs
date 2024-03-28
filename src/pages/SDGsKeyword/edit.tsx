import React, { useEffect, useState } from "react";
import { history } from "umi";
import {  getSDGsKeywordById  ,addSDGsKeyword } from "../service"; 
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Form, Input,  message, Space,Radio } from "antd";
import moment from "moment";
import { FormInstance } from "antd/lib/form";
import { SDGsItems } from "../SDGs/data";

const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 3 }
};

const EditForm: React.FC<{}> = (props: any) => {
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&');
    let sdgsId = 0;
    let id = 0;
    let maincodeId = 1; 
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
    const [isshow, setIsshow] = useState<number>(1);
    const [initialValues, setInitialValues] = useState<any>({});
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let items = await getSDGsKeywordById(id);
                console.info("item", items.data); 
                console.info("muser", items.muser); 

                if (items !== undefined) {  
                    let insert_muser_name =  items.muser.filter(d => (d.id === items.data.insert_muser_id)).map((item) => { 
                        return item.name; 
                    });
                    let update_muser_name =  items.muser.filter(d => (d.id === items.data.insert_muser_id)).map((item) => { 
                         return item.name;
                    }); 
                    setInitialValues({
                        id: items.data.id,
                        title: items.data.title,
                        isshow: items.data.isshow,
                        insert_muser_name: insert_muser_name,
                        insert_date: moment(items.data.insert_date).format("YYYY-MM-DD HH:mm"),
                        update_muser_name: update_muser_name,
                        update_date: moment(items.data.update_date).format("YYYY-MM-DD HH:mm"),
                    });
                    setIsshow(parseInt(items.data.isshow));
                }; 
            }else{
                setInitialValues({ 
                    isshow: 1, 
                }); 
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
                title: <a href={"../sdgs/sdgskeywd?sdgsId="+sdgsId}>關鍵字</a>, 
            },
            { 
                title: "編輯關鍵字", 
            },
        ],});
    }, []);
    const title = "SDGs "+sdgsId+"  關鍵字";

    const onFinish = async (values: SDGsItems) => {
        console.info("onFinish", values);
        if (await onSubmit(values)) history.push("/sdgs/sdgskeywd?sdgsId="+sdgsId);
    };

    const onSubmit = async (values: SDGsItems) => {
        values.id = id; 
        values.sdgsId = sdgsId;
        values.maincodeId = maincodeId;
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
            <h2>關鍵字</h2>
            <Form.Item name="title" label="項目" rules={[{ required: true }]}>
                <Input /> 
            </Form.Item>
            <Form.Item name="isshow" label="前台顯示" rules={[{ required: true }]}>
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
            {(id!==0) ? ( <>
                <h2>新增/修改記錄</h2>
                <Space split={<Divider type="vertical" />} size={50}>
                    {`新增人員：` + initialValues.insert_muser_name}
                    {`新增時間：` + initialValues.insert_date}
                    {`修改人員：` + initialValues.update_muser_name}
                    {`修改時間：` + initialValues.update_date}
                </Space>
                <Divider /></>
            ) : (
                <></>
            )} 
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
        </Form>
        ) : (
            <></>
        )} 
        </PageContainer></>
    );
};

export default EditForm;
