import React from 'react';
import { List, Avatar, Badge } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from './styles.less';

export interface MessageListItemComponentProps {
  avatar: string;
  name: string;
  currentMessage?: string;
  unread: number;
}

const MessageListItem: React.FC<MessageListItemComponentProps> = props => (
  <Badge count={props.unread}>
    <List.Item.Meta
      style={styles['cursor-pointer']}
      avatar={<Avatar src={props.avatar} />}
      title={props.name}
      description={<Ellipsis length={25}>{props.currentMessage}</Ellipsis>}
    />
  </Badge>
);

export default MessageListItem;
