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

class Tab extends Component<ListSearchProps> {
  handleTabChange = (key: string) => {
    console.info('key', key);
    const { match,sdgsId } = this.props;
    const url = match.url === '/' ? '' : match.url;

 
    switch (key) {
      case 'sdgsbooks':
        history.push(`${url}/sdgsbooks?sdgsId=${sdgsId}`);
        break;
      case 'sdgsaction':
        history.push(`${url}/sdgsaction?sdgsId=${sdgsId}&maincodeId=81001`);
        break;
      case 'sdgstalk':
        history.push(`${url}/sdgstalk?sdgsId=${sdgsId}&maincodeId=81002`);
        break;
      case 'sdgskeywd':
        history.push(`${url}/sdgskeywd?sdgsId=${sdgsId}`);
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
        key: 'sdgsbooks',
        tab: '書單',
      },
      {
        key: 'sdgsaction',
        tab: '一起行動',
      },
      {
        key: 'sdgstalk',
        tab: '一起討論',
      },
      {
        key: 'sdgskeywd',
        tab: '關鍵字',
      },
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

export default Tab;
