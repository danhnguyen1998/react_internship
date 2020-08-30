import {FacebookOutlined, GooglePlusOutlined, LockTwoTone, UserOutlined} from '@ant-design/icons';
import {Button, Form, Input} from 'antd';
import {Rule} from 'antd/lib/form';
import {Store} from 'antd/lib/form/interface';
import system from 'constant/system';
import {setAccountAction} from 'containers/redux/account/actions';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory} from 'react-router-dom';
import firebase from 'utils/firebaseConfig';
import notification from 'utils/notification';
import {login} from './services';
import './style.less';

export default function LoginComponent(props) {
  const history = useHistory();
  const {t} = useTranslation();
  const dispatch = useDispatch();
  props = useSelector<any>((state) => ({
    ...props,
    setAccountAction: (data) => dispatch(setAccountAction(data)),
  }));

  const onFinish = async (values: Store) => {
    try {
      const result = await login();
      if (result) history.push('/manager');
      notification.success(t('account:login.toast.success'));
    } catch (error) {
      notification.error(t('account:login.toast.error'));
    }
  };

  const onGoogleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (result) {
          const credential = result.credential as firebase.auth.OAuthCredential;
          localStorage.setItem(system.ACCESS_TOKEN, JSON.stringify(credential.accessToken));

          const user = result.additionalUserInfo?.profile;
          console.log(user, 'result');
          props.setAccountAction(user);
          history.push('/manager');
          notification.success(t('account:login.toast.success'));
        }
      })
      .catch((error) => {
        notification.error(t('account:login.toast.error'));
      });
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
              <img alt="logo" className="logo" src={process.env.PUBLIC_URL + '/logo192.png'} />
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
            <Button
              danger={true}
              icon={<GooglePlusOutlined />}
              size="large"
              className="submit"
              type="primary"
              htmlType="submit"
              onClick={onGoogleSignIn}>
              {t('account:login.signinGoogle')}
            </Button>
            <br />
            <p />
            <Button
              icon={<FacebookOutlined />}
              size="large"
              className="submit"
              type="primary"
              htmlType="submit"
              onClick={onGoogleSignIn}>
              {t('account:login.signinFacebook')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
