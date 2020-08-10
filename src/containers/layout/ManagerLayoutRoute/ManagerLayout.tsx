import ProLayout, {MenuDataItem, PageHeaderWrapper} from '@ant-design/pro-layout';
import {HeaderViewProps} from '@ant-design/pro-layout/lib/Header';
import {Route} from 'antd/lib/breadcrumb/Breadcrumb';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {Link} from 'react-router-dom';
import {routeManager} from 'routes';
import RightContent from './RightContent';

const CustomerLayout = (props: any) => {
  const {t, i18n} = useTranslation();

  const logo = () => <img src={`${process.env.PUBLIC_URL}/logo.png`} />;

  const menuItemRender = (menuItemProps: MenuDataItem, defaultDom: React.ReactNode) => (
    <Link to={menuItemProps.path || ''}>{defaultDom}</Link>
  );

  const rightContentRender = (headerProps: HeaderViewProps) => <RightContent {...headerProps} t={t} i18n={i18n} />;

  const itemRender = (route: Route, _params: any, routes: Route[], paths: string[]) =>
    routes.indexOf(route) === 0 ? (
      <Link to={`/${paths[0]}`}>{route.breadcrumbName}</Link>
    ) : (
      <span>{route.breadcrumbName}</span>
    );

  return (
    <>
      <ProLayout
        title="DanceSport"
        contentWidth="Fixed"
        fixedHeader={true}
        logo={logo}
        route={routeManager(t)}
        menuItemRender={menuItemRender}
        rightContentRender={rightContentRender}
        itemRender={itemRender}>
        <PageHeaderWrapper>{props.children}</PageHeaderWrapper>
      </ProLayout>
    </>
  );
};

export default CustomerLayout;
