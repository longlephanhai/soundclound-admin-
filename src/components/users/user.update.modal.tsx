import { Input, Modal } from "antd";
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

  const handleOk = () => {
    // TODO: Call API to update user
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
    >
      <div style={{ display: 'none' }}>
        <label htmlFor="">ID:</label>
        <Input
          value={dataUpdate?._id}
          onChange={(e) => { setName(e.target.value) }}
        />
      </div>
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
          type="password"
          disabled
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