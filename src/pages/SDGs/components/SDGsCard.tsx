import {Typography,  Avatar, Card , Row   }   from "antd";  
import React, { useState, useEffect } from 'react';

const SDGsCard = (props) => { 
    const [ windowWidth ,setWindowWidth] = useState(300);
  
    // Update windowWidth when the window is resized
    const handleResize = () => {
        console.log("window.innerWidth"+window.innerWidth);
        if(window.innerWidth>=1600)
        setWindowWidth(350);
        if(window.innerWidth<1600 && window.innerWidth>=1350)
        setWindowWidth(300);
        if(window.innerWidth<1350 &&   window.innerWidth>=1200)
        setWindowWidth(270);
        if(window.innerWidth<1200)
        setWindowWidth(300); 
    };

    useEffect(() => {
        // Add event listener for window resize
        window.addEventListener('resize', handleResize);
        handleResize();
        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render
    
      const {  Paragraph, Text } = Typography;
      const { Meta } = Card;
      return (  
        <Card
            style={{ width: windowWidth  , marginTop: 16 }}
            actions={[<a href={"../sdgs/sdgsbooks?sdgsId="+props.no}>進入目標</a> 
            ]}>
            <Meta
                avatar={<Avatar style={{ backgroundColor: props.backgroundColor
                    , color:  props.fontColor  }}>{props.no}</Avatar>}
                title={props.title}
                description={  
                <Row justify={"center"} > 
                <Paragraph>
                    <Text strong style={{ fontSize: '36px' }}>
                    {props.bookCnts}
                    </Text>
                    {' '}
                    <Text   style={{ fontSize: '14px' }}>
                    種書目 
                    </Text>
                </Paragraph>
                </Row>
                }
            />
        </Card> 
      );
}

export default SDGsCard;