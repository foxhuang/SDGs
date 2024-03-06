import {  StatisticCard } from '@ant-design/pro-components';
const { Statistic } = StatisticCard;
import {  Col, Row    } from "antd"; 
const CardGroup = (props) => {
  const circleRadius = props.circleRadius; // 圆形的半径
  const borderWidth = props.borderWidth; // 外框的宽度 
  const totalSize = circleRadius * 2 + borderWidth * 2; // 圆形的直径加上外框的宽度
 
  const divStyle  = { 
    fontSize: '16px',    
    color: 'black',   
    fontWeight:'bold',        
  }; 
  
  const divStyle2 = { 
    fontSize: '20px', 
    fontWeight:'bold',   
    color: 'black',      
  }; 
 

    return (<> 
        <StatisticCard style={divStyle}  
            statistic={{
                title:   props.titleContext ,
                value:   (props.lightOpen ===1 )?'正常':'異常'    ,
                description: ( 
                <svg width={totalSize} height={totalSize}>
                <circle
                    cx={circleRadius + borderWidth} // 圆心的 x 坐标
                    cy={circleRadius + borderWidth} // 圆心的 y 坐标
                    r={circleRadius + borderWidth} // 圆形的半径，包括外框的宽度
                    fill="transparent" // 外框的填充色（透明）
                    stroke="black" // 外框的颜色
                    strokeWidth={borderWidth} // 外框的宽度
                />
                {/* 绘制圆形 */}
                <circle
                    cx={circleRadius + borderWidth} // 圆心的 x 坐标
                    cy={circleRadius + borderWidth} // 圆心的 y 坐标
                    r={circleRadius} // 圆形的半径
                    fill={ (props.lightOpen ===1 )?'#5def60':'#FF0000'} // 圆形的填充色
                /> 
                </svg> 
             
                ),
            }}
        />
    </>)
};

export default CardGroup;
