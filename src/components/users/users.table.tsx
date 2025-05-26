import { PlusOutlined } from '@ant-design/icons';
import { Table, Button, type TableProps, Popconfirm, type PopconfirmProps, message } from 'antd';
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
interface IPageMeta {
  current: number,
  pageSize: number,
  pages: number,
  total: number,
}
const UsersTable = () => {

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const [dataUpdate, setDataUpdate] = useState<IUser | null>(null);

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

  const [meta, setMeta] = useState<IPageMeta>({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  })

  const confirm: PopconfirmProps['onConfirm'] = (e) => {
    console.log(e);
    message.success('Click on Yes');
  };

  const cancel: PopconfirmProps['onCancel'] = (e) => {
    console.log(e);
    message.error('Click on No');
  };


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
            <Button type='primary' onClick={() => {
              setDataUpdate(record);
              setIsUpdateModalOpen(true)
            }}>Edit
            </Button>
            <Popconfirm
              title="Delete this user?"
              description="Are you sure to delete this user?"
              onConfirm={confirm}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{ marginLeft: '20px' }} danger>Delete</Button>
            </Popconfirm>
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
        pagination={
          {
            current: meta.current,
            pageSize: meta.pageSize,
            total: meta.total,
            showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
            onChange: (page: number, pageSize: number) => {
              setMeta({
                ...meta,
                current: page,
                pageSize: pageSize,
              });
            },
            showSizeChanger: true,
          }
        }
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
        dataUpdate={dataUpdate}
        setDataUpdate={setDataUpdate}
      />
    </>
  )
}
export default UsersTable