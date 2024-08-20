import React from 'react';
import * as XLSX from 'xlsx';
import { Button  } from "antd";  
import moment from "moment";
import { FileExcelOutlined  } from "@ant-design/icons";

const ExportExcelButton: React.FC = (props: any) => {
    const { data,headers } = props; 

 
    const handleExport = () => {
        console.log(data); 
        // Set column widths
        const wscols = []; 
        const mappedData = data.map(item => {
            const mappedItem = {}; 
            headers.forEach(header => {
                if(header.type !== undefined && header.type==='date'){
                    mappedItem[header.title] = moment(item[header.key]).format("YYYY-MM-DD HH:mm")
                }else if(header.type !== undefined && header.type==='y&n0'){
                    mappedItem[header.title] = item[header.key]===0 ? "否":"是";
                }else{
                    mappedItem[header.title] = item[header.key];
                }
                wscols.push({ wch: header.width || 10 });
            });
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
        link.download = 'data.xlsx';
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
            <Button onClick={handleExport}>
                <FileExcelOutlined  />
                匯出
            </Button>
        </>
    );
};

export default ExportExcelButton;