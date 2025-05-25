import { Input, Modal } from "antd";
import { useState } from "react";
import type { IUser } from "./users.table";
interface IProps {
  data: IUser[];
  setData: (data: IUser[]) => void;
  isUpdateModalOpen: boolean
  setIsUpdateModalOpen: (v: boolean) => void
}
const UserUpdateModal = (props: IProps) => {
  const { data, setData, isUpdateModalOpen, setIsUpdateModalOpen } = props;

  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [gender, setGender] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [role, setRole] = useState<string>('');

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
    setIsUpdateModalOpen(false);
  };

  return (
    <Modal
      title="Update a user"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isUpdateModalOpen}
      onOk={handleOk}
      onCancel={() => { setIsUpdateModalOpen(false); }}
      maskClosable={false}
      okText="Update"
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
  )
}
export default UserUpdateModal