import { Button, Form, Input, InputNumber, Modal, Select, type FormProps } from "antd";
import { useEffect, useState } from "react";
import type { IUser } from "./users.table";
interface IProps {
  data: IUser[];
  setData: (data: IUser[]) => void;
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: (v: boolean) => void
  dataUpdate: IUser | null;
  setDataUpdate: (data: IUser | null) => void;
}
type FieldType = {
  username?: string;
  password?: string;
  remember?: string;
};
const UserUpdateModal = (props: IProps) => {
  
  const { data, setData, isUpdateModalOpen, setIsUpdateModalOpen, dataUpdate, setDataUpdate } = props;
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [role, setRole] = useState<string>('');

  useEffect(() => {
    if (dataUpdate) {
      setName(dataUpdate.name);
      setEmail(dataUpdate.email);
      setPassword(dataUpdate.password);
      setAge(dataUpdate.age);
      setGender(dataUpdate.gender);
      setAddress(dataUpdate.address);
      setRole(dataUpdate.role);
    }
  }, [dataUpdate])

  const { Option } = Select;

  const handleOk = () => {
    // TODO: Call API to update user
  };

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    console.log('Success:', values);
  };

  return (
    <Modal
      title="Update a user"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => {
        setIsUpdateModalOpen(false)
        setDataUpdate(null);
      }}
      maskClosable={false}
      okText="Update"
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
    </Modal>
  )
}
export default UserUpdateModal