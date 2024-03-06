import { Gauge } from '@ant-design/plots';

const LendFileGauge = (props) => {   
  const lfcnts = props.lfdata.lfcnts||0;
  const totcnts = props.lfdata.totcnts||0;
  let percent = (lfcnts/(lfcnts + totcnts)) ||0;
  if((lfcnts + totcnts) == 0){
    percent=0;
  }
  const config = {
    percent: percent,
    range: {
      color: 'l(0) 0:#B8E1FF 1:#3D76DD',
    },
    startAngle: Math.PI,
    endAngle: 3 * Math.PI,
    indicator: null,
    height:120,
    statistic: {
      title: {
        offsetY: -36,
        style: {
          fontSize: '32px',
          color: '#4B535E',
        },
        formatter: () => Math.round((percent*100)) +'%',
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
 
export default LendFileGauge;
