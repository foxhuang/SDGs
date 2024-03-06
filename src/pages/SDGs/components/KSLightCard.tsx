 
import GradientCircle from './GradientCircle'; 
  
 import {
     ProCard, 
   } from '@ant-design/pro-components';
   
 const KSLightCard = (props) => {  
    
   let row  = props.deviceData || [];  
   return ( 
     <> 
       <ProCard
         gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}
         style={{ marginBlockStart: 16 }}
       >  
        {row.map((device) => (  
        <ProCard 
            title={device.KeepSiteCode+" "+device.KeepSiteName} 
            boxShadow
        >
            <GradientCircle  
              divStyle={props.divStyle}
              lightOpen={device.DeviceState} 
              borderWidth={20}  
              titleContext={device.DeviceTypeName}
              labelContext={device.DeviceName} 
              lightShow="1" 
            /> 
        </ProCard> 
        ))}
        </ProCard>   
     </>);
 };
 
 export default KSLightCard;
 