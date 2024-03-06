import {  Col, Row    } from "antd"; 
const CircleWithBorder = (props) => { 
  const borderWidth = props.borderWidth* 2;  
   
 
  const divStyle  = { 
    fontSize: '16px',    
    color: 'black',   
    fontWeight:'bold',        
  }; 
  
  const divStyle2 = { 
    fontSize: '18px', 
    fontWeight:'bold',   
    color: 'black',      
  }; 
 

  return (
    <> 
    <Row>
    <Col>
    <Row  style={divStyle}>
     {props.titleContext} 
    </Row>
    <Row style={props.divStyle}> 
    {props.labelContext}  
    </Row> 
    </Col>  
    {props.lightShow ==='1' && (<>  
    <Col  style={divStyle2} > 
    <img  width={borderWidth} height={borderWidth} src={(props.lightOpen ===1 )? 'images/green.png':'images/red.png'}   />
    {(props.lightOpen ===1 )?'正常':'異常'} 
    </Col></>)}   
    </Row></>);
};

export default CircleWithBorder;
