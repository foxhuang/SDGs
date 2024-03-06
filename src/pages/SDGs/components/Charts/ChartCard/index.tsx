import { Card } from 'antd';
import { CardProps } from 'antd/es/card';
import React from 'react'; 
type totalType = () => React.ReactNode;

const renderTotal = (total?: number | totalType | React.ReactNode) => {
  if (!total && total !== 0) {
    return null;
  }
  let totalDom;
  switch (typeof total) {
    case 'undefined':
      totalDom = null;
      break;
    case 'function':
      totalDom = <div>{total()}</div>;
      break;
    default:
      totalDom = <div>{total}</div>;
  }
  return totalDom;
};

export interface ChartCardProps extends CardProps {
  title: React.ReactNode;
  action?: React.ReactNode;
  total?: React.ReactNode | number | (() => React.ReactNode | number);
  footer?: React.ReactNode;
  contentHeight?: number;
  avatar?: React.ReactNode;
  style?: React.CSSProperties;
}

class ChartCard extends React.Component<ChartCardProps> {
  renderContent = () => {
    const { contentHeight, title, avatar, action, total, footer, children, loading } = this.props;
    if (loading) {
      return false;
    }
    return (
      <div>
        <div>
          <div>{avatar}</div>
          <div>
            <div>
              <span>{title}</span>
              <span>{action}</span>
            </div>
            {renderTotal(total)}
          </div>
        </div>
        {children && (
          <div style={{ height: contentHeight || 'auto' }}>
            <div>{children}</div>
          </div>
        )}
        {footer && (
          <div>
            {footer}
          </div>
        )}
      </div>
    );
  };

  render() {
    const {
      loading = false, 
      ...rest
    } = this.props;
    return (
      <Card loading={loading} bodyStyle={{ padding: '20px 24px 8px 24px' }} {...rest}>
        {this.renderContent()}
      </Card>
    );
  }
}

export default ChartCard;
