import { PageContainer, ProTable } from '@ant-design/pro-components';
import { Typography } from 'antd';
import React, { useEffect, useState } from 'react';

interface Restaurant {
    Name: string;
    Description: string;
    Address: string;
    createdAt: string;
    documentId: string;
    publishedAt: string;
    updatedAt: string;
}

const RestaurantTable: React.FC = () => {
    const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch('http://localhost:1337/graphql', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        query: `
              query {
                restaurants {
                  Name
                  Description
                  Address
                  createdAt
                  documentId
                  publishedAt
                  updatedAt
                }
              }
            `,
                    }),
                });

                const result = await response.json();
                setRestaurantData(result.data.restaurants);
            } catch (error) {
                console.error('資料擷取失敗:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const columns = [
        {
            title: '名稱',
            dataIndex: 'Name',
            key: 'name',
        },
        {
            title: '描述',
            dataIndex: 'Description',
            key: 'description',
            ellipsis: true,
        },
        {
            title: '地址',
            dataIndex: 'Address',
            key: 'address',
        },
        {
            title: '建立時間',
            dataIndex: 'createdAt',
            key: 'createdAt',
            valueType: 'dateTime',
        },
        {
            title: '文件 ID',
            dataIndex: 'documentId',
            key: 'documentId',
            copyable: true,
        },
        {
            title: '發佈時間',
            dataIndex: 'publishedAt',
            key: 'publishedAt',
            valueType: 'dateTime',
        },
        {
            title: '更新時間',
            dataIndex: 'updatedAt',
            key: 'updatedAt',
            valueType: 'dateTime',
        },
    ];

    return (
        <PageContainer header={{ title: '餐廳資訊' }}>
            <ProTable<Restaurant>
                headerTitle="餐廳列表"
                loading={loading}
                columns={columns}
                dataSource={restaurantData}
                rowKey="documentId"
                search={false}
                options={{
                    density: true,
                    fullScreen: true,
                    reload: false,
                    setting: true,
                }}
                pagination={false}
            />
        </PageContainer>
    );
};

export default RestaurantTable;