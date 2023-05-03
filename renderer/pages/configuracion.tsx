import React, { useState } from 'react';
import Head from 'next/head';
import { Button, Form, Input, InputNumber, Layout, Menu, Select, Table, Tabs, TabsProps } from 'antd';
import { ShopOutlined, ShoppingCartOutlined, ScheduleOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import UsersTab from '../components/UsersTab';
import ProvidersTab from '../components/ProvidersTab';
import CategoryTab from '../components/CategoryTab';
import MarcasTab from '../components/MarcasTab';


const onChange = (key: string) => {
  
};

const items: TabsProps['items'] = [
  {
    key: '1',
    label: `Usuarios`,
    children: (
      <UsersTab></UsersTab>
    ),
  },
  {
    key: '2',
    label: `Proveedores`,
    children: (
      <ProvidersTab></ProvidersTab>
    ),
  },
  {
    key: '3',
    label: `Categorias`,
    children: (
      <CategoryTab></CategoryTab>
    ),
  },
  {
    key: '4',
    label: `Marcas`,
    children: (
      <MarcasTab></MarcasTab>
    ),
  },
];
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
            defaultSelectedKeys={['4']}
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
            <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          </Content>
        </Layout>
      </Layout>
    );
};

export default Configuracion;

