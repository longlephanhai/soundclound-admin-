import { Table, type TableProps } from 'antd';

interface IUser {
  _id: string;
  email: string;
  name: string;
  role: string;
}

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
const UsersTable = () => {
  return (
    <>
      <h2>Table Users</h2>

      <Table<IUser>
        columns={columns}
        dataSource={data}
        rowKey="_id"
      />
    </>
  )
}
export default UsersTable