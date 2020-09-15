import {DownOutlined, LogoutOutlined, UserOutlined} from '@ant-design/icons';
import {HeaderViewProps} from '@ant-design/pro-layout/lib/Header';
import {Avatar, Button, Dropdown, Menu} from 'antd';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {i18n, TFunction} from 'i18next';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import './styles.less';

interface IProps extends HeaderViewProps {
  t: TFunction;
  i18n: i18n;
  screen: any;
}

const RightContent = (props) => {
  const {t} = useTranslation();
  const history = useHistory();
  const dispatch = useDispatch();

  props = useSelector<IProps>((state) => ({
    ...props,
    account: state.screen.accountReducer.data,
  }));

  const handleMenuClick = (evt: any) => {
    props.i18n.changeLanguage(evt.key);
  };

  const handleUserMenuClick = (evt: any) => {
    if (evt.key === 'logout') {
      localStorage.clear();
      firebase
        .auth()
        .signOut()
        .then(() => {
          history.push('/');
        });
    } else if (evt.key === 'settings') {
      history.push('/settings');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="vi">VI Tiếng Việt</Menu.Item>
      <Menu.Item key="en">EN English</Menu.Item>
    </Menu>
  );

  const menuHeaderDropdown = (
    <Menu className="menu" onClick={handleUserMenuClick}>
      <Menu.Item key="settings">
        <UserOutlined />
        {t('common:manager.menu.settingUser')}
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <LogoutOutlined />
        {t('common:manager.menu.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="right">
      <Dropdown overlayClassName="containerDropdown" overlay={menuHeaderDropdown}>
        <span className="action account">
          <Avatar
            size="small"
            className="avatar"
            src="https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png"
            alt="avatar"
          />
          <span className="name anticon">{props.account ? props.account.name : null}</span>
        </span>
      </Dropdown>
      <Dropdown overlay={menu}>
        <Button type="link" className="action">
          {props.i18n.language.toUpperCase()} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};

export default RightContent;
