import React, { useEffect, useState } from "react";
import { PageContainer } from '@ant-design/pro-layout';
import UploadTab from '../../components/SDGs/UploadTab'; 
import { SelectProps ,Progress , Spin,Row,Col, Divider,Upload, message ,Button,Select,Tooltip} from 'antd';
import { InboxOutlined ,InfoCircleOutlined} from '@ant-design/icons';
import { UploadMessageForm } from '../../components/SDGs'; 
import { history } from "umi";
const { Dragger } = Upload;

const FileUploadComponent = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
      sdgsId = parseInt(q[1]);
    } 
  }); 
    
  const [breadcrumb, setBreadcrumb] = useState({});
  const [msg, setMsg] = useState({});
  const [formType, setformType] = useState('');
  const [formSave, setformSave] = useState('1');
  const [formShow, setformShow] = useState('0');
  const [svrRep, setResponse] = useState({});
  const [data, setData] = useState({});
  const [index, setIndex] = useState(0);
  const [modalVisible, handleModalVisible] = useState<boolean>(
    false
  ); 
  const [progress, setProgress] = useState({});
  const [files, setFiles] = useState([]);
  const [display, setDisplay] = useState({});
  

  const props = {
    name: 'uploadfile',
    method: 'POST',
    enctype: "multipart/form-data",
    action: '../../hysdgs/uploadSDGsFile',
    data: {
        formType: formType,
        formSave:formSave,
        formShow:formShow,
        sdgsId: sdgsId,
    },
    showUploadList: false,  
    beforeUpload: (file:any) => { 
        console.log(file.name);
        if (formType === '') {
            message.error('請選擇匯入資料類型'); 
            return false;
        }else if (formSave === '') {
          message.error('請選擇書目重複執行方式'); 
          return false;
        }else if (formShow === '') {
          message.error('請選擇前台是否顯示'); 
          return false;
        }else if(file.name ===''|| file.name.indexOf('xlsx')===-1){
          message.error(`${file.name}  檔案不符合 xlsx 要求`);
          return Upload.LIST_IGNORE;  
        }
        return true;  
      },
    onChange(info:any) {
      const { status, uid } = info.file;
      const serverResponse = info.file.response;
   
      if (status !== 'uploading') { 
        console.log(info.file, info.fileList);
      }
      if (status === 'uploading') {
        setProgress({
          ...progress,
          [uid]: info.file.percent,
        });
        setDisplay({
            ...display,
            [uid]: "1",
        }); 
      }
      if (status === 'done') {
        message.success(`${info.file.name} 檔案匯入完成`); 
        setResponse({ ...svrRep, [uid]: serverResponse}); 
        setDisplay({
            ...display,
            [uid]: "0",
        }); 
        setMsg({ ...msg, [uid]: `${info.file.name} 檔案  共`+ (serverResponse!==null ?serverResponse.total:0)+` 筆`});
      } else if (status === 'error') {
        message.error(`${info.file.name} 檔案匯入失敗`); 
        setMsg({ ...msg, [uid]: `${info.file.name} 檔案匯入失敗` });
      }
      setFiles(info.fileList);
    }, 
  };

 

  useEffect(() => {
    setBreadcrumb({
      items: [
        { title: 'SDGs 目標管理' },
        { title: <a href="../sdgs/">SDGs 目標列表</a> },
        { title: <a href={"../sdgs/sdgsbooks?sdgsId="+sdgsId}>SDG {sdgsId} 書單</a> },
        { title: "SDG "+sdgsId+" 書單清單匯入" },
      ],
    });
  }, []);

  const handleTypeChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setformType(value);
  };
   
  const handleSaveChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setformSave(value);
  };

  const handleShowChange = (value: string) => {
    console.log(`Selected: ${value}`);
    setformShow(value);
  };

  const typeOptions: SelectProps['options'] = 
  [{ value: "isbn", label: "ISBN"},
  { value: "barcode", label: "條碼號"},
  { value: "marcid", label: "書目系統號"}];

  const saveOptions: SelectProps['options'] = 
  [{ value: "1", label: "新增"},
  { value: "0", label: "忽略不執行"}];
 
  const showOptions: SelectProps['options'] = 
  [{ value: "1", label: "是"},
  { value: "0", label: "否"}];

  let title  = "SDG "+sdgsId+" ";
  return (
    <PageContainer
        header={{ 
        title: title, 
        breadcrumb: breadcrumb,
        }}>
        <UploadTab 
            sdgsId={sdgsId}   
            match={{ url: '/sdgs', path: '/fileupload' }}
            location={{ pathname: 'fileupload' }}
        > 
        <Row gutter={[48, 24]}>
            <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>匯入資料類型{" :"}</Col>
            <Col span="12"> 
           <Select 
                placeholder="選擇匯入資料類型"
                onChange={handleTypeChange}
                style={{ width: 200 }}
                options={typeOptions}
            />
            </Col>
            <Col span="6">{'  '}</Col>
        </Row> <br />
        <Row gutter={[48, 24]}>
            <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>書目重複執行方式{" :"}</Col>
            <Col span="12"> 
           <Select 
                placeholder="選擇書目重複執行方式"
                onChange={handleSaveChange}
                style={{ width: 200 }}
                options={saveOptions}
            />
            </Col>
            <Col span="6">{'  '}</Col>
        </Row> <br />
        <Row gutter={[48, 24]}>
            <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>前台是否顯示
            <Tooltip title="每筆書目於前台僅能顯示一則推薦資訊。若選擇前台顯示，上傳後將顯示新增的內容，並自動隱藏原有的推薦。隱藏的項目可隨時於列表中再次設定顯示。">
              <InfoCircleOutlined twoToneColor="#eb2f96" /></Tooltip>{" :"}
            </Col>
            <Col span="12"> 
           <Select 
                placeholder="選擇前台是否顯示"
                defaultValue="0"
                onChange={handleShowChange}
                style={{ width: 200 }}
                options={showOptions}
            />
            </Col>
            <Col span="6">{'  '}</Col>
        </Row>
        <br /><br />  
        <Row gutter={[48, 24]}>
            <Col span="6"></Col>
            <Col span="12"> 
            <Dragger {...props} method="post">
                <p className="ant-upload-drag-icon">
                <InboxOutlined />
                </p>
                <p className="ant-upload-text">點擊或將文件拖曳到這裡上傳</p>
                <p className="ant-upload-hint"> 支援檔案格式：xlxs </p>
            </Dragger>
            </Col>
            <Col span="6">{'  '}</Col>
        </Row> 
        <br />
        <Row gutter={[48, 24]}>
            <Col span="6"></Col>
            <Col span="12"> 
            <center><Button  
                type="primary"  
                onClick={() => { 
                    window.location.href = '../清單匯入範本.xlsx';
                }}
             >下載範本</Button>{"   "}
             <Button   
                type="default" 
                onClick={() => {
                     history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId)}
                }
             >回上一頁</Button></center>
            </Col>
            <Col span="6">{'  '}</Col>
        </Row>
        <Divider />
        <Row gutter={[48, 24]}>
            <Col span="6"></Col>
            <Col span="12"> 
            {files.map((file, index) => (
                <div  style={{display: (display[file.uid] === "1")  ? 'block': 'none'}}  key={file.uid}>
                <span>{file.name}</span>{'  '}<Spin size="small" />
                <Progress percent={progress[file.uid] || 0} />
                </div>
            ))}
            {Object.values(msg).map((item, index) => (
                <div key={index}><span>{item}</span>{'  '} 
                <Button  
                    type="primary" 
                    size="small"
                    onClick={() => {  
                        //console.log(Object.keys(msg)[index]);
                        //console.log(Object.values(svrRep)[index]);
                        setIndex(index);
                        setData(Object.values(svrRep));
                        handleModalVisible(true);
                    }}
                >檢視結果</Button>{'  '} 
                <Progress percent={100} /></div>
            ))}
            </Col>  
            <Col span="6">{'  '}</Col>
        </Row>
        <UploadMessageForm   
            onCancel={() => {
                handleModalVisible(false);   
            }}  
            modalVisible={modalVisible}  
            data={data} 
            index={index} 
            label01="檔名"
        />    
        </UploadTab>
    </PageContainer>
  );
};

export default FileUploadComponent;