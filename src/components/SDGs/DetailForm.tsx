import { Col,   Divider, Modal, Row  } from "antd";
import moment from "moment";
import {  getSDGsItemById ,getSDGsKeywordById  } from "../../pages/service"; 
import React, { useEffect, useState } from "react";

const DetailForm: React.FC<{}> = (props) => {
    const { modalVisible, onCancel, id ,title,label,stype} = props;
    const [initialValues, setInitialValues] = useState<any>({});
    console.log("id==",id);
    useEffect(() => {
        console.log("id==>",id);
        const fetchData = async () => {
            console.log("id==>>",id);
            if (parseInt(id) !== 0) {
                let items = await (stype==="kw" ?  getSDGsKeywordById(id) : getSDGsItemById(id));
    
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
                        source: items.data.source,
                        insert_muser_name: insert_muser_name,
                        insert_date: moment(items.data.insert_date).format("YYYY-MM-DD HH:mm"),
                        update_muser_name: update_muser_name,
                        update_date: moment(items.data.update_date).format("YYYY-MM-DD HH:mm"),
                    });
                }; 
            } 
        };
        fetchData();
    }, []);

  return (
    <>
    <Modal destroyOnClose title={title +" 詳細資料"} visible={modalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
    {parseInt(id) !== 0  && initialValues.id !== undefined && (<>
        <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">{label}：</Col>
            <Col span="18">{initialValues.title}</Col>
          </Row>
          <Row gutter={[48, 24]}>
            <Col span="6">前台顯示：</Col>
            <Col span="18">{parseInt(initialValues.isshow) === 1 ?"是":"否"}</Col>
          </Row>
          <Row gutter={[48, 24]}>
            <Col span="6">資料來源：</Col>
            <Col span="18">{initialValues.source}</Col>
          </Row> 
        <Divider />   
    </>)}
    </Modal> 
    </>
  );
};

export default DetailForm;
