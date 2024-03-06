import React, { useState, useEffect } from 'react';
 
import { Column } from '@ant-design/plots';

import { each, groupBy } from '@antv/util';

const DemoColumn = (props) => {   
  console.log('props.lfdata  ',  props.lfdata ); 
  const data = props.lfdata  || [];   
  console.log('fetch data data',  data); 
  const annotations = [];
  each(groupBy(data, 'year'), (values, k) => {
    console.log('fetch data values',  values); 
    const value = values.reduce((a, b) => a + b.value, 0);
    console.log('fetch data value',  value); 
    annotations.push({
      type: 'text',
      position: [k, value],
      content: `${value}`,
      style: {
        textAlign: 'center',
        fontSize: 14,
        fill: 'rgba(0,0,0,0.85)',
      },
      offsetY: -10,
    });
  });

  const config = {
    data,
    isStack: true,
    xField: 'year',
    yField: 'value',
    seriesField: 'type',
    label: {
      // 可手动配置 label 数据标签位置
      position: 'middle',
      // 'top', 'bottom', 'middle'
      // 可配置附加的布局方法
      layout: [
        // 柱形图数据标签位置自动调整
        {
          type: 'interval-adjust-position',
        }, // 数据标签防遮挡
        {
          type: 'interval-hide-overlap',
        }, // 数据标签文颜色自动调整
        {
          type: 'adjust-color',
        },
      ],
    },
    // 使用 annotation （图形标注）来展示：总数的 label
    annotations,
  }; 
  return <Column {...config} />;
  
};

 
export default DemoColumn;