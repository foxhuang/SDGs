import { Card,   } from "antd";

import React from "react";
import { VisitDataType } from "../data";
import { Bar } from "./Charts";
 

 

const OneYearCard = ({ data, loading }: { data: VisitDataType[]; loading: boolean }) => (
  <Card loading={loading} bordered={false} bodyStyle={{ padding: 0 }}>
    <div>
       
       
          <div>
            <Bar height={295} title="" data={data} />
          </div>
 
    
    </div>
  </Card>
);

export default OneYearCard;
