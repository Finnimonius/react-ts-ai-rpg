import { Layout } from 'antd'
import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import { Outlet } from 'react-router-dom';
import './AppLayout.css'

export default function AppLayout() {
  return (
    <Layout className='app-layout'>
      <AppHeader />
      <Layout.Content>
        <Outlet />
      </Layout.Content>
      <AppFooter />
    </Layout>
  )
}