import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch, AnyAction } from 'redux';
import { Card, Row, Col, Input } from 'antd';

const { TextArea } = Input;

interface MessagePageProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
}

const Message: React.FC<MessagePageProps> = props => {
  const { dispatch } = props;

  return (
    <Row gutter={24}>
      <Col xs={24} sm={10} md={8} xl={6}>
        <Card title="消息列表"></Card>
      </Col>
      <Col xs={24} sm={14} md={16} xl={18}>
        <Card title="彭瀚林">
          <TextArea></TextArea>
        </Card>
      </Col>
    </Row>
  );
};

export default Message;
