import { useEffect, useState } from "react"
import UsersTable from "../components/users/users.table"
import '../styles/user.css'
interface IUser {
  email: string;
  name: string;
  role: string;
}
const UsersPage = () => {
  // const [listUsers, setListUsers] = useState<IUser[]>([])
  // useEffect(() => {
  //   getData()
  // }, [])
  // const getData = async () => {
  //   const res = await fetch('http://localhost:8000/api/v1/auth/login', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: "long@gmail.com",
  //       password: "12345678"
  //     })
  //   })
  //   const dataRes = await res.json()
  //   setListUsers(dataRes)
  // }
  return (
    <>
      <UsersTable />
    </>
  )
}
export default UsersPage