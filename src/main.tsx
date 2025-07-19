import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import {
  createBrowserRouter,
  Link,
  Outlet,
  RouterProvider,
} from "react-router-dom";
import UsersPage from './pages/users.page.tsx';
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import './App.scss'
import TracksPage from './pages/tracks.page.tsx';
import CommentsPage from './pages/comments.page.tsx';

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  {
    label: <Link to={'/'}>Home</Link>,
    key: 'home',
    icon: <HomeOutlined />,
  },
  {
    label: <Link to={'users'}>Manage Users</Link>,
    key: 'users',
    icon: <UserOutlined />,
  },
];

const Header = () => {
  const [current, setCurrent] = useState('home');

  const onClick: MenuProps['onClick'] = (e) => {
    console.log('click ', e);
    setCurrent(e.key);
  };

  return (
    <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} />
  );
};

const LayoutAdmin = () => {
  return (
    <div>
      <Header />
      <Outlet />
      {/* <footer>Footer</footer> */}
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'users',
        element: <UsersPage />,
      },
      {
        path: 'tracks',
        element: <TracksPage />,
      },
      {
        path: "comments",
        element: <CommentsPage />
      }
    ]
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
