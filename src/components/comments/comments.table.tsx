import { Button, notification, Popconfirm, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export interface IComments {
  _id: string;
  content: string;
  moment: number;
  user: {
    _id: string;
    email: string;
    name: string;
    role: string;
    type: string
  },
  track: {
    _id: string;
    title: string;
    description: string;
    trackUrl: string
  },
  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}
const CommentsTable = () => {
  const [listComments, setListComments] = useState([]);
  const acces_token = localStorage.getItem('access_token') as string;

  const [meta, setMeta] = useState({
    current: 1,
    pageSize: 10,
    pages: 0,
    total: 0,
  })

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const res = await fetch(
      `http://localhost:8000/api/v1/comments?current=${meta.current}&pageSize=${meta.pageSize}`,
      {
        headers: {
          'Authorization': `Bearer ${acces_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const d = await res.json();
    if (!d.data) {
      notification.error({
        message: JSON.stringify(d.message)
      })
    }
    setListComments(d.data.result);
    setMeta({
      current: d.data.meta.current,
      pageSize: d.data.meta.pageSize,
      pages: d.data.meta.pages,
      total: d.data.meta.total,
    })
  }

  const confirm = async (comment: IComments) => {
    const res = await fetch(
      `http://localhost:8000/api/v1/comments/${comment._id}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${acces_token}`,
          'Content-Type': 'application/json'
        }
      }
    )
    const d = await res.json();
    if (d.data) {
      notification.success({
        message: 'Delete comment successfully'
      });
      await getData();
    } else {
      notification.error({
        message: JSON.stringify(d.message)
      })
    }
  }

  const columns: ColumnsType<IComments> = [
    {
      dataIndex: '_id',
      title: "STT",
      render: (_, __, index) => {
        return (
          <>{((meta.current - 1) * meta.pageSize) + index + 1}</>
        )
      }
    },
    {
      title: 'Content',
      dataIndex: 'content'
    },
    {
      title: 'Track',
      dataIndex: ['track', 'title'],
    },
    {
      title: 'User',
      dataIndex: ['user', 'email'],
    },
    {
      title: 'Actions',
      render: (value, record) => {
        return (
          <div>
            <Popconfirm
              title="Delete the comments"
              description="Are you sure to delete this comments?"
              onConfirm={() => confirm(record)}
              okText="Yes"
              cancelText="No"
            >
              <Button style={{
                marginLeft: 20
              }} danger>
                Delete
              </Button>
            </Popconfirm>
          </div>
        )
      }
    }
  ]
  return (
    <Table
      columns={columns}
      dataSource={listComments}
      rowKey="_id"
      pagination={{
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
      }}
    />
  )
}

export default CommentsTable;