import React from 'react'; 
import { Upload, Button,message } from 'antd';
import { UploadOutlined } from '@ant-design/icons'; 
const FileUploadComponent = () => { 
    const props = { 
        name: 'uploadfile',
        method: 'POST',
        enctype:"multipart/form-data",
        action: '../../hysdgs/uploadSDGsFile', 
        onChange(info:any) { 
        if (info.file.status !== 'uploading') { 
            console.log(info.file, info.fileList); 
        } 
        if (info.file.status === 'done') { 
            message.success(`${info.file.name} file uploaded successfully`); 
        } else if (info.file.status === 'error') { 
            message.error(`${info.file.name} file upload failed.`); } }, 
    };
       
    return ( 
        <Upload {...props}>
            <Button icon={<UploadOutlined />}>Click to Upload</Button> 
        </Upload> );
    }; 

export default FileUploadComponent; 

