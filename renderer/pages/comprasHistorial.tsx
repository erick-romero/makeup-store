import React, { useEffect, useState } from 'react';
import { ShopOutlined, ShoppingCartOutlined, ScheduleOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

import electron from 'electron';
import { Collapse, Layout, List, Menu } from 'antd';
import CollapsePanel from 'antd/lib/collapse/CollapsePanel';


const ipcRenderer = electron.ipcRenderer;
const { Header, Sider, Content } = Layout;
 interface car {
  product:any,
  cantidad:number
 }


function Configuracion() {
  
    const [collapsed, setCollapsed] = useState(false);
    const [data, setData] = useState([]);

    const router = useRouter()
    useEffect(() => {
        const response = ipcRenderer.sendSync('getAllCompras', '');
        setData(JSON.parse(response));
        console.log(JSON.parse(response));
        
    }, [])
    
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
            
            <h2>Historial de compras</h2>
            <List
            bordered
            dataSource={data}
            renderItem={(item) => { 
                return <>
                    <Collapse >
                        <CollapsePanel key={''} header={`Total: $ ${item.Costo_Total} --- Fecha: ${new Date(item.Fecha_Compra).toLocaleString()}`}>
                           
                           <h4>Compra #{`${item.id} `}hecha por: {`${item.Usuario.nombre} ${item.Usuario.apellido}`}</h4>
                            <ol>
                            {item.Detalle_Compra.map(x => {
                                return <><li> {`${x.Producto.Descripcion} Precio Unitario: $${x.Producto.Costo}`} </li> <ul><li> {`cantidad: ${x.Cantidad} Precio Total: $${x.Producto.Costo * x.Cantidad}`} </li></ul></>
                            })}
                            </ol>
                        </CollapsePanel>
                    </Collapse> 
                
                </>; }}
            /> 
          </Content>
        </Layout>
      </Layout>
    );
};

export default Configuracion;