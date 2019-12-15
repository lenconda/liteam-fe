import React from 'react';
import { List, Avatar, Badge } from 'antd';
import moment from 'moment';
import styles from './styles.less';

export interface MessageListItemComponentProps {
  avatar: string;
  name: string;
  currentMessage?: string;
  unread: number;
  onClick?: () => any;
  selected?: boolean;
  time: string;
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
      description={`${moment(props.time).fromNow()}·${props.currentMessage}`}
    />
  </List.Item>
);

export default MessageListItem;
