 import { Column } from '@ant-design/plots';
 
 const GatePeopleCounter = (props) => {  
   let gateData = props.gateData|| []; 
  
   return ( 
     <> 
       <Column 
          data={gateData}
          xField="x"
          yField="y"
          paddingBottom={12}
          axis={{
            x: {
              title: false,
            },
            y: {
              title: false, 
              gridLineDash: null,
              gridStroke: '#ccc',
            },
          }}

          meta= {{
            y: {alias: '進館人數'} 
          }} 
          scale={{
            x: { paddingInner: 0.4 },
          }} 
        />
     </>);
 };
 
 export default GatePeopleCounter;
 