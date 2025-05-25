import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, type TableProps, Modal, Input } from 'antd';
import { useState } from 'react';

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [data, setData] = useState<IUser[]>([{
    _id: '1',
    email: 'long@gmail.com',
    name: 'Long',
    role: 'Admin',
  }]);

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [role, setRole] = useState<string>('');

  const columns: TableProps<IUser>['columns'] = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    }
  ]


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setData([...data, {
      _id: Math.random().toString(36).substring(2, 15), // Generate a random ID
      email,
      name,
      role,

    }])
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        style={
          {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }
        }
      >
        <h2>Table Users</h2>
        <div>
          <Button
            icon={<PlusOutlined />}
            type='primary'
            onClick={showModal}
          >
            Add new
          </Button>
        </div>
      </div>

      <Table<IUser>
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />

      <Modal
        title="Add new user"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        okText="Add"
        cancelText="Cancel"
      >
        <div>
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
        </div>
      </Modal>
    </>
  )
}
export default UsersTable