import React  from 'react';
import { useIntl } from '@umijs/max';
import { PageContainer } from '@ant-design/pro-components';
import { 
  Button, 
  Card, 
  Upload,
  message,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { upload } from '../upload';

const TableList: React.FC<{}> = () => { 
  const { formatMessage } = useIntl();
 

  return (
    <PageContainer>
      <Card> 
        <Upload
          name="file"
          maxCount={1}
          beforeUpload={(file) => {  
            upload(file)
              .then((res) => {
                if (res.success) {  
                  console.log(res.message);
                }
              })
              .catch((res) => { 
                console.error(res);
              });
            return false;
          }} 
        >
          <Button icon={<UploadOutlined />}>
           uploadCSV
          </Button>
        </Upload>
        <br /> 
      </Card>
    </PageContainer>
  );
};

export default TableList;
