import React, { useState } from 'react';
import Head from 'next/head';
import { Layout, Menu } from 'antd';
import { ShopOutlined, ShoppingCartOutlined, ScheduleOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';



const { Header, Sider, Content } = Layout;

function Configuracion() {

    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['2']}
            items={[
              {
                key: '1',
                icon: <ShopOutlined />,
                label: 'Ventas',
                onClick : () => {
                  router.push("/ventas")
                }
              },
              {
                key: '2',
                icon: <ShoppingCartOutlined />,
                label: 'Compras',
                onClick : () => {
                  router.push("/compras")
                }
              },
              {
                key: '3',
                icon: <ScheduleOutlined />,
                label: 'Inventario',
                onClick : () => {
                  router.push("/inventario")
                }
              },
              {
                key: '4',
                icon: <SettingOutlined />,
                label: 'Configuracion',
                onClick : () => {
                  router.push("/configuracion")
                }
              },
            ]}
          />
        </Sider>
        <Layout className="site-layout">
          <Header style={{ padding: 0}}>
            {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: () => setCollapsed(!collapsed),
            })}
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              height: "100vh"
            }}
          >
            Compras
          </Content>
        </Layout>
      </Layout>
    );
};

export default Configuracion;