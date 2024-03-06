 import { ProCard } from '@ant-design/pro-components'; 
 import GradientCircle from './GradientCircle'; 
 import numeral from 'numeral';
 
 const GateInCount = (props) => {  
    const divStyle1 = { 
        fontSize: '30px',    
        color: 'black',  
        fontWeight:'bold',         
    };
        
   let gateData = props.gateData || {};    
   const sum = gateData!==''? gateData.todaycnts : 0;  
   const message = gateData.message || '' ; 
   const name = gateData!=='' ? (message !=='' ?  message.code+" "+ message.name:'' ) :'';
 
   return ( 
     <> 
       <ProCard
            title={name}
            style={{ maxWidth: 400 }}  
            boxShadow
          >
          <GradientCircle  
            divStyle={divStyle1}
            lightOpen="1"  
            borderWidth={20}  
            titleContext="今日進館人數"
            labelContext={numeral(sum).format('0,0')}
            lightShow="0" 
            /> 
          </ProCard> 
     </>);
 };
 
 export default GateInCount;
 