import React  from "react";
import { Space,  Modal, Form,Button  } from "antd";
const ShareKBConfirmForm: React.FC<{}> = (props) => {
    const { modalVisible, onCancel,id,setUseShare} = props;  
    return ( <> 
     <Modal destroyOnClose  onCancel={() => onCancel()} closable={false}  title={id===0?"確認新增書目":"確認編修書目"} 
      visible={modalVisible} width={350}  footer={null}> 
        <h3>資料將分享至知識庫，請再次確認後送出，您可以隨時於列表中修改內容，修改後的內容將會同步更新</h3>
        <br/>
        <br/>
        <Form.Item style={{ textAlign: "center" }}>
        <Space>
            <Button
                type="default"
                onClick={() => {
                    onCancel();
                }}
            >
                取消
            </Button>  
            <Button
                type="primary"
                onClick={() => {
                    setUseShare();
                }}
            >
                確定
            </Button>
        </Space>
        </Form.Item> 
    </Modal>
  </> );
};

export default ShareKBConfirmForm;
