import React from 'react';
import styles from './styles.less';

export interface IMessage {
  from: string;
  to: string;
  // image：图片，text：文字，request：加好友请求
  type: 'image' | 'text' | 'request'
  // 如果是image或text，data中返回相应的图片链接或文字
  data: string | null;
  read: boolean;
}

export interface MessageBoxComponentProps {
  message?: IMessage[];
}

const MessageBox: React.FC<MessageBoxComponentProps> = props => (
  <textarea disabled className={styles['message-box']}>
  </textarea>
);

export default MessageBox;
