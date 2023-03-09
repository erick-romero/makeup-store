import React, { useEffect, useState } from 'react';
import Head from 'next/head';
import { Button, Form, Input, InputNumber, Layout, Menu, Modal, Select, Table, message } from 'antd';
import { ShopOutlined, ShoppingCartOutlined, ScheduleOutlined, SettingOutlined, MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import electron from 'electron';

const { Header, Sider, Content } = Layout;
const ipcRenderer = electron.ipcRenderer;

  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'Nombre',
      key: 'Nombre',
    },
    {
      title: 'Descripcion',
      dataIndex: 'Descripcion',
      key: 'Descripcion',
    },
    {
      title: 'Costo',
      dataIndex: 'Costo',
      key: 'Costo',
    },
    {
      title: 'Precio',
      dataIndex: 'Precio',
      key: 'Precio',
    },
    {
      title: 'Inventario',
      dataIndex: 'Inventario',
      key: 'Inventario',
    },
  ];

  

function Configuracion() {

  const [data, setData] = useState(null)

  const onFinish = async (values: any) => { 
      var response = ipcRenderer.sendSync('addProduct', JSON.stringify(values));
      if(response){
        message.success("Producto creado Correctamente.");
        const response = ipcRenderer.sendSync('getAllProducts', '');
        setData(JSON.parse(response));
      } else {
        message.error("Hubo un error, intente de nuevo");
      }
      setIsModalOpen(false)
  };

  useEffect(() => {
    const response = ipcRenderer.sendSync('getAllProducts', '');
    setData(JSON.parse(response));
  },[])

    const [collapsed, setCollapsed] = useState(false);
    const router = useRouter()
    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo" />
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={['3']}
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

            <Button type="primary" onClick={showModal}>
                Agregar producto
            </Button>
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                
            >
            <Form.Item
            label="Nombre"
            name="nombre"
            rules={[{ required: true, message: 'Ingresa el nombre del producto' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Descripción"
            name="descripcion"
            rules={[{ required: false, message: 'Ingresa la descripción del producto' }]}
            >
            <Input />
            </Form.Item>
            <Form.Item
            label="Categoria"
            name="categoria"
            rules={[{ required: true, message: 'Ingresa la categoria del producto' }]}
            >
            <Select 
            options={[{value:1,label:"Labiales"}]}
            />
            </Form.Item>
            <Form.Item
            label="Marca"
            name="marca"
            rules={[{ required: true, message: 'Ingresa la marca del producto' }]}
            >
            <Select 
            options={[{value:1,label:"Mac"}]}
            />
            </Form.Item>
            <Form.Item
            label="Proveedor"
            name="proveedor"
            rules={[{ required: true, message: 'Ingresa el proveedor del producto' }]}
            >
            <Select 
            options={[{value:1,label:"Mac"}]}
            />
            </Form.Item>
            <Form.Item
            label="Costo"
            name="costo"
            rules={[{ required: true, message: 'Ingresa el costo del producto' }]}
            >
                <InputNumber addonAfter="$" />
            </Form.Item>
            <Form.Item
            label="Precio"
            name="precio"
            rules={[{ required: true, message: 'Ingresa el precio del producto' }]}
            >
                <InputNumber addonAfter="$" />
            </Form.Item>
            <Form.Item
            label="Inventario"
            name="inventario"
            rules={[{ required: true, message: 'Ingresa el inventario del producto' }]}
            >
                <InputNumber />
            </Form.Item>




    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" >
        Submit
      </Button>
    </Form.Item>
      </Form>
            </Modal>

            <Table dataSource={data} columns={columns} />;  

          </Content>
        </Layout>
      </Layout>
    );
};

export default Configuracion;


