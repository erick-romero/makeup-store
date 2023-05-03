import { Button, Form, Input, Modal, Select, Table, message } from 'antd'
import electron from 'electron';

import React, { useEffect, useState } from 'react'

const ipcRenderer = electron.ipcRenderer;
const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nombre',
      dataIndex: 'Nombre',
      key: 'nombre',
    },
    {
      title: 'Descripción',
      dataIndex: 'Descripcion',
      key: 'descripcion',
    },
    
  ];

function CategoryTab() {
    const [data, setData] = useState(null)
    
    function onFinishUser(values: any): void {
        var response = ipcRenderer.sendSync('addUser', JSON.stringify(values));
      if(response){
        message.success("Usuario creado Correctamente.");
        const response = ipcRenderer.sendSync('getAllCategorias', '');
        setData(JSON.parse(response));
      } else {
        message.error("Hubo un error, intente de nuevo");
      }
      setIsModalOpen(false)
        
      }
      useEffect(() => {
        const response = ipcRenderer.sendSync('getAllCategorias', '');
        setData(JSON.parse(response));
      },[])
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
    
    <>
    <Button type="primary" onClick={showModal}>
                Agregar Nueva Categoria
    </Button>
    <Modal footer={null} title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
    <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinishUser}

          autoComplete="off"

      >
          <Form.Item
              label="Nombre"
              name="nombre"
              rules={[{ required: true, message: 'Ingresa el nombre del nuevo usuario' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Apellido"
              name="apellido"
              rules={[{ required: true, message: 'Ingresa el apellido del nuevo usuario' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Correo Electronico"
              name="correo"
              rules={[{ required: true, message: 'Ingresa el correo electronico del nuevo usuario' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Telefono"
              name="telefono"
              rules={[{ required: true, message: 'Ingresa el telefono del nuevo usuario' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Contraseña"
              name="contrasena"
              rules={[{ required: true, message: 'Ingresa la contraseña del nuevo usuario' }]}
          >
              <Input />
          </Form.Item>
          <Form.Item
              label="Tipo de Usuario"
              name="tipoUsuario"
              rules={[{ required: true, message: 'Ingresa la contraseña del nuevo usuario' }]}
          >
              <Select
                  options={[{ value: 2, label: "Empleado" }, { value: 1, label: "Administrador" }]} />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                  Submit
              </Button>
          </Form.Item>
      </Form>
      </Modal>
      <Table dataSource={data} columns={columns} />
      </>
  )
}

export default CategoryTab