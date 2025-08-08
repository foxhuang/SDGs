import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import request from 'umi-request';
import React, { useEffect, useRef, useState } from "react";
import { Tab, DetailForm } from '../../components/SDGs';
import { getSDGs, delSDGsItem, addSDGsItem } from "../service";
import { DownOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import { Menu, Dropdown, Button, Space, message, DatePicker } from "antd";
import { ActionEditForm } from '../../components/SDGs';
import { SDGsItems } from "./data";
import { PageContainer } from '@ant-design/pro-layout';
import ExportExcelButton from '../../components/SDGs/ExportExcelButton';
const { RangePicker } = DatePicker;

const SDGsAction: React.FC<{}> = () => {
  let querystring = window.location.search.replace('?', '');
  let params = querystring.split('&');
  let sdgsId = 0;
  let maincodeId = 81001;


  params.map(param => {
    var q = param.split('=');
    if (q[0] === 'sdgsId') {
      sdgsId = parseInt(q[1]);
    }
  });

  const [id, setId] = useState<number>(0);

  const [detailModalVisible, handleDetailModalVisible] = useState<boolean>(
    false
  );
  const [editModalVisible, handleEditModalVisible] = useState<boolean>(
    false
  );
  const actionRef = useRef<ActionType>();
  const [tableData, setTableData] = useState({});
  const excelHeaders = [
    { title: '項目', key: 'title', type: 'string', width: 80 },
    { title: '資料來源', key: 'source', type: 'string', width: 15 },
    { title: '前台顯示', key: 'source', type: 'y&n0' },
    { title: '新增時間', key: 'insert_date', type: 'date', width: 20 },
  ];
  const columns: ProColumns<SDGsItems>[] = [
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
      title: '項目',
      dataIndex: 'title',
      ellipsis: true,
      width: 300,
    },
    {
      title: '資料來源',
      dataIndex: 'source',
      ellipsis: true,
    },

    {
      title: '前台顯示',
      dataIndex: 'isshow',
      valueEnum: {
        '-1': {
          text: '全部',
        },
        '0': {
          text: '否',
        },
        '1': {
          text: '是',
        },
      },
      ellipsis: true,
    },
    {
      title: '新增時間',
      key: 'insertDate',
      dataIndex: 'insert_date',
      valueType: 'date',
      renderFormItem: () => <RangePicker format={"YYYY-MM-DD"} />,
    },
    {
      title: '修改時間',
      key: 'showTime',
      dataIndex: 'update_date',
      valueType: 'date',
      hideInSearch: true,
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
              handleDetailModalVisible(true);
              setId(record.id);
            }}
          >
            詳細
          </Button>
          <Button
            type="default"
            onClick={async () => {
              if (confirm("確定要修改嗎？")) {
                let isshow = (record.isshow === 1) ? "0" : "1";
                record.isshow = isshow;
                const hide = message.loading("正在配置");
                try {
                  const result = await addSDGsItem(record);
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
            {record.isshow === 1 ? "隱藏" : "顯示"}
          </Button>
          {(record.source === '本館') && (
            <>
              <Button
                type="default"
                onClick={() => {
                  setId(record.id);
                  handleEditModalVisible(true);
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
                      const result = await delSDGsItem(record.id);
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

  const [breadcrumb, setData] = useState({});

  useEffect(() => {
    setData({
      items: [
        {
          title: 'SDGs 目標管理',
        },
        {
          title: <a href="../sdgs/">SDGs 目標列表</a>,
        },
        {
          title: "一起行動",
        },
      ],
    });
  }, []);

  const [SDGsData, setSDGsData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      let data = await getSDGs();
      if (data != undefined) setSDGsData(data);
    };
    fetchData();
  }, []);

  const handleRefresh = () => {
    setId(0);
    handleEditModalVisible(false);
    if (actionRef.current) actionRef.current.reload();
  };

  const handleFinish = () => {
    setId(0);
    handleEditModalVisible(false);
    window.location.reload();
  };

  let title = "SDG " + sdgsId + " ";
  if (SDGsData !== undefined && SDGsData.data !== undefined && SDGsData.data.length > 0 && sdgsId <= SDGsData.data.length) {
    title += SDGsData.data[sdgsId - 1].title;
  }

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <ExportExcelButton data={tableData} headers={excelHeaders} />
      </Menu.Item>

    </Menu>
  );
  /*
    <Menu.Item key="2">
      <Button type="primary"><UploadOutlined />匯入</Button>
    </Menu.Item> 
  */
  return (
    <PageContainer
      header={{
        title: title,
        breadcrumb: breadcrumb,
      }}
      extra={[(<>
        <Button
          type="primary"
          onClick={() => {
            setId(0);
            handleEditModalVisible(true);
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
        match={{ url: '/sdgs', path: '/sdgsaction' }}
        location={{ pathname: 'sdgsaction' }}
      >
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <ProTable<SDGsItems>
            columns={columns}
            actionRef={actionRef}
            cardBordered
            request={(params) => {
              return request<{
                data: SDGsItems[];

              }>('../../hysdgs/getSDGsItem', {
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
              maincodeId: maincodeId,
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
        {id !== 0 && (<>
          <DetailForm
            title="一起行動"
            label="行動項目"
            stype="action"
            onCancel={() => {
              handleDetailModalVisible(false);
              setId(0);
            }}
            modalVisible={detailModalVisible}
            id={id}
          /></>)}
      </Tab>
      <ActionEditForm
        onCancel={() => {
          handleEditModalVisible(false);
          setId(0);
        }}
        sdgsId={sdgsId}
        maincodeId={maincodeId}
        editModalVisible={editModalVisible}
        id={id}
        stitle="行動"
        handleRefresh={handleRefresh}
        handleFinish={handleFinish}
      />
    </PageContainer>
  );
};
export default SDGsAction;