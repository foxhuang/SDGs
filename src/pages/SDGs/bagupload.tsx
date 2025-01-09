import React, { useEffect, useState } from "react";
import { PageContainer } from '@ant-design/pro-layout';
import { SelectProps, Tooltip,Row,Col, Divider,Upload, message ,Button,Select} from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';
import { UploadMessageForm } from '../../components/SDGs';  
import UploadTab from '../../components/SDGs/UploadTab'; 
import { history } from "umi"; 
import {  getBagM ,addSDGsBooksByBagM } from "../../pages/service";  

const { Option } = Select;

const BagMUploadComponent = () => {
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
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bagmId, setBagMId] = useState("0");
    const [bagmLabel, setBagMLabel] = useState("");
    
    const [formSave, setformSave] = useState('1');
    const [formShow, setformShow] = useState('0');
    const [msg, setMsg] = useState({}); 
    const [svrRep, setResponse] = useState({});
    const [data, setData] = useState({});
    const [index, setIndex] = useState(0);
    const [modalVisible, handleModalVisible] = useState<boolean>(
      false
    ); 

    useEffect(() => {
        const fetchOptions = async () => {
        setLoading(true);
        try {
            const response =await getBagM();
            setOptions(response.data);
        } catch (error) {
            console.error('Error fetching options:', error);
        } finally {
            setLoading(false);
        }
        };
        fetchOptions();
    }, []);

    useEffect(() => {
        setBreadcrumb({
          items: [
            { title: 'SDGs 目標管理' },
            { title: <a href="../sdgs/">SDGs 目標列表</a> },
            { title: <a href={"../sdgs/sdgsbooks?sdgsId="+sdgsId}>SDG {sdgsId} 書單</a> },
            { title: "SDG "+sdgsId+" 置物籃書單匯入" },
          ],
        });
      }, []);
    
    const handleChange = (value: string) => {
        console.log(`Selected: ${value}`);
        setBagMId(value);
        const selectedOption = options.find(option => option.value === value);
        const label = selectedOption ? selectedOption.label : '';
        console.log(`Selected option: ${label}`);
        setBagMLabel(label);
    };

    const handleSaveChange = (value: string) => {
        console.log(`Selected: ${value}`);
        setformSave(value);
      };
    
      const handleShowChange = (value: string) => {
        console.log(`Selected: ${value}`);
        setformShow(value);
      };

    const addImport = async () => { 
        if (bagmId !== "0") {
            let response = await addSDGsBooksByBagM(parseInt(bagmId), sdgsId,parseInt(formSave),parseInt(formShow)); 
            console.log(response);
            if (Boolean(response.success)) {
                // Handle success case
                message.success(bagmLabel + "匯入成功");
                response.fileName = bagmLabel;
                setResponse({ ...svrRep, [bagmLabel]: response}); 
                setMsg({ ...msg, [bagmLabel]: `置物籃 : ${bagmLabel}   共`+ (response!==null ?response.total:0)+` 筆`});
   
            }else{
                message.error("匯入失敗");
            }
        }else{
            message.error("請選擇置物籃");
        }
    };
    
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
            match={{ url: '/sdgs', path: '/bagupload' }}
            location={{ pathname: 'bagupload' }}
        >
        <div  style={{
            background: 'rgba(0, 0, 0, 0.02)',
            border:'1px dashed #d9d9d9',
            minHeight: 200,
            padding: 24 }}>
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
            </Row><br />
            <Row gutter={[48, 24]}>
                <Col span={6} style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>前台是否顯示
                <Tooltip title="每筆書目於前台僅能顯示一則推薦資訊。若選擇前台顯示，上傳後將顯示新增的內容，並自動隱藏原有的推薦。隱藏的項目可隨時於列表中再次設定顯示。">
                <InfoCircleOutlined twoToneColor="#eb2f96"/></Tooltip>{" :"}
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
            </Row><br />
            <Row gutter={[48, 24]}>
                <Col span="6"></Col>
                <Col span="12"> 
                <Select
                    showSearch
                    placeholder="置物籃名稱"
                    style={{ width: '100%' }}
                    loading={loading}
                    onChange={handleChange}
                    optionLabelProp="label">
                    <Option  value={"0"} label={"請選擇"}>
                    請選擇
                    </Option>
                    {options.map((option) => (
                    <Option key={option.value} value={option.value} label={option.label}>
                        {option.label}
                    </Option>
                    ))}
                </Select>
                <br/><br/><br/><br/>
                <center><Button  
                    type="primary"  
                    onClick={() => { 
                        addImport();
                    }}
                >匯入</Button>{"   "}
                <Button   
                    type="default" 
                    onClick={() => {
                        history.push("/sdgs/sdgsbooks?sdgsId="+sdgsId)}
                    }
                >回上一頁</Button></center>
                </Col>
                <Col span="6">{'  '}</Col>
            </Row>
        </div>
        <Divider />
        <Row>
        <Col span="6"></Col>
        <Col span="12"> 
        {Object.values(msg).map((item, index) => (<> 
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
            >檢視結果</Button>{'  '}</div><br/>
        </>))} 
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
            label01="置物籃"
        />  
        </UploadTab>
    </PageContainer>);
};

export default BagMUploadComponent;