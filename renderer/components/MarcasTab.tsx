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
    
  ];

function MarcasTab() {
    const [data, setData] = useState(null)
    
    function onFinishUser(values: any): void {
        var response = ipcRenderer.sendSync('addMarca', JSON.stringify(values));
      if(response){
        message.success("Usuario creado Correctamente.");
        const response = ipcRenderer.sendSync('getAllMarcas', '');
        setData(JSON.parse(response));
      } else {
        message.error("Hubo un error, intente de nuevo");
      }
      setIsModalOpen(false)
        
      }
      useEffect(() => {
        const response = ipcRenderer.sendSync('getAllMarcas', '');
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
                Agregar Nueva Marca
    </Button>
    <Modal footer={null} title="Nueva Marca" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
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
              rules={[{ required: true, message: 'Ingresa el nombre de la nueva marca' }]}
          >
              <Input />
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

export default MarcasTab