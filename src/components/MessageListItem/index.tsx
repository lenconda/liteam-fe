import React from 'react';
import { List, Avatar, Badge } from 'antd';
import Ellipsis from 'ant-design-pro/lib/Ellipsis';
import styles from './styles.less';

export interface MessageListItemComponentProps {
  avatar: string;
  name: string;
  currentMessage?: string;
  unread: number;
  onClick?: () => any;
  selected?: boolean;
}

const MessageListItem: React.FC<MessageListItemComponentProps> = props => (
  <List.Item
    onClick={props.onClick}
    className={`${styles.item} ${props.selected && styles.selected}`}
  >
    <List.Item.Meta
      avatar={
        <Badge count={props.unread}>
          <Avatar className={styles.avatar} src={props.avatar} />
        </Badge>
      }
      title={props.name}
      description={<Ellipsis length={25}>{props.currentMessage}</Ellipsis>}
    />
  </List.Item>
);

export default MessageListItem;
