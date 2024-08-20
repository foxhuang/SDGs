import React, { useEffect, useState } from "react"; 
import { Divider,Modal,Row, Col ,Button} from "antd";  
import '../../pages/css/customButtonStyles.css';   
import * as XLSX from 'xlsx';

const UploadMessageForm: React.FC<{}> = (props: any) => {
    const { modalVisible, onCancel,data,index,label01 } = props;   
    console.info("data====>", data);
    const [fileName, setFileName] =useState('');  
    const [success, setSuccess] =useState(0);  
    const [fail, setFail] =useState(0);  
    const [failMsg, setFailMsg] =useState('');  
    useEffect(() => {  
        if(data!==undefined && data.length>0){
            setFileName(data[index].fileName||''); 
            setSuccess(data[index].success||0);
            setFail(data[index].fail||0);
            setFailMsg(data[index].failMsg||''); 
        }
    }, [data]); 

 
 
    const handleExport = () => {
        console.log(failMsg); 
        // Set column widths
        const wscols = []; 
        const mappedData = failMsg.split("^A^").map(item => {
            const mappedItem = {}; 
            mappedItem["錯誤資料"] = item.split("^Z^")[0];
            mappedItem["說明"] = item.split("^Z^")[1];
            wscols.push({ wch: 20 },{ wch: 15 });
            return mappedItem;
          });

          console.log(mappedData); 
        // Create a new worksheet
        const worksheet = XLSX.utils.json_to_sheet(mappedData);
        worksheet['!cols'] = wscols;
        // Create a new workbook
        const workbook = XLSX.utils.book_new();
      
        // Add the worksheet to the workbook
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');

        // Generate a binary string from the workbook
        const excelData = XLSX.write(workbook, { bookType: 'xlsx', type: 'binary' });

        // Convert the binary string to a Blob
        const blob = new Blob([s2ab(excelData)], { type: 'application/octet-stream' });

        // Create a download link and trigger the download
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = '錯誤資料.xlsx';
        link.click();

        // Clean up the URL and the link
        URL.revokeObjectURL(url);
        //document.body.removeChild(link);
    };

    // Utility function to convert a string to an ArrayBuffer
    const s2ab = (s: string) => {
        const buf = new ArrayBuffer(s.length);
        const view = new Uint8Array(buf);
        for (let i = 0; i < s.length; i++) {
            view[i] = s.charCodeAt(i) & 0xff;
        }
        return buf;
    };
   
    return (
        <> 
        <Modal destroyOnClose title="檢視結果" visible={modalVisible} onCancel={() => onCancel()} width={500} footer={null}>
           <Divider /> 
           <Row gutter={[48, 24]}>
             <Col span="6">{label01}：</Col>
             <Col span="18">{fileName}</Col>
            </Row> 
            <Row gutter={[48, 24]}>
            <Col span="6">匯入結果：</Col>
            <Col span="18">
                <p>成功 {success} 筆</p>
                <p>失敗 {fail} 筆</p>
            </Col>
            </Row>
            <Divider /> 
        {fail>0 &&(
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
                type="primary" 
                onClick={() => {
                    handleExport(); 
                }}
            >
                下載錯誤報告 
            </Button>
            </div>
        )} 
    </Modal></>
    );
};
export default UploadMessageForm;

 

 
