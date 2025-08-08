import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react"; 
import {  getSDGs } from "../service";
import { SDGsBooksItem } from "./data";
import { PageContainer } from '@ant-design/pro-layout';
import { BookListForm,BookViewForm } from '../../components/SDGs';  
import { Button,  Space ,DatePicker } from "antd";
 

const { RangePicker } = DatePicker;
const SDGsBooksList: React.FC<{}>  = () => {
  let sdgsId = 0;
    
  const [breadcrumb, setData] = useState({}); 
 
  const [isbn, setISBN]  = useState(''); 
  const [bookId, setBookId]  = useState(0);   
  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
    false
  ); 
  
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(
    false
  ); 
  


  useEffect(() => {
    const fetchData = async () => {
        await getSDGs(); 
    };
    fetchData();
  }, []);
  useEffect(() => {
      setData({ items: [
          {
            title: 'SDGs 書單總覽',
          },
      ],});
  }, []);

  const openBookList = (isbn: string) => {
    setISBN(isbn); 
    handleDetailModalVisible(true);  
  };


  const actionRef = useRef<ActionType>();   
  const columns: ProColumns<SDGsBooksItem>[] = [
    {
      title: "#",
      dataIndex: "seq",
      hideInSearch: true,
      hideInForm: true,
      width: 50,
      render: (text, record, index) => {
        return index + 1;
      },
    },
    {
      dataIndex: "id",
      hideInSearch: true,
      hideInForm: true,
      hideInTable: true, 
    },
    {
      title: '題名',
      dataIndex: 'title', 
      ellipsis: true,  
      width: 300,
    },
    { 
      title: 'ISBN',
      dataIndex: 'isbn', 
      ellipsis: true,  
    },
    { 
      title: '出版年',
      dataIndex: 'pubyear', 
      ellipsis: true,  
      hideInSearch: true,
    },  
    { 
        title: '資料來源',
        dataIndex: 'source', 
        ellipsis: true,   
    },
    { 
      title: 'SDGs目標',
      dataIndex: 'sdgsId', 
      valueEnum: {  
        '1': {
            text: '1', 
        },
        '2': {
           text: '2',  
        }, 
        '3': {
           text: '3',  
        }, 
        '4': {
           text: '4', 
        },
        '5': {
           text: '5',  
        }, 
        '6': {
           text: '6',  
        }, 
        '7': {
           text: '7', 
        },
        '8': {
           text: '8',  
        }, 
        '9': {
           text: '9',  
        }, 
        '10': {
           text: '10', 
        },
        '11': {
           text: '11',  
        }, 
        '12': {
           text: '12',  
        }, 
        '13': {
           text: '13', 
        },
        '14': {
           text: '14',  
        }, 
        '15': {
           text: '15', 
        },
        '16': {
           text: '16', 
        },
        '17': {
           text: '17',  
        },  
     },
      ellipsis: true,   
    },   
    {
      title: '新增時間',
      key: 'insertDate',
      dataIndex: 'insert_date',
      valueType: 'date', 
      renderFormItem: () => <RangePicker format={"YYYY-MM-DD"}/>,
    }, 
    { 
      title: '本館有書',  
      render: (_, record: any) => {
        return (<> 
          {(parseInt(record.marcId) !== 0 ) && (<> 
            <a  href="javascript:;" 
            onClick={() => {  
              openBookList(record.isbn) 
            }}>有</a> 
          </>)}
          {(parseInt(record.marcId) === 0 ) && (<>
            無
          </>)}
        </>);
      },
      ellipsis: true,  
      hideInSearch: true,
    },
    { 
      title: '本館有書',
      dataIndex: 'marcId', 
      valueEnum: {  
        '-1': {
          text: '全部', 
        },
        '0': {
          text: '無', 
        },
        '1': {
          text: '有',  
        }, 
      },
      ellipsis: true,  
      hideInTable: true,
    }, 
    { 
      title: '新增方式',
      dataIndex: 'stype', 
      valueEnum: { 
        '': {
          text: '全部', 
        },
        '0': {
          text: '單筆新增', 
        },
        '1': {
          text: '清單匯入',  
        }, 
        '2': {
          text: '置物籃',  
        }, 
      },
      ellipsis: true,  
      hideInTable: true,
    },  
    { 
      title: '前台顯示',
      dataIndex: 'isshow', 
      valueEnum: { 
        0: {
          text: '否', 
        },
        1: {
          text: '是',  
        }, 
      }, 
      ellipsis: true,   
    }, 
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 300,
      render: (_, record: any) => { 
        return (<Space> 
          <Button
              type="default"
              onClick={() => { 
                setBookId(parseInt(record.id));
              
                handleViewModalVisible(true);
              }}
            >
              詳細
            </Button> 
        </Space>);
      },
    },
  ];
  
  let title  = "書單總覽 ";
 
   
  return (<>
  <PageContainer
      header={{
      title: title, 
      breadcrumb:  breadcrumb ,
      }} 
      extra={[(<> </>)]}
  > 
 
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
    <ProTable<SDGsBooksItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return  request<{
          data: SDGsBooksItem[];
        }>('../../hysdgs/getSDGsBooks', { 
          params,
        }).then((response) => {
          if (response.data !== undefined) {
      
            return {
              data: response.data,
              muser: response.muser,
              success: response.success,
              total: response.total,
            };
          } else {
            return {
              data: [],
              success: false,
              total: 0,
            };
          }
        });  
      }}
       
      editable={{
        type: 'multiple',
      }}
       
      rowKey="id" 
      search={{
        labelWidth: 'auto',
      }} 
      options={{
        setting: {
          listsHeight: 400,
        },
      }} 
      pagination={{ 
        showSizeChanger: true,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"  
    />
    </Space>
 
 
  <BookListForm 
      onCancel={() => {
          handleDetailModalVisible(false);   
      }} 
      title="查詢館藏" 
      sdgsId = {sdgsId}
      modalVisible={detailModalVisible}
      isbn={isbn}
  /> 
  
   <BookViewForm   
    onCancel={() => {
        handleViewModalVisible(false);   
    }} 
    sdgsId = {-1}
    viewModalVisible={viewModalVisible}  
    id={bookId} 
  />
  </PageContainer>  
  </>);
};
export default SDGsBooksList;