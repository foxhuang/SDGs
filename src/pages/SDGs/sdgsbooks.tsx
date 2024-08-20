import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components'; 
import request from 'umi-request'; 
import React, { useEffect, useRef, useState } from "react";
import Tab from '../../components/SDGs/Tab'; 
import ExportExcelButton from '../../components/SDGs/ExportExcelButton'; 
import {  getSDGs,delSDGsBooksById,addSDGsBooks  } from "../service";
import { SDGsBooksItem } from "./data";
import { PageContainer } from '@ant-design/pro-layout';
import { BookListForm,BookViewForm,BookEditForm } from '../../components/SDGs'; 
import { DownOutlined,PlusOutlined,UploadOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button,  Space, message,DatePicker } from "antd";
import { history } from "umi";

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
  const [isbn, setISBN]  = useState(''); 
  const [bookId, setBookId]  = useState(0); 
  const [marcId, setMarcId]  = useState(0); 

  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
    false
  ); 
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(
    false
  ); 
  const [viewModalVisible, handleViewModalVisible] = useState<boolean>(
    false
  ); 
  


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
    setISBN(isbn); 
    handleDetailModalVisible(true);  
  };


  const actionRef = useRef<ActionType>(); 
  const [tableData, setTableData] = useState({});  
  const excelHeaders = [
    { title: '題名', key: 'title' , type: 'string', width: 100},
    { title: 'ISBN', key: 'isbn' , type: 'string', width: 20},
    { title: '出版年', key: 'pubyear', type: 'string'},
    { title: '資料來源', key: 'source', type: 'string' , width: 15}, 
    { title: '新增時間', key: 'insert_date', type: 'date', width: 20 }, 
    { title: '本館有書', key: 'marcId', type: 'y&n0'},  
  ];
  const handleRefresh = () => { 
    handleEditModalVisible(false);
    if (actionRef.current) actionRef.current.reload();
  };

  const handleFinish = () => {
    handleEditModalVisible(false);
    window.location.reload();
  };
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
           <Button
              type="default"
              onClick={async () => {
                if (confirm("確定要修改嗎？")) {
                  let isshow = (record.isshow === 1) ? "0" : "1"  ;
                  record.isshow = isshow;  
                  const hide = message.loading("正在配置");
                  try {
                      const result = await addSDGsBooks(record); 
                      hide();
    
                      if (result !== null && result.success) {
                        message.success("修改成功");
                        if (actionRef.current) actionRef.current.reload();
                      } else {
                        message.success("修改失敗請重試！");
                      }
                    } catch (error) {
                      message.success("修改失敗請重試！");
                      hide();
                    } 
                  }
              }}
            >
            {record.isshow === 1 ? "隱藏" : "顯示" } 
            </Button>
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
          </> )} 
          {(record.insert_muser_id !== '' && record.insert_muser_id !== null && parseInt(record.insert_muser_id)===1) && (<>
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
                    message.success("刪除失敗請重試！");
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
  
  const menu = (
    <Menu>
     <Menu.Item key="1">
        <ExportExcelButton data={tableData} headers={excelHeaders}/> 
      </Menu.Item>
      <Menu.Item key="2">
        <Button  
          onClick={() => { history.push("/sdgs/fileupload?sdgsId="+sdgsId)}}
          type="primary">
          <UploadOutlined />匯入
        </Button>
      </Menu.Item> 
    </Menu>
  );

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
        <Dropdown overlay={menu}>
          <Button>
            工具 <DownOutlined />
          </Button>
        </Dropdown>  
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
        return  request<{
          data: SDGsBooksItem[];
        }>('../../hysdgs/getSDGsBooks', { 
          params,
        }).then((response) => {
          if (response.data !== undefined) {
            setTableData(response.data);
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
      onCancel={() => {
          handleDetailModalVisible(false);   
      }} 
      title="查詢館藏" 
      sdgsId = {sdgsId}
      modalVisible={detailModalVisible}
      isbn={isbn}
  /> 
  <BookEditForm   
    onCancel={() => {
        handleEditModalVisible(false);   
    }} 
    sdgsId = {sdgsId}
    editModalVisible={editModalVisible}  
    id={bookId}
    marcId={marcId}
    handleRefresh={handleRefresh}
    handleFinish={handleFinish}
  />
   <BookViewForm   
    onCancel={() => {
        handleViewModalVisible(false);   
    }} 
    sdgsId = {sdgsId}
    viewModalVisible={viewModalVisible}  
    id={bookId} 
  />
  </PageContainer>  
  </>);
};
export default SDGsBooks;