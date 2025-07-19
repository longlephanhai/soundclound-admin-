import { Button, message, notification, Popconfirm, Table, type PopconfirmProps } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useState } from "react";

export interface ITrack {
    _id: string;
    title: string;
    description: string;
    category: string;
    imgUrl: string;
    trackUrl: string;
    countLike: number;
    countPlay: number
}
const TracksTable = () => {
    const [listUsers, setListUsers] = useState<ITrack[]>([]);
    const accessToken = localStorage.getItem('access_token') as string;
    const [meta, setData] = useState({
        current: 1,
        pageSize: 5,
        pages: 0,
        total: 0
    })

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        const res = await fetch(`http://localhost:8080/api/v1/tracks?current=${meta.current}&pageSize=${meta.pageSize}`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        })
        const d = await res.json();
        if (!d.data) {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
        setListUsers(d.data);
        setData({
            current: d.data.current,
            pageSize: d.data.pageSize,
            pages: d.data.pages,
            total: d.data.total
        });
    }

    const confirm = async (tracks: ITrack) => {
        const res = await fetch(`http://localhost:8080/api/v1/tracks/${tracks._id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": `Bearer ${accessToken}`,
                "Content-Type": "application/json"
            },
        })
        const d = await res.json();
        if (d.data) {
            notification.success({
                message: "Delete track successfully"
            })
            await getData();
        } else {
            notification.error({
                message: JSON.stringify(d.message)
            })
        }
    };

    const columns: ColumnsType<ITrack> = [
        {
            dataIndex: '_id',
            title: "STT",
            render: (value, record, index) => {
                return (
                    <>{((meta.current - 1) * meta.pageSize) + index + 1}</>
                )
            }
        },
        {
            dataIndex: "title",
            title: "Title",
        },
        {
            dataIndex: "description",
            title: "Description",
        },
        {
            dataIndex: "category",
            title: "Category",
        },
        {
            dataIndex: "trackUrl",
            title: "Track url",
        },
        {
            title: "Uploader",
            dataIndex: ["uploader", "name"],
        },
        {
            title: "Action",
            render: (value, record) => {
                return (
                    <div>
                        <Popconfirm
                            title="Delete the tracks"
                            description="Are you sure to delete this tracks?"
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

    const handleOnChange = async (page: Number, pageSize?: number) => {
        const res = await fetch(
            `http://localhost:8080/api/v1/tracks?current=${page}&pageSize=${pageSize}`,
            {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
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
        setListUsers(d.data.results);
        setData({
            current: d.data.current,
            pageSize: d.data.pageSize,
            pages: d.data.pages,
            total: d.data.total
        });
    }
    return (
        <Table
            columns={columns}
            dataSource={listUsers}
            rowKey="_id"
            pagination={{
                current: meta.current,
                pageSize: meta.pageSize,
                total: meta.total,
                showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                onChange: (page: number, pageSize?: number) => {
                    handleOnChange(page, pageSize);
                }
            }}
        />
    )
}

export default TracksTable