import React, { useEffect, useState } from "react";
import { history } from "umi";
import {  getSDGsBooksById  ,addSDGsBooks,getChatGPT } from "../service"; 
import { PageContainer } from '@ant-design/pro-layout';
import { Button, Divider, Form, Input,  message, Space,Row,Checkbox,Col } from "antd";
import { QueryForm,SpinForm } from '../../components/SDGs'; 
import { FormInstance } from "antd/lib/form";
import { SDGsBooksItem } from "../SDGs/data";
import '../css/customButtonStyles.css'; 
import { PlusOutlined ,CloseOutlined  } from '@ant-design/icons';
 
const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 3 }
};

const AddForm: React.FC<{}> = (props: any) => {
    const [breadcrumb, setData] = useState({});
    const [BookTitle, setBookTitle] =useState('');  
    const [BookISBN, setBookISBN] =useState('');   
    const [Reasons, setReasons] =useState('');  
    const [Share, setShare] =useState('0');  
    const [IsShow, setIsShow] =useState('0');   
    const [BookMarcId, setBookMarcId] = useState(0);  
    const [inputs, setInputs] = useState([{ key: 0, value: '' }]);
    const [inputCnts, setInputCnts] = useState(0);  
    const handleBTitleChange = (value) => { 
        console.log("value",value);
        setBookTitle(value); 
    };
    const handlePubyearChange = (value) => { 
        console.log("value",value);
        //setBookPubyear(value); 
    };
 

    const handleBISBNChange = (value) => { 
        console.log("value",value);
        setBookISBN(value); 
    };
    

     
    let querystring = window.location.search.replace('?', '');
    let params = querystring.split('&');
    let sdgsId = 0;
    let id = 0;
    let marcId=0;
    params.map(param => {
      var q = param.split('=');
      if (q[0] === 'sdgsId') {
        sdgsId = parseInt(q[1]);
      }else if (q[0] === 'id') {
        id = parseInt(q[1]);
      }else if (q[0] === 'marcId') {
        marcId = parseInt(q[1]);
      }
    });  
    
   

    useEffect(() => {
        if(marcId!==0){
            setBookMarcId(marcId);
        }
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
    const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
        false
      ); 
    const [spinmodalVisible, handleSpinModalVisible] = useState<boolean>(
        false
    );
      
    const onFinish = async (values: SDGsBooksItem) => {
        console.info("onFinish", values);
        if (await onSubmit(values)) history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId);
    };

    const onFinishNext = async (values: SDGsBooksItem) => {
        console.info("onFinishNext", values);
        if (BookTitle===''){
            alert("請輸入題名");
            return;
        }else if(BookISBN===''){
            alert("請輸入ISBN");
            return;
        }else if(Reasons===''){
            alert("請輸入推薦緣由");
            return;
        }else if(inputs[0].value===''){
            alert("請輸入延伸討論");
            return; 
        }else{
            if (await onSubmit(values))   window.location.reload();
        }
 
        
    };
    
    
       
    const setRecord = (data: any) => {
        console.log("data.flag="+data.flag);
        if(data.flag !== "0"){
            if(confirm("本書已在目標書單內，是否確定要重複新增？")) {
                handleDetailModalVisible(false); 
                setBookTitle(data.title||''); 
                setBookISBN(data.isbn||''); 
                //setBookPubyear(data.pubyear||''); 
                setBookMarcId(data.sid||0); 
            } 
        }else{ 
            // Code logic goes here
            handleDetailModalVisible(false); 
            setBookTitle(data.title||''); 
            setBookISBN(data.isbn||''); 
            //setBookPubyear(data.pubyear||''); 
            setBookMarcId(data.sid||0); 
        } 
    }; 
    const handleAddInput = () => { 
        const newInputs = [...inputs, { key: inputs.length, value: '' }];
        setInputs(newInputs); 
        setInputCnts(inputCnts+1);
    };

    const handleDelInput = (key) => { 
      console.log("key",key);
      const newInputs = inputs.filter(input => input.key !== key); 
      setInputs(newInputs);
    };
    

    const handleInputChange = (key, value) => {
        const newInputs = inputs.map(input => {
        if (input.key === key) {
            return { ...input, value };
        }
        return input;
        });
        setInputs(newInputs); 
    };
 
    useEffect(() => {
        const fetchData = async () => {
            if (id !== 0) {
                let sdgsbook = await getSDGsBooksById(id);
                console.info("sdgsbook", sdgsbook.data); 
                if (sdgsbook !== undefined) {  
                    setBookTitle(sdgsbook.data.title||''); 
                    setBookISBN(sdgsbook.data.isbn||''); 
                    //setBookPubyear(sdgsbook.data.pubyear||''); 
                    setReasons(sdgsbook.data.reasons||'');
                    setShare(sdgsbook.data.share||'0');
                    console.info("isshow", sdgsbook.data.isshow); 
                    setIsShow(''+sdgsbook.data.isshow||'0');
                    if(sdgsbook.data.extended !== null){
                        const newInputs = []; 
                        sdgsbook.data.extended.split("^A^").map((question,index) => { 
                            newInputs.push({ key:index, value: question }); 
                        })
                        setInputs(newInputs); 
                        setInputCnts(newInputs.length);
                    }
                 }; 
            }
        };
        fetchData();
    }, []);
  
    const [seconds, setSeconds] = useState(0);
    const [gptRun, setGPTRun] = useState(0);

    const getGPTData = async () => { 
        setSeconds(0);
        handleSpinModalVisible(true);
        setGPTRun(1); 
        let ChatGPT = await getChatGPT(sdgsId,BookMarcId); 
        if(Boolean(ChatGPT.success)){
            console.info("  reasons:", ChatGPT.reasons); 
            setReasons(ChatGPT.reasons||'');
            //setShare(ChatGPT.share||'0');
            //setIsShow(ChatGPT.isshow||'0');
            if(ChatGPT.extended !== null){
                const newInputs = []; 
                ChatGPT.extended.map((question,index) => { 
                    newInputs.push({ key:index, value: question }); 
                })
                setInputs(newInputs);
                setInputCnts(newInputs.length);
            }
        }
        setSeconds(20);
        setGPTRun(0);
        handleSpinModalVisible(false);
        setSeconds(0);
    }

    const handleSubmit = () => {
        console.log("handleSubmit");
        if (formRef.current) {
            formRef.current?.validateFields().then((values) => {
                onFinishNext(values);
            });
        }
    };
 
    const onSubmit = async (values: SDGsBooksItem) => {
    
        values.id = id; 
        values.sdgsId = sdgsId; 
        values.title = BookTitle;
        values.isbn = BookISBN; 
        //values.pubyear = BookPubyear;
        values.marcId = ""+BookMarcId;
        values.reasons = Reasons;
        values.share = Share;
        values.isshow = IsShow; 
        let extended = "";
        inputs.map((input ,index) => {
            if(index===0){
                extended = input.value  ;
            }else{
                extended += "^A^"+ input.value ;
            } 
        });
        values.extended = extended;
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
            extra={[
                id === 0 && ( <>
                    <Button
                        type="primary" 
                        onClick={() => {
                        handleDetailModalVisible(true); 
                        }}
                    >
                        查詢館藏
                    </Button> 
                    </>
                )]}>
        {sdgsId !== 0  && (BookTitle !== '' || id===0) ? (
            <Form<SDGsBooksItem>
            {...formItemLayout}
            style={{ backgroundColor: "white", padding: "20px" }}
            ref={formRef}
            name="control-ref" 
            onFinish={onFinish} 
            labelWrap
            >
            <h2>書籍資訊</h2> 
            <Form.Item 
                label="* 題名" 
                rules={[{ required: true, message: '請輸入題名' }]} >
                <Input value={BookTitle||''}   required
                    onChange={(e) => { 
                        handleBTitleChange(e.target.value);
                    }}
                /> 
            </Form.Item> 
            <Form.Item 
                label="* ISBN" 
                rules={[{ required: true, message: '請輸入ISBN' }]} >
                <Input value={BookISBN||''}   required
                    onChange={(e) => { 
                        handleBISBNChange(e.target.value);
                    }}
                /> 
            </Form.Item>  
           
        
            <h2>推薦資訊及討論</h2>
          
            <Button
                className="aibutton"  
                onClick={() => {
                    if(BookMarcId===0){
                        alert("書籍沒有對應的館藏");
                    }else if(gptRun!==1){
                        getGPTData(); 
                    }               
                }}
            >
                AI智能生成
            </Button> 
           
            <Divider />
            <Form.Item 
                label="* 推薦緣由" 
                rules={[{ required: true, message: '請輸入推薦緣由' }]}>
            <Input.TextArea  
                rows={5}
                value={Reasons||''}  required
                onChange={(e) => { 
                    setReasons(e.target.value);
                }}/>
            </Form.Item>    
            <Form.Item 
                label="* 延伸討論" 
                rules={[{ required: true, message: '請輸入延伸討論' }]} >
            {inputs.map((input ,index)=> (
               ((index===0)&&(<>
                <Row>
                <Input
                    key={input.key}
                    value={input.value}
                    onChange={e => handleInputChange(input.key, e.target.value)}
                    style={{ marginBottom: 10,width: '90%'}}
                /> 
                <Button  style={{  margin: '0 0 0 10px'}}
                    onClick={handleAddInput}>
                    <PlusOutlined   />
                </Button></Row>
                </>))||
                ((index>0)&&(<>
                <Row>
                <Input
                    key={input.key}
                    value={input.value}
                    onChange={e => handleInputChange(input.key, e.target.value)}
                    style={{ marginBottom: 10,width: '90%' }}
                />
                <Button  style={{  margin: '0 0 0 10px'}}
                        onClick={() => handleDelInput(input.key)}>
                    <CloseOutlined   />
                </Button>
                </Row></>))  
            ))}
          
            </Form.Item>  
            
            <Row>
                <Col span={3} />
                <Col span={21}>
                    <Checkbox  value={1} 
                        onChange={(e) => {
                            if (e.target.checked){
                                setIsShow("1"); 
                            } else {
                                setIsShow("0"); 
                            }
                        }} 
                        defaultChecked={IsShow === '1' ? true : false} 
                    >
                        前台顯示
                    </Checkbox>
                </Col> 
            </Row> 
            <Row>
                <Col span={3} />
                <Col span={21}>
                    <Checkbox 
                        onChange={(e) => {
                            if (e.target.checked){
                                setShare("1"); 
                            } else {
                                setShare("0"); 
                            }
                        }} 
                        defaultChecked={Share === '1' ? true : false}
                    >
                        本館願意將資料分享至資源共享庫
                    </Checkbox> 
                </Col>  
            </Row> 
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() => history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId)}>
                    回上一頁
                </Button>
                <Button type="primary" htmlType="submit">
                完成 
                </Button>
                {id!==0 && (<>
                <Button type="primary" htmlType="button"  onClick={handleSubmit}>
                完成並新增下一筆
                </Button></>)}
                </Space>
            </Form.Item>
        </Form>
        ) : (
            <></>
        )} 
        {id === 0 && ( <>
        <QueryForm
            title="查詢館藏" 
            sdgsId = {sdgsId}
            onCancel={() => {
                handleDetailModalVisible(false);   
            }}
            setRecord={setRecord}
            modalVisible={detailModalVisible}
            id={id}
        /></>)}
        {gptRun !== 0 && ( <> 
            <SpinForm seconds={seconds} modalVisible={spinmodalVisible}/>
        </>)}
        </PageContainer></>
    );
};

export default AddForm;
