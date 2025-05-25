import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, type TableProps } from 'antd';
import { useState } from 'react';
import UserCreateModal from './user.create.modal';
import UserUpdateModal from './user.update.modal';

export interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
  password: string;
  age: string
  gender: string;
  address: string;
}

const UsersTable = () => {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [data, setData] = useState<IUser[]>([{
    _id: '1',
    email: 'long@gmail.com',
    name: 'Long',
    role: 'Admin',
    password: '123456',
    age: '18',
    gender: 'Nam',
    address: 'Hanoi, Vietnam'
  }]);


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
    },
    {
      title: "Actions",
      key: 'actions',
      render: (_, record) => {
        return (
          <>
            <Button onClick={() => { setIsUpdateModalOpen(true) }}>Edit</Button>
          </>
        )
      }
    }
  ]


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
            onClick={() => { setIsCreateModalOpen(true); }}
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

      <UserCreateModal
        data={data}
        setData={setData}
        isCreateModalOpen={isCreateModalOpen}
        setIsCreateModalOpen={setIsCreateModalOpen}
      />

      <UserUpdateModal
        data={data}
        setData={setData}
        isUpdateModalOpen={isUpdateModalOpen}
        setIsUpdateModalOpen={setIsUpdateModalOpen}
      />
    </>
  )
}
export default UsersTable