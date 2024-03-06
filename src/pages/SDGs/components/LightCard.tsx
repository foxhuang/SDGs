import GradientCircle from './GradientCircle'; 
import KSLightCard from './KSLightCard'; 
import { ModalForm } from '@ant-design/pro-components';
import {
    ProCard, 
  } from '@ant-design/pro-components';
  
const LightCard = (props) => {  
  const divStyle2 = { 
    fontSize: '14px',    
    color: 'black',        
  };
  let row1 = props.deviceData1 || []; 
  let row3 = props.deviceData3 || []; 
  let row4 = props.deviceData4 || []; 
  let row5 = props.deviceData5 || []; 
  const device1 = row1.length>0?row1[0]:[];
  const device3 = row3.length>0?row3[0]:[];
  const device4 = row4.length>0?row4[0]:[];
  const device5 = row5.length>0?row5[0]:[];
  return ( 
    <> 
      <ProCard
        gutter={[{ xs: 8, sm: 8, md: 16, lg: 24, xl: 32 }, 16]}
        style={{ marginBlockStart: 16 }}
      >   
        {row1.length>0 &&(
        <ProCard
          title={device1.KeepSiteCode+" "+device1.KeepSiteName} 
          boxShadow
          actions={row1.length>1 ?( 
            <ModalForm
              title={device1.DeviceTypeName}
              trigger={<div>更多</div>}
              submitter={{
                resetButtonProps: {
                  type: 'dashed',
                },
                submitButtonProps: {
                  style: {
                    display: 'none',
                  },
                },
              }}
              onFinish={async (values) => { 
                console.log(values); 
                return true;
              }}
            >
            <KSLightCard  divStyle={divStyle2} deviceData={row1||[]}  />
            </ModalForm> 
           ):(<div></div>)} 
        >   
        <GradientCircle  
          divStyle={divStyle2}
          lightOpen={device1.DeviceState} 
          borderWidth={20}  
          titleContext={device1.DeviceTypeName}
          labelContext={device1.DeviceName} 
          lightShow="1" 
          row1={row1}
          />  
        </ProCard>  
        )}
        {row3.length>0 &&(
        <ProCard
          title={device3.KeepSiteCode+" "+device3.KeepSiteName} 
          boxShadow
          actions={row3.length>1 ? ( 
          <ModalForm
            title={device3.DeviceTypeName}
            trigger={<div>更多</div>}
            submitter={{
              resetButtonProps: {
                type: 'dashed',
              },
              submitButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }}
            onFinish={async (values) => { 
              console.log(values); 
              return true;
            }}
          >
          <KSLightCard   deviceData={row3||[]}  />
          </ModalForm>
          ):(<div></div>)}
        >
        <GradientCircle  
          divStyle={divStyle2}
          lightOpen={device3.DeviceState} 
          borderWidth={20}  
          titleContext={device3.DeviceTypeName}
          labelContext={device3.DeviceName} 
          lightShow="1" 
          />
          
        </ProCard> 
        )}
        {row4.length>0 &&(
        <ProCard
          title={device4.KeepSiteCode+" "+device4.KeepSiteName} 
          boxShadow
          actions= {row4.length>1 ? ( 
          <ModalForm
            title={device4.DeviceTypeName}
            trigger={<div>更多</div>}
            submitter={{
              resetButtonProps: {
                type: 'dashed',
              },
              submitButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }}
            onFinish={async (values) => { 
              console.log(values); 
              return true;
            }}
          >
          <KSLightCard   deviceData={row4||[]}  />
          </ModalForm>
          ):(<div></div>)}
        >
        <GradientCircle  
          divStyle={divStyle2}
          lightOpen={device4.DeviceState} 
          borderWidth={20}  
          titleContext={device4.DeviceTypeName}
          labelContext={device4.DeviceName} 
          lightShow="1" 
          /> 
         
        </ProCard> 
        )}
        {row5.length>0 &&(
        <ProCard
          title={device5.KeepSiteCode+" "+device5.KeepSiteName} 
          boxShadow
          actions={row5.length>1 ? ( 
          <ModalForm
            title={device5.DeviceTypeName}
            trigger={<div>更多</div>}
            submitter={{
              resetButtonProps: {
                type: 'dashed',
              },
              submitButtonProps: {
                style: {
                  display: 'none',
                },
              },
            }}
            onFinish={async (values) => { 
              console.log(values); 
              return true;
            }}
          >
          <KSLightCard   deviceData={row5||[]}  />
          </ModalForm>
         ):(<div></div>)}
        >
        <GradientCircle  
          divStyle={divStyle2}
          lightOpen={device5.DeviceState} 
          borderWidth={20}  
          titleContext={device5.DeviceTypeName}
          labelContext={device5.DeviceName} 
          lightShow="1" 
          /> 
          
        </ProCard> 
        )}
          </ProCard>   
    </>);
};

export default LightCard;
