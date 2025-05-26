import type { FormProps } from 'antd';
import { Button,  Form, Input, InputNumber, Modal, Select } from 'antd';
import { useState } from "react";
import type { IUser } from "./users.table";
interface IProps {
  data: IUser[];
  setData: (data: IUser[]) => void;
  isCreateModalOpen: boolean
  setIsCreateModalOpen: (v: boolean) => void;
}

type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};

const UserCreateModal = (props: IProps) => {
  const { data, setData, isCreateModalOpen, setIsCreateModalOpen } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const { Option } = Select;

  const handleOk = () => {
    setData([...data, {
      _id: Math.random().toString(36).substring(2, 15),
      email,
      name,
      role,
      password,
      age,
      gender,
      address
    }])
    setName('');
    setEmail('');
    setPassword('');
    setAge('');
    setGender('');
    setAddress('');
    setRole('');
    setIsCreateModalOpen(false);
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Modal
      title="Add new user"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isCreateModalOpen}
      onOk={handleOk}
      onCancel={() => { setIsCreateModalOpen(false); }}
      maskClosable={false}
      okText="Add"
      cancelText="Cancel"
      footer={null}
    >
      <Form
        name="basic"
        onFinish={onFinish}
        autoComplete="off"
        layout="vertical"

      >
        <Form.Item
          style={{
            marginBottom: '5px'
          }}
          label="Name"
          name="name"
          rules={[{ required: true, message: 'Please input your username!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: '5px'
          }}
          label="Email"
          name="email"
          rules={[{ required: true, message: 'Please input your email!' }]}
        >
          <Input type='email' />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
          style={{
            marginBottom: '5px'
          }}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: '5px'
          }}
          label="Age"
          name="age"
          rules={[{ required: true, message: 'Please input your age!' }]}
        >
          <InputNumber min={1} max={100} style={{ width: '100%' }} />
        </Form.Item>

        <Form.Item
          style={{
            marginBottom: '5px'
          }}
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Please input your address!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item style={{
          marginBottom: '5px'
        }} name="gender" label="Gender" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="male">male</Option>
            <Option value="female">female</Option>
            <Option value="other">other</Option>
          </Select>
        </Form.Item>

        <Form.Item style={{
          marginBottom: '5px'
        }} name="role" label="Role" rules={[{ required: true }]}>
          <Select
            placeholder="Select a option and change input text above"
            // onChange={onGenderChange}
            allowClear
          >
            <Option value="admin">Admin</Option>
            <Option value="user">User</Option>
          </Select>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {/* <div>
        <label htmlFor="">Name:</label>
        <Input
          value={name}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Email:</label>
        <Input
          value={email}
          onChange={(e) => { setEmail(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Password:</label>
        <Input
          type="password"
          value={password}
          onChange={(e) => { setPassword(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Age:</label>
        <Input
          value={age}
          onChange={(e) => { setAge(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Gender:</label>
        <Input
          value={gender}
          onChange={(e) => { setGender(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Address</label>
        <Input
          value={address}
          onChange={(e) => { setAddress(e.target.value) }}
        />
      </div>
      <div>
        <label htmlFor="">Role</label>
        <Input
          value={role}
          onChange={(e) => { setRole(e.target.value) }}
        />
      </div> */}
    </Modal>
  )
}
export default UserCreateModal