import request from 'umi-request';   
import React, { useEffect, useRef, useState } from "react";
import { ProTable } from '@ant-design/pro-components'; 
import type {ActionType, ProColumns } from '@ant-design/pro-components';
import { history } from "umi";
import {  getSDGsKeywordById  ,addSDGsKeyword }  from "../../pages/service"; 
import { Button, Divider, Modal,Form, Input,  message, Space,Radio } from "antd";
import moment from "moment";
import { FormInstance } from "antd/lib/form";
import { SDGsItems }  from "../../pages/SDGs/data"; 

const formRef = React.createRef<FormInstance>();

 
const formItemLayout = {
    labelCol: { span: 3 }
  };
  
const KeyWordEditForm: React.FC<{}> = (props: any) => {
    const { editModalVisible, onCancel,sdgsId,id,maincodeId,handleRefresh,handleFinish} = props;  
    
    console.info("sdgsId", sdgsId);
    console.info("id", id); 
    const actionRef = useRef<ActionType>();
    const [isshow, setIsshow] = useState<number>(1);
    const [initialValues, setInitialValues] = useState<any>({});
    const [kwTitle, setKWTitle] =useState('');  
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let items = await getSDGsKeywordById(id); 
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
                    setKWTitle(items.data.title);
                    setIsshow(parseInt(items.data.isshow));
                }; 
            }else{
                setInitialValues({ 
                    title: "",
                    isshow: 1, 
                }); 
                setKWTitle("");
                setIsshow(1);
            }
        };
        fetchData();
    }, [id]);
  
    

    const title = "編輯 SDGs "+sdgsId+"  關鍵字";

    const onFinish = async (values: SDGsItems) => {
        console.info("onFinish", values);
        if (await onSubmit(values)) {
            if(id===0){ 
                handleFinish(); 
            }else{
                handleRefresh(); 
            }
        }
    };

    const handleKWChange = (value) => { 
        console.log("value",value);
        setKWTitle(value); 
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
        <Modal destroyOnClose title={title} visible={editModalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
        {sdgsId !== 0   ? (
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
                <Button type="default" onClick={() => onCancel()}>
                 關閉
                </Button>
                <Button type="primary" htmlType="submit">
                    送出
                </Button>
                </Space>
            </Form.Item>
            {(id===0) && ( <>
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
            /> </>
            )}
        </Form>
        ) : (
            <></>
        )} 
        </Modal></>
    );
};

export default KeyWordEditForm;

 

 
