import React, { useState } from 'react';
import { FormComponentProps } from 'antd/lib/form';
import { Dispatch, AnyAction } from 'redux';
import { Card, Row, Col, Input, Button, Upload } from 'antd';
import MessageBox from '@/components/MessageBox';
import { connect } from 'dva';
import _ from 'lodash';
import { ConnectState, IGlobalModelState, IUserModelState } from '@/models/connect';
import styles from './index.less';
import MessageListItem from '@/components/MessageListItem';

const { TextArea } = Input;

interface MessagePageProps extends FormComponentProps {
  dispatch: Dispatch<AnyAction>;
  global: IGlobalModelState;
  user: IUserModelState;
  fetchMessagesLoading: boolean;
}

const Message: React.FC<MessagePageProps> = props => {
  const [currentMessage, setCurrentMessage] = useState<string>('');

  const { dispatch } = props;

  const messagesMapping = {
    image: '[图片]',
    request: '[请求加为好友]',
  };

  return (
    <Row gutter={24}>
      <Col xs={24} sm={10} md={8} xl={6}>
        <Card title="消息列表" bodyStyle={{ padding: 0 }}>
          {
            props.global.messageSenders &&
              props.global.messageSenders.map((value, index) => (
                <MessageListItem
                  key={index.toString()}
                  unread={value.count}
                  name={value.from.username || ''}
                  avatar={value.from.avatar || ''}
                  selected={props.global.currentSender?.id === value.from.id}
                  currentMessage={
                    value.currentMessage.type === 'text'
                    ? value.currentMessage.data
                    : messagesMapping[value.currentMessage.type]
                  }
                  time={value.currentMessage.time}
                  onClick={() => {
                    if (value.from.id !== props.global.currentSender?.id) {
                      dispatch({
                        type: 'global/getCurrentSender',
                        payload: value.from.id,
                      });
                      dispatch({
                        type: 'global/flushMessages',
                        payload: {
                          from: value.from,
                          to: props.user.id,
                        },
                      });
                    }
                  }}
                />
              ))
          }
        </Card>
      </Col>
      {
        props.global.currentSender?.id &&
          <Col xs={24} sm={14} md={16} xl={18}>
            <Card title={props.global.currentSender?.username}>
              <MessageBox
                message={props.global.messages}
                to={props.user.id || 0}
                from={1}
                loading={props.fetchMessagesLoading}
                isFriend={props.global.currentSender.isFriend}
                rejected={props.global.currentSender.rejected}
                onAccept={() => {
                  dispatch({
                    type: 'global/acceptRequest',
                  });
                }}
                onReject={() => {
                  dispatch({
                    type: 'global/rejectRequest',
                  });
                }}
              />
              {
                props.global.currentSender.isFriend &&
                  <div>
                    <div className={styles.buttons}>
                      <Upload type="select">
                        <Button icon="file-image" type="primary" size="small">图片</Button>
                      </Upload>
                      <Button
                        type="primary"
                        size="small"
                        icon="check"
                        disabled={currentMessage.length === 0}
                        onClick={() => {
                          dispatch({
                            type: 'global/getOneMessage',
                            payload: {
                              from: props.user.id,
                              to: 1,
                              data: currentMessage,
                              type: 'text',
                              read: true,
                              time: new Date().toLocaleString(),
                            },
                          });
                          setCurrentMessage('');
                        }}
                      >
                        发送
                      </Button>
                    </div>
                    <TextArea
                      value={currentMessage}
                      onChange={e => setCurrentMessage(e.target.value)}
                    />
                  </div>
              }
            </Card>
          </Col>
      }
    </Row>
  );
};

export default connect(({ global, user, loading }: ConnectState) => ({
  global,
  user,
  fetchMessagesLoading: loading.effects['global/getAllMessages'],
}))(Message);
