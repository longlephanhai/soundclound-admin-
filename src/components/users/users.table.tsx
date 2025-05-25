import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, type TableProps, Modal } from 'antd';
import { useState } from 'react';

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

const UsersTable = () => {
  const data: IUser[] = [
    {
      _id: '1',
      email: 'long@gmail.com',
      name: 'Long',
      role: 'Admin',
    }
  ]

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
        title="Basic Modal"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  )
}
export default UsersTable