import React, { useEffect, useState } from "react";
import { FormInstance } from "antd/lib/form"; 
import { PlusOutlined ,CloseOutlined  } from '@ant-design/icons';
import { Button, Divider,Modal, Form, Input,  message, Space,Row,Checkbox,Col } from "antd";
import {  getSDGsBooksById  ,addSDGsBooks,getChatGPT,getSDGsBooksMarcByMarcId } from "../../pages/service"; 
import { QueryForm,SpinForm,KBConfirmForm ,KBDataForm,ShareKBConfirmForm} from '../../components/SDGs';  
import { SDGsBooksItem } from "../../pages/SDGs/data"; 
import '../../pages/css/customButtonStyles.css';  

 
const formRef = React.createRef<FormInstance>();

const formItemLayout = {
  labelCol: { span: 3 }
};

const BookEditForm: React.FC<{}> = (props: any) => {
    const { editModalVisible, onCancel,sdgsId,id,marcId,handleRefresh,handleFinish} = props;  

    const [BookTitle, setBookTitle] =useState('');  
    const [BookISBN, setBookISBN] =useState('');   
    const [Reasons, setReasons] =useState('');  
    const [ReadOnly, setReadOnly] =useState('0');  
    const [Share, setShare] =useState('1');  
    const [Source, setSource] =useState('');  
    const [Readable, setReadable] =useState('');  
    const [Recommender, setRecommender] =useState('');  
 
    const [ShowShare, setShowShare] =useState('1');  
    const [ShareDisable, setShareDisable] =useState('0');   
    const [IsShow, setIsShow] =useState('0');   
    const [IsShowOld, setIsShowOld] =useState('0');   
    const [BookMarcId, setBookMarcId] = useState(0);  
    const [inputs, setInputs] = useState([{ key: 0, value: '' }]);
    const [inputCnts, setInputCnts] = useState(0);  
    const [seconds, setSeconds] = useState(0);
    const [gptRun, setGPTRun] = useState(0); 
    const [GPTData, setGPTData] = useState({}); 
    const [booksItem, setSDGsBooksItem] = useState<SDGsBooksItem>(); 
    const [isReload, setReload] = useState(false); 
   
    const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
        false
      ); 
    const [spinmodalVisible, handleSpinModalVisible] = useState<boolean>(
        false
    ); 

    const [kbmodalVisible, handleKBModalVisible] = useState<boolean>(
        false
    );

    const [kbdatamodalVisible, handleKBDataModalVisible] = useState<boolean>(
        false
    );
    const [sharekbdatamodalVisible, handleShareKBDataModalVisible] = useState<boolean>(
        false
    );

    useEffect(() => { 
        setBookMarcId(marcId); 
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
                    setReadOnly("0");
                    setShowShare('0');
                    setIsShow(''+sdgsbook.data.isshow||'0');
                    setIsShowOld(''+sdgsbook.data.isshow||'0');
                    if(sdgsbook.data.extended !== null){
                        const newInputs = []; 
                        sdgsbook.data.extended.split("^Z").map((question,index) => { 
                            newInputs.push({ key:index, value: question }); 
                        })
                        setInputs(newInputs); 
                        setInputCnts(newInputs.length);
                    }else{
                        const newInputs = [{ key: 0, value: '' }];
                        setInputs(newInputs); 
                        setInputCnts(0);
                    }
                 }; 
            }else{
                setBookTitle(''); 
                setBookISBN(''); 
                setReasons('');
                setShare('1');
                setShowShare('1');
                setReadOnly("0");
                setIsShow('1');
                setIsShowOld('0');
                setShareDisable('0');
                setBookMarcId(0);
                const newInputs = [{ key: 0, value: '' }];
                setInputs(newInputs); 
                setInputCnts(0); 
            }
        };
        fetchData();
    }, [id]);
   
    const handleBTitleChange = (value) => {  
        setBookTitle(value); 
    };
 
    const handleBISBNChange = (value) => {  
        setBookISBN(value); 
    };

    const sendSDGsBooks = async (values: SDGsBooksItem) => { 
        values.id = id; 
        values.sdgsId = sdgsId; 
        values.title = BookTitle;
        values.isbn = BookISBN; 
        //values.pubyear = BookPubyear;
        values.marcId = ""+BookMarcId;
        values.reasons = Reasons;
        values.share = Share;
        values.isshow = IsShow; 
        values.source = Source;
        values.readable = Readable;
        values.recommender = Recommender;
        let extended = "";
        inputs.map((input ,index) => {
            if(index===0){
                extended = input.value  ;
            }else{
                extended += "^Z"+ input.value ;
            } 
        });
        values.extended = extended;
        const hide = message.loading("正在配置");
        try {
            let sendflag = 1;
            console.info("IsShow",IsShow);
            console.info("IsShowOld",IsShowOld); 
            if(IsShowOld==='0' &&  IsShow==='1' ){
                values.otherhiden = "1";
                const rresult = await getSDGsBooksMarcByMarcId(BookMarcId,sdgsId);  
                console.info("rresult",rresult);
                if (rresult !== null && rresult.total >= 1) {  
                    if (confirm("每筆書目於前台僅能顯示一則推薦資訊。確定要改為顯示此內容，並隱藏原有的推薦嗎？隱藏的項目可隨時於列表中再次設定顯示。")){
                        sendflag = 1;
                    }else{
                        sendflag = 0;
                    }
                }
            }
            console.info("sendflag",sendflag);
            if(sendflag===1){
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
            }
        } catch (error) {
            hide();
            message.error("修改失敗請重試！");
            return false;
        }  
    }
 
    const setUseShare = async() => {  
        handleShareKBDataModalVisible(false); 
        if (await sendSDGsBooks(booksItem)) {
            if(isReload){ 
                setBookTitle(''); 
                setBookISBN(''); 
                setReasons('');
                setShare('1');
                setIsShow('1');
                setIsShowOld('0');
                setBookMarcId(0);
                setReadOnly("0");
                setShareDisable("0");  
                const newInputs = [{ key: 0, value: '' }];
                setInputs(newInputs); 
                setInputCnts(0); 
            }else{
                if(id===0){ 
                    handleFinish(); 
                }else{
                    handleRefresh(); 
                }
            }
            return true;
        } else {
            return false;
        }
    }

    const onFinishNext = async (values: SDGsBooksItem) => { 
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
            setReload(true);
            setSDGsBooksItem(values);
            if(Share === '1' && id===0){
                handleShareKBDataModalVisible(true);   
            }else{
                //setUseShare();
                if (await sendSDGsBooks(values))  {
                    setBookTitle(''); 
                    setBookISBN(''); 
                    setReasons('');
                    setShare('1');
                    setShowShare('1');
                    setShareDisable("0");  
                    setReadOnly("0");
                    setIsShow('1');
                    setIsShowOld('0');
                    setBookMarcId(0); 
                    const newInputs = [{ key: 0, value: '' }];
                    setInputs(newInputs); 
                    setInputCnts(0);
                } 
            }
            /*
            if (await onSubmit(values))  {
                setBookTitle(''); 
                setBookISBN(''); 
                setReasons('');
                setShare('0');
                setIsShow('0');
                setBookMarcId(0);
                const newInputs = [{ key: 0, value: '' }];
                setInputs(newInputs); 
                setInputCnts(0);
            } 
            */
        } 
    };
    
    const handleSubmit = () => { 
        if (formRef.current) {
            formRef.current?.validateFields().then((values) => {
                onFinishNext(values);
            });
        }
    };
  
    const onFinish = async (values: SDGsBooksItem) => { 
        setReload(false);
        setSDGsBooksItem(values);
        if(Share === '1'&& id===0 ){
            handleShareKBDataModalVisible(true);     
        }else{
            //setUseShare();
            if (await sendSDGsBooks(values)) {
                if(id===0){ 
                    handleFinish(); 
                }else{
                    handleRefresh(); 
                }
            }  
        }
       
        /*
        if (await onSubmit(values)) {
            if(id===0){ 
                handleFinish(); 
            }else{
                handleRefresh(); 
            }
        } 
        */
    };
 
       
    const setRecord = (data: any) => { 
        if(data.flag !== "0"){
            if(confirm("本書已在目標書單內，是否確定要重複新增？")) {
                handleDetailModalVisible(false); 
                setBookTitle(data.title||''); 
                setBookISBN(data.isbn||''); 
                //setBookPubyear(data.pubyear||''); 
                setBookMarcId(data.sid||0); 
                setReasons(''); 
                setReadOnly("0");
                setShare('1');
                setShowShare('1');
                setShareDisable("0");
                setIsShow('1'); 
                setIsShowOld('0');
                const newInputs = [{ key: 0, value: '' }];
                setInputs(newInputs); 
                setInputCnts(0);
            } 
        }else{ 
            // Code logic goes here
            handleDetailModalVisible(false); 
            setBookTitle(data.title||''); 
            setBookISBN(data.isbn||''); 
            //setBookPubyear(data.pubyear||''); 
            setBookMarcId(data.sid||0); 
            setReasons(''); 
            setReadOnly("0");
            setShare('1');
            setShowShare('1');
            setShareDisable("0");
            setIsShow('1');  
            setIsShowOld('0');
            const newInputs = [{ key: 0, value: '' }];
            setInputs(newInputs); 
            setInputCnts(0);
        } 
    }; 
    const handleAddInput = (key) => { 
        console.info("handleAddInput inputCnts===>",key);
        const newInputs = [...inputs, { key: inputs.length, value: '' }];
        setInputs(newInputs); 
        setInputCnts(inputCnts+1);
    };

    const handleDelInput = (key) => {   
      const newInputs = inputs.filter(input => input.key !== key); 
      console.info("handleDelInput newInputs===>",newInputs);
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
  

    const handleGPTData = (item:any,share:string) => {  
        console.info("reasons=====>", item.reasons); 
        console.info("source=====>", item.source); 
        console.info("readable=====>", item.readable); 
        console.info("recommender=====>", item.recommender); 
        console.info("share=====>", share);  
        setSource(item.source||'');
        setReasons( item.reasons||''); 
        setReadable(item.readable||'');
        setRecommender(item.recommender||'');
        if( item.extended !== null){
            const newInputs = []; 
            item.extended.map((question,index) => { 
                newInputs.push({ key:index, value: question }); 
            })
            setInputs(newInputs);
            setInputCnts(newInputs.length);
            if(newInputs.length>0){ 
                setShare(share); 
                setShareDisable("1");  
                if(share === '0'){
                    setReadOnly("1");
                    setShowShare('0');
                }else{
                    setReadOnly("0");
                    setShowShare('1');
                }
            } 
        } 
    };
    const  onCancelForm=()=> { 
        setBookTitle(''); 
        setBookISBN(''); 
        setReasons(''); 
        setReadOnly("0");
        setShare('1');
        setShowShare('1');
        setShareDisable("0");
        setIsShow('1'); 
        setIsShowOld('0');
        setBookMarcId(0); 
        const newInputs = [{ key: 0, value: '' }];
        setInputs(newInputs); 
        setInputCnts(0);
        onCancel();
    }
    const getGPTData = async () => { 
        setSeconds(0);
        handleSpinModalVisible(true);
        setGPTRun(1); 
        let ChatGPT = await getChatGPT(sdgsId,BookMarcId,0);  
        console.info( "ChatGPT.data.length ===>", ChatGPT.data.length); 
        console.info( "ChatGPT.data   ===>", ChatGPT.data ); 
        console.info( "ChatGPT.isKB",ChatGPT.isKB); 
        setGPTData(ChatGPT);
        if(Boolean(ChatGPT.success)){
            if(Boolean(ChatGPT.isKB)){
                handleKBModalVisible(true);
            }else if(!Boolean(ChatGPT.isKB) && ChatGPT.data.length>0){
                handleGPTData(ChatGPT.data[0],"1");
            }
        }
        setSeconds(20);
        setGPTRun(0);
        handleSpinModalVisible(false);
        setSeconds(0); 
    }

    const setUseType = async (useType: any) => {
        console.log("useType",useType);
        handleKBModalVisible(false);
        if(useType){
            setSeconds(0);
            handleSpinModalVisible(true);
            setGPTRun(1); 
            let ChatGPT =  await getChatGPT(sdgsId,BookMarcId,1);   
            setGPTData(ChatGPT); 
            console.info( "ChatGPT  == ", ChatGPT ); 
            console.info( "ChatGPT.success==",ChatGPT.success); 
           if(Boolean(ChatGPT.success) && ChatGPT.data.length>0){
                console.info( "GPTData",GPTData); 
                handleGPTData(ChatGPT.data[0],"1"); 
            }
            setSeconds(20);
            setGPTRun(0);
            handleSpinModalVisible(false);
            setSeconds(0); 
        }else{
            handleKBDataModalVisible(true);
        }
    }

    
    const setKBRecord = (KBRecord: any ) => {
        console.log("KBRecord",KBRecord);  
        handleGPTData(KBRecord,"0");  
        handleKBDataModalVisible(false);
        
     
    } 



    return (
        <> 
        <Modal destroyOnClose title={id !==0 ?"編輯書單":"新增書單"} visible={editModalVisible} onCancel={() => onCancelForm()} width={1000} footer={null}>
        <Divider />  
        {id === 0 && ( <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button 
            type="primary" 
            onClick={() => {
            handleDetailModalVisible(true); 
            }}
        >
            查詢館藏
        </Button></div>
        )}  
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
            {id !==0 ?
            (<>
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
            </> ): (<>
                <Form.Item 
                    label="* 題名" 
                    rules={[{ required: true, message: '請輸入題名' }]} >
                    {BookTitle||''}
                </Form.Item> 
                <Form.Item 
                    label="* ISBN" 
                    rules={[{ required: true, message: '請輸入ISBN' }]} >
                    {BookISBN||''} 
                </Form.Item> </> 
            )}
            <h2>推薦資訊及討論</h2> 
            <h4> 
            當使用「AI智能生成」服務所編輯完成的書目，將會自動分享至我們的知識庫中，達到共建共享的目標。
            </h4> 
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
                readOnly={ReadOnly==='1'}
                style={{backgroundColor:ReadOnly==='1'? '#f0f0f0':'#ffffff'}}
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
                    readOnly={ReadOnly==='1'}
                    onChange={e => handleInputChange(input.key, e.target.value)}
                    style={{backgroundColor:ReadOnly==='1'? '#f0f0f0':'#ffffff', marginBottom: 10,width: '90%'}}
                /> 
                <Button  style={{  margin: '0 0 0 10px'}} 
                    onClick={() => ReadOnly==='1'? null:handleAddInput(input.key) }>
                    <PlusOutlined   />
                </Button></Row>
                </>))||
                ((index>0)&&(<>
                <Row>
                <Input
                    key={input.key}
                    value={input.value}
                    readOnly={ReadOnly==='1'}
                    onChange={e => handleInputChange(input.key, e.target.value)}
                    style={{backgroundColor:ReadOnly==='1'? '#f0f0f0':'#ffffff', marginBottom: 10,width: '90%' }}
                />
                <Button  style={{  margin: '0 0 0 10px'}} 
                        onClick={() => ReadOnly==='1'? null:handleDelInput(input.key)}>
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
            <Row style={{display :(ShowShare === '0' || id !== 0 ) ? 'none': '' }}>
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
                        disabled={ShareDisable === '1' ? true : false}
                        defaultChecked={Share === '1' ? true : false}
                        checked={Share === '1' ? true : false}
                    >
                        本館願意將資料分享至資源共享庫
                    </Checkbox> 
                </Col>  
            </Row>
            <Divider />
            <Form.Item style={{ textAlign: "center" }}>
                <Space>
                <Button type="default" onClick={() =>onCancelForm() }>
                    關閉
                </Button>
                <Button type="primary" htmlType="submit">
                完成 
                </Button>
                {id===0 && (<>
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
        <KBConfirmForm setUseType={setUseType} modalVisible={kbmodalVisible}   
            onCancel={() => {
                handleKBModalVisible(false);   
            }}
        />
        <KBDataForm GPTData={GPTData} setKBRecord={setKBRecord} modalVisible={kbdatamodalVisible}   
            onCancel={() => {
                handleKBDataModalVisible(false);   
            }}
        /> 
        <ShareKBConfirmForm id={id} setUseShare={setUseShare} modalVisible={sharekbdatamodalVisible}   
            onCancel={() => {
                handleShareKBDataModalVisible(false);   
            }}
        />
        {gptRun !== 0 && ( <> 
            <SpinForm seconds={seconds} modalVisible={spinmodalVisible}/> 
        </>)} 
    </Modal></>
    );
};

export default BookEditForm;
