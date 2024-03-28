import {  Row,Col,  Layout,Breadcrumb  }   from "antd"; 
import { GridContent } from "@ant-design/pro-layout"; 
import { PageContainer } from '@ant-design/pro-components'; 
import SDGsCard from './components/SDGsCard'; 
import React, { useEffect, useState } from "react";
import {  getSDGs   } from "../service";

 

const sdgs: React.FC<{}>  = () => {
  const [SDGsData, setData]  = useState({}); 
  useEffect(() => {
    const fetchData = async () => {
      let data = await getSDGs();
      if (data != undefined) setData(data);
    };
    fetchData();
  }, []);

  return (
    <Layout>  
       <PageContainer
          fixedHeader
          header={{
            title: '目標列表',
            breadcrumb: {
              items: [
                {
                  title: 'SDGs 目標管理',
                },
                {
                  title: 'SDGs 目標列表',
                }, 
              ],
            },
          }} 
        >
        <Row
          gutter={24}
          style={{ 
            margin: '8px 8px',
          }}
        >    
        { SDGsData.data && SDGsData.data.map((item, index) => (  
          (<>         
          <Col xl={6} lg={12} md={12} sm={12} xs={12}> 
          <SDGsCard bookCnts={item.bookCnts} no={index+1} holdCnts={item.holdCnts}
            fontColor={item.fontColor}  backgroundColor={item.backgroundColor} title={item.title} /> 
          </Col></>) 
        ))}  
        </Row>  
      </PageContainer>
    </Layout>
  );
};
export default sdgs;
 