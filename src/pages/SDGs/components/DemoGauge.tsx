 
import { Gauge } from '@ant-design/plots';

const DemoGauge = (props) => {  
 
  const lfcnts = props.lfdata.lfcnts;
  const totcnts = props.lfdata.totcnts;
  const config = {
    percent: lfcnts/(lfcnts + totcnts),
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 3 * Math.PI,
    indicator: null,
    height:200,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '36px',
          color: '#4B535E',
        },
        formatter: () => Math.round(((lfcnts/(lfcnts+totcnts))*100)) +'%',
      },
      content: {
        style: {
          fontSize: '24px',
          lineHeight: '44px',
          color: '#4B535E',
        },
        formatter: () => '自助借書',
      },
    },
  };
  return <Gauge {...config} />;
};
 
export default DemoGauge;
