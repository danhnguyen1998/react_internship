import {LockTwoTone, MailOutlined, PhoneOutlined, TrophyOutlined, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input, notification} from 'antd';
import {Rule, RuleObject} from 'antd/lib/form';
import {NamePath, Store, StoreValue} from 'antd/lib/form/interface';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link, useHistory} from 'react-router-dom';
import {register} from './services';
import './style.less';
export default function RegisterComponent() {
  const {t} = useTranslation();
  const history = useHistory();

  const openNotificationWithIcon = (type, mess) => {
    notification[type]({
      message: 'Notification',
      description: mess,
    });
  };

  const onFinish = async (values: Store) => {
    console.log('Success:', values);
    try {
      const result = await register();
      if (result) history.push('/login');
      openNotificationWithIcon('success', t('account:register.toast.success'));
    } catch (error) {
      openNotificationWithIcon('error', t('account:register.toast.error'));
    }
  };

  const comparePassword = (getFieldValue: (name: NamePath) => any) => (_rule: RuleObject, value: StoreValue) => {
    if (!value || getFieldValue('password') === value) {
      return Promise.resolve();
    }
    return Promise.reject(t('account:register.message.comparePassword'));
  };

  const validation: {[key: string]: Rule[]} = {
    fullname: [{required: true, message: t('account:register.message.fullname')}],
    username: [{required: true, message: t('account:register.message.username')}],
    password: [{required: true, message: t('account:register.message.password')}],
    rePassword: [
      {required: true, message: t('account:register.message.rePassword')},
      ({getFieldValue}) => ({validator: comparePassword(getFieldValue)}),
    ],
    email: [{required: true, message: t('account:register.message.email')}],
    phone: [{required: true, message: t('account:register.message.phone')}],
    club: [{required: true, message: t('account:register.message.club')}],
  };

  return (
    <>
      <div className="container">
        <div className="content">
          <div className="top">
            <div className="header">
              <Link to="/">
                <img alt="logo" className="logo" src={process.env.PUBLIC_URL + '/logo.png'} />
                <span className="title">{t('account:register.title')}</span>
              </Link>
            </div>
            <div className="desc">{t('account:register.subtitle')}</div>
          </div>
          <div className="main">
            <div className="login">
              <Form onFinish={onFinish}>
                <Form.Item name="fullname" rules={validation.fullname}>
                  <Input
                    size="large"
                    prefix={<UserOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.fullName')}
                  />
                </Form.Item>
                <Form.Item name="username" rules={validation.username}>
                  <Input
                    size="large"
                    prefix={<UserOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.userName')}
                  />
                </Form.Item>
                <Form.Item name="password" rules={validation.password}>
                  <Input.Password
                    size="large"
                    prefix={<LockTwoTone style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.password')}
                  />
                </Form.Item>
                <Form.Item name="rePassword" dependencies={['password']} rules={validation.rePassword}>
                  <Input.Password
                    size="large"
                    prefix={<LockTwoTone style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.rePassword')}
                  />
                </Form.Item>
                <Form.Item name="email" rules={validation.email}>
                  <Input
                    size="large"
                    prefix={<MailOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.email')}
                  />
                </Form.Item>
                <Form.Item name="phone" rules={validation.phone}>
                  <Input
                    size="large"
                    prefix={<PhoneOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.phone')}
                  />
                </Form.Item>
                <Form.Item name="club" rules={validation.club}>
                  <Input
                    size="large"
                    prefix={<TrophyOutlined style={{color: '#1890ff'}} className="prefixIcon" />}
                    placeholder={t('account:register.club')}
                  />
                </Form.Item>
                <Form.Item>
                  <a href="/login" style={{float: 'left'}}>
                    Đăng nhập
                  </a>
                  <a href="#" style={{float: 'right'}}>
                    Quên mật khẩu?
                  </a>
                </Form.Item>
                <Form.Item>
                  <Button size="large" className="submit" type="primary" htmlType="submit">
                    {t('account:register.signup')}
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
