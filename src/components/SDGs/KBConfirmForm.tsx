import React, { useEffect, useState } from "react";
import { Space,  Modal, Form,Button  } from "antd";
const KBConfirmForm: React.FC<{}> = (props) => {
    const { modalVisible,setUseType} = props; 
 
    useEffect(() => {
      
    }, []);


    return ( <> 
     <Modal destroyOnClose  closable={false}  title={"有相似推薦內容"} 
      visible={modalVisible} width={350}  footer={null}> 
        <h3>知識庫已存在此書目的推薦緣由與延伸討論，
        您是否繼續使用AI生成</h3>
        <br/>
        <br/>
        <Form.Item style={{ textAlign: "center" }}>
        <Space>
            <Button
                type="default"
                onClick={() => {
                    setUseType(true);
                }}
            >
                使用AI生成
            </Button>  
            <Button
                type="primary"
                onClick={() => {
                    setUseType(false);
                }}
            >
            查看共享書目
            </Button>
        </Space>
        </Form.Item> 
    </Modal>
  </> );
};

export default KBConfirmForm;
