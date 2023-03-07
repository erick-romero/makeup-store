import React from 'react';
import styles from '../styles/login.module.css';
import Head from 'next/head';
import Link from 'next/link';
import {
    Button,
    Checkbox,
    Form,
  Input,
  Layout,
  Result} from 'antd';
import Router, { useRouter } from 'next/router';
import axios from 'axios';
import { V4MAPPED } from 'dns';

const {
  Content,
} = Layout;

const onFinish = async (values: any) => {
    console.log('Success:', typeof values);
    var object = {
        contraseña:values["contraseña"],
        userId: values["userId"]
    }
    var response = await axios.postForm("/api/auth/login",object);
    console.log(response);
    //Router.push("/home")
  };
  
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  

function Login() {

    const router = useRouter()
  return (
    <React.Fragment>
      <Head>
        <title>login</title>
      </Head>

      <Content style={{ padding: 48 }}>
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
      label="Numero de Empleado"
      name="userId"
      rules={[{ required: true, message: 'Please input your username!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item
      label="Contraseña"
      name="contraseña"
      rules={[{ required: true, message: 'Please input your password!' }]}
    >
      <Input.Password />
    </Form.Item>


    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit" className={styles.blueColor}>
        Submit
      </Button>
    </Form.Item>
  </Form>
      </Content>
    </React.Fragment>
  );
};

export default Login;