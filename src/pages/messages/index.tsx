import React from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch, AnyAction } from 'redux';
import { Card, Row, Col, Input } from 'antd';
import MessageBox from '@/components/MessageBox';
import { connect } from 'dva';
import { ConnectState, IGlobalModelState, IUserModelState } from '@/models/connect';

const { TextArea } = Input;

interface MessagePageProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
  global: IGlobalModelState;
  user: IUserModelState;
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
          <MessageBox
            message={props.global.messages}
            to={props.user.id || 0}
            from={1}
          />
          <TextArea></TextArea>
        </Card>
      </Col>
    </Row>
  );
};

export default connect(({ global, user }: ConnectState) => ({
  global,
  user,
}))(Message);
// export default Message;
