import { Component } from 'react'; 
import { PageContainer } from '@ant-design/pro-layout';
import { history } from 'umi'; 

interface ListSearchProps {
  match: {
    url: string,
    path: string,
  };
  location: {
    pathname: string,
  };
}

class UploadTab extends Component<ListSearchProps> {
  handleTabChange = (key: string) => {
    console.info('key', key);
    const { match,sdgsId } = this.props;
    const url = match.url === '/' ? '' : match.url;

 
    switch (key) {
      case 'fileupload':
        history.push(`${url}/fileupload?sdgsId=${sdgsId}`);
        break; 
      case 'bagupload':
        history.push(`${url}/bagupload?sdgsId=${sdgsId}`);
        break; 
      default:
        break;
    }
  };

  handleFormSubmit = (value: string) => {
    // eslint-disable-next-line no-console
    console.log(value);
  };

  getTabKey = () => {
    const { match, location } = this.props;
    const url = match.path === '/' ? '' : match.path; 
    console.info('getTabKey url', url); 
    console.info('getTabKey  location.pathname',  location.pathname);
    const tabKey = location.pathname.replace(`${url}/`, '');
    if (tabKey && tabKey !== '/') {
      console.info('getTabKey tabKey', tabKey); 
      return tabKey;
    }
    return 'list';
  };

   
  
    
  render() {
    const tabList = [
      {
        key: 'fileupload',
        tab: '清單匯入',
      },
      {
        key: 'bagupload',
        tab: '置物籃',
      } 
    ];
    const {children ,breadcrumb,title} = this.props; 


    return (
      <PageContainer
        header={{
          title: title, 
          breadcrumb:  breadcrumb ,
        }}
        tabList={tabList}
        tabActiveKey={this.getTabKey()}
        onTabChange={this.handleTabChange}
      >
        {children}
      </PageContainer>
    );
  }
}

export default UploadTab;
