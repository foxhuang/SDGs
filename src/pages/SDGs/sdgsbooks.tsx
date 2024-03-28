import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/SDGs/Tab'; 
import {  getSDGs,delSDGsBooksById  } from "../service";
import { Button,  Space, message,DatePicker } from "antd";
import { history } from "umi";
import { PlusOutlined } from "@ant-design/icons";
import { SDGsBooksItem } from "./data";
import { PageContainer } from '@ant-design/pro-layout';
import { BookListForm,BookEditForm } from '../../components/SDGs'; 
 

const { RangePicker } = DatePicker;
const SDGsBooks: React.FC<{}>  = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
      sdgsId = parseInt(q[1]);
    } 
  }); 
    
  const [breadcrumb, setData] = useState({}); 
  const [SDGsData, setSDGsData]  = useState({}); 
  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
    false
  );
  const [isbn, setISBN]  = useState(''); 
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(
    false
  );

  const [bookId, setBookId]  = useState(0); 
  const [marcId, setMarcId]  = useState(0); 

  useEffect(() => {
    const fetchData = async () => {
      let data = await getSDGs();
      if (data !== undefined) setSDGsData(data);
    };
    fetchData();
  }, []);
  useEffect(() => {
      setData({ items: [
          {
            title: 'SDGs 目標管理',
          },
          { 
              title: <a href="../sdgs/">SDGs 目標列表</a>, 
          },
          { 
              title: "書單", 
          },
      ],});
  }, []);

  const openBookList = (isbn: string) => {
    console.log(isbn);
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
      hideInSearch: true,
    }, 
    {
      title: "操作",
      dataIndex: "option",
      valueType: "option",
      width: 300,
      render: (_, record: any) => {
        return (<Space> 
          {(record.source==='本館') && (
            <>
            <Button
              type="default"
              onClick={() => {
                setBookId(parseInt(record.id));
                setMarcId(parseInt(record.marcId));
                handleEditModalVisible(true);
                //history.push("/sdgsbooks/edit?sdgsId="+sdgsId+"&id=" + record.id+"&marcId=" + record.marcId);
              }}
            >
              修改
            </Button>
            <Button
              type="default"
              danger
              onClick={async () => {
                if (confirm("確定刪除嗎？")) {
                  const hide = message.loading("正在配置");
                  try {
                    const result = await delSDGsBooksById(record.id);
                    hide();
  
                    if (result !== null && result.success) {
                      message.success("刪除成功");
                      if (actionRef.current) actionRef.current.reload();
                    } else {
                      message.success("刪除失敗請重試！");
                    }
                  } catch (error) {
                    hide();
                  }
                  
                }
              }}
            >
              刪除
            </Button>
          </>
          )} 
        </Space>);
      },
    },
  ];
  
  let title  = "SDG "+sdgsId+" ";
  if(SDGsData!==undefined && SDGsData.data!==undefined && SDGsData.data.length>0 && sdgsId <= SDGsData.data.length  ){
    title += SDGsData.data[sdgsId-1].title;
  }

  return (<>
  <PageContainer
      header={{
      title: title, 
      breadcrumb:  breadcrumb ,
      }} 
      extra={[(<>
        <Button
          type="primary" 
          onClick={() => {
           setBookId(0);
           setMarcId(0);
           handleEditModalVisible(true);
            // history.push("/sdgsbooks/edit?sdgsId="+sdgsId+"&id=0");
          }}
        >
          <PlusOutlined /> 新建
        </Button>
      </>)]}
  >
  <Tab 
    sdgsId={sdgsId}  
    match={{ url: '/sdgs', path: '/sdgsbooks' }}
    location={{ pathname: 'sdgsbooks' }}
  >
    <Space direction="vertical" size="middle" style={{ width: "100%" }}>
   
    <ProTable<SDGsBooksItem>
      columns={columns}
      actionRef={actionRef}
      cardBordered
      request={(params) => {
        return request<{
          data: SDGsBooksItem[];
        }>('../../hysdgs/getSDGsBooks', { 
          params,
        });
      }}
       
      editable={{
        type: 'multiple',
      }}
       
      rowKey="id"
      params={{
        sdgsId: sdgsId,
      }}
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
  </Tab>
 
  <BookListForm
      title="查詢館藏" 
      sdgsId = {sdgsId}
      onCancel={() => {
          handleDetailModalVisible(false);   
      }} 
      modalVisible={detailModalVisible}
      isbn={isbn}
  /> 
  <BookEditForm 
   sdgsId = {sdgsId}
    onCancel={() => {
        handleEditModalVisible(false);   
    }} 
    editModalVisible={editModalVisible}  
    id={bookId}
    marcId={marcId}
  />
  </PageContainer>  
  </>);
};
export default SDGsBooks;