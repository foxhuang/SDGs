import React, { useEffect, useState } from "react";
import {Modal, Progress } from 'antd';

 
const SpinForm: React.FC<{}> = (props) => {
    const { modalVisible, seconds} = props; 
    const [second , setSeconds] = useState(seconds||0);
    console.log("second="+second);  
    useEffect(() => {
        let interval   = setInterval(() => {
            setSeconds(second => (second < 19 ? (second + 1):19));
        }, 1000);  
    }, []);


    return ( <> 
     <Modal destroyOnClose  closable={false}   visible={modalVisible} width={350}  footer={null}> 
        <h3 style={{textAlign: 'center' }}>資料生成中，約需一分鐘時間，請稍後。</h3> 
        <div style={{ paddingTop: 10, textAlign: 'center' }}> 
            <Progress strokeLinecap="butt" type="circle" percent={(second*5)} />
        </div>   
    </Modal>
  </> );
};

export default SpinForm;
