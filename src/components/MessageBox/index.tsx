import React from 'react';
import { Card } from 'antd';
import styles from './styles.less';

export interface IMessage {
  // 发信人id
  from: number;
  // 收信人id
  to: number;
  // image：图片，text：文字，request：加好友请求
  type: 'image' | 'text' | 'request';
  // 如果是image或text，data中返回相应的图片链接或文字
  data: string;
  read: boolean;
  // e.g. '2019-12-14T15:40:17.753Z'
  time: string;
}

export interface MessageBoxComponentProps {
  message?: IMessage[];
  from: number;
  to: number;
  loading?: boolean;
}

const MessageBox: React.FC<MessageBoxComponentProps> = props => (
  !props.loading
  ? <div className={styles['message-box']}>
      {
        props.message &&
          props.message.map((value, index) => {
            if (
              (value.from === props.from || value.from === props.to)
              &&
              (value.to === props.to || value.to === props.from)
            ) {
              switch (value.type) {
                case 'image':
                  return (
                    <div
                      key={index.toString()}
                      className={
                        `${styles['message-item']} ${props.from === value.from ? styles.from : styles.to}`
                      }
                    >
                      <img src={value.data} alt={value.data} />
                    </div>
                  );
                case 'text':
                  return (
                    <div
                      key={index.toString()}
                      className={
                        `${styles['message-item']} ${props.from === value.from ? styles.from : styles.to}`
                      }
                    >
                      {value.data}
                    </div>
                  );
                case 'request':
                  return null;
                default:
                  return null;
              }
            } else {
              return null;
            }
          })
      }
      <div
        style={{ width: '100%' }}
        ref={el => el?.scrollIntoView({ behavior: 'auto' })}
      />
    </div>
  : <Card loading></Card>
);

export default MessageBox;
