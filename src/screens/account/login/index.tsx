import {LockTwoTone, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {Rule} from 'antd/lib/form';
import {Store} from 'antd/lib/form/interface';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from 'react-router-dom';
import notification from 'utils/notification';
import {login} from './services';
import './style.less';

export default function LoginComponent(props) {
  const history = useHistory();
  const {t} = useTranslation();

  const onFinish = async (values: Store) => {
    console.log('Success:', values);
    try {
      const result = await login();
      if (result) history.push('/manager');
      notification.success(t('account:login.toast.success'));
    } catch (error) {
      notification.error(t('account:login.toast.error'));
    }
  };

  const validation: {[key: string]: Rule[]} = {
    username: [{required: true, message: t('account:login.message.username')}],
    password: [{required: true, message: t('account:login.message.password')}],
  };

  return (
    <div className="container">
      <div className="content">
        <div className="top">
          <div className="header">
            <Link to="/">
              <img alt="logo" className="logo" src={process.env.PUBLIC_URL + '/logo.png'} />
              <span className="title">{t('account:login.title')}</span>
            </Link>
          </div>
          <div className="desc">{t('account:login.subtitle')}</div>
        </div>
        <div className="main">
          <div className="login">
            <Form onFinish={onFinish}>
              <Form.Item name="username" rules={validation.username}>
                <Input
                  prefix={<UserOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                  placeholder={t('account:login.userName')}
                  autoFocus={true}
                />
              </Form.Item>
              <Form.Item name="password" rules={validation.password}>
                <Input.Password
                  prefix={<LockTwoTone style={{color: '#1890ff'}} className="prefixIcon" />}
                  placeholder={t('account:login.password')}
                />
              </Form.Item>
              <Form.Item>
                <a href="/register" style={{float: 'left'}}>
                  Đăng ký tài khoản
                </a>
                <a href="#" style={{float: 'right'}}>
                  Quên mật khẩu?
                </a>
              </Form.Item>
              <Form.Item>
                <Button size="large" className="submit" type="primary" htmlType="submit">
                  {t('account:login.signin')}
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
