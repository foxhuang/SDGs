import React, { useEffect, useState } from "react"; 
import { Divider,Modal,Row, Col } from "antd";
import {  getSDGsBooksById  } from "../../pages/service";  
import '../../pages/css/customButtonStyles.css';   

const BookViewForm: React.FC<{}> = (props: any) => {
    const { viewModalVisible, onCancel,sdgsId,id} = props;   
    console.info("id====>", id);
    const [BookTitle, setBookTitle] =useState('');  
    const [BookISBN, setBookISBN] =useState('');   
    const [Reasons, setReasons] =useState('');   
    const [IsShow, setIsShow] =useState('0');   
    const [Source, setSource] = useState('');
    const [Extended, setExtendede] = useState(''); 
    const [Readable, setReadable] = useState(''); 
    const [Recommender, setRecommender] = useState(''); 

    
  
    useEffect(() => {  
        if(id!==0){
            const fetchData = async () => {  
                let sdgsbook = await getSDGsBooksById(id); 
                if (sdgsbook !== undefined && sdgsbook.data !== null) {  
                    setBookTitle(sdgsbook.data.title||''); 
                    setBookISBN(sdgsbook.data.isbn||'');  
                    setSource(sdgsbook.data.source||''); 
                    setReasons(sdgsbook.data.reasons||''); 
                    setIsShow(''+sdgsbook.data.isshow||'0');
                    setExtendede(sdgsbook.data.extended||'');
                    setReadable(sdgsbook.data.readable||'');
                    setRecommender(sdgsbook.data.recommender||'');
                };  
            };  
            fetchData();
        }
    }, [id]); 
    

    return (
        <> 
        <Modal destroyOnClose title="書單 詳細資料" visible={viewModalVisible} onCancel={() => onCancel()} width={1000} footer={null}>
        {sdgsId !== 0  &&   (<>
          <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">題名：</Col>
            <Col span="18">{BookTitle}</Col>
          </Row>
          <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">ISBN：</Col>
            <Col span="18">{BookISBN}</Col>
          </Row>
          <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">前台顯示：</Col>
            <Col span="18">{parseInt(IsShow) === 1 ?"是":"否"}</Col>
          </Row>
          <Divider />
          <Row gutter={[48, 24]}>
            <Col span="6">推薦者：</Col>
            <Col span="18">{Recommender}</Col>
          </Row> 
          <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">對象：</Col>
            <Col span="18">{Readable}</Col>
          </Row> 
          <Divider /> 
          <Row gutter={[48, 24]}>
            <Col span="6">資料來源：</Col>
            <Col span="18">{Source}</Col>
          </Row> 
          <Divider /> 	   
          <Row gutter={[48, 24]}>
            <Col span="6"> 推薦緣由：</Col>
            <Col span="18">{Reasons}</Col>
          </Row>
          <Divider />  
          <Row gutter={[48, 24]}>
            <Col span="6"> 延伸討論：</Col>
            <Col span="18">
            {Extended!=='' && Extended.split("^Z").map((question,index) => { 
              return <>({index+1}) {question}<br/> </>
            })}
            </Col> 
          </Row> 
          <Divider /> 
        </>)}  
    </Modal></>
    );
};

export default BookViewForm;
