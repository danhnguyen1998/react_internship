import ProLayout, {MenuDataItem} from '@ant-design/pro-layout';
import {HeaderViewProps} from '@ant-design/pro-layout/lib/Header';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {routeCustomer} from 'routes';
import RightContent from './RightContent';

const CustomerLayout = (props: any) => {
  const {t, i18n} = useTranslation();

  const logo = () => <img src={`${process.env.PUBLIC_URL}/logo192.png`} />;

  const menuItemRender = (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => (
    <Link to={menuItemProps.path || ''}>{defaultDom}</Link>
  );

  const rightContentRender = (headerProps: HeaderViewProps) => <RightContent {...headerProps} t={t} i18n={i18n} />;

  return (
    <>
      <ProLayout
        title="Finance"
        layout="top"
        contentWidth="Fixed"
        navTheme="light"
        fixedHeader={true}
        logo={logo}
        route={routeCustomer(t)}
        menuItemRender={menuItemRender}
        rightContentRender={rightContentRender}>
        {props.children}
      </ProLayout>
    </>
  );
};

export default CustomerLayout;
