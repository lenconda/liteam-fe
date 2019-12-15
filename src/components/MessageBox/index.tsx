import React from 'react';
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
}

const MessageBox: React.FC<MessageBoxComponentProps> = props => (
  <div className={styles['message-box']}>
    {
      props.message &&
        props.message.map((value, index) => {
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
        })
    }
  </div>
);

export default MessageBox;
