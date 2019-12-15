import { Icon, Menu, Spin, Avatar } from 'antd';
import { ClickParam } from 'antd/es/menu';
import React from 'react';
import { connect } from 'dva';
import router from 'umi/router';
import { ConnectProps, ConnectState } from '@/models/connect';
import { IUserModelState } from '@/models/user';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';

export interface GlobalHeaderRightComponentProps extends ConnectProps {
  currentUser?: IUserModelState;
  menu?: boolean;
  // account?: string;
  // name?: string;
}

const AvatarDropdown: React.FC<GlobalHeaderRightComponentProps> = ({
  dispatch,
  currentUser,
  menu,
}) => {
  const onMenuClick = (event: ClickParam) => {
    const { key } = event;

    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      return;
    }

    router.push(`/account/${key}`);
  };

  const menuHeaderDropdown = (
    <Menu className={styles.menu} selectedKeys={[]} onClick={onMenuClick}>
      {menu && (
        <Menu.Item key="center">
          <Icon type="user" />
          个人中心
        </Menu.Item>
      )}
      {menu && (
        <Menu.Item key="settings">
          <Icon type="setting" />
          个人设置
        </Menu.Item>
      )}
      {menu && <Menu.Divider />}

      <Menu.Item key="logout">
        <Icon type="logout" />
        退出登录
      </Menu.Item>
    </Menu>
  );

  return currentUser?.username ? (
    <HeaderDropdown overlay={menuHeaderDropdown}>
      <span className={`${styles.action} ${styles.account}`}>
        {
          <Avatar size="small" className={styles.avatar} src={currentUser?.avatar} alt="avatar" />
        }
        <span className={styles.name}>{currentUser?.username}</span>
      </span>
    </HeaderDropdown>
  ) : (
    <Spin
      size="small"
      style={{
        marginLeft: 8,
        marginRight: 8,
      }}
    />
  );
};

export default connect(({ user }: ConnectState) => ({
  currentUser: user,
}))(AvatarDropdown);
