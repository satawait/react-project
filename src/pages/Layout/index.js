import { Layout, Menu, Popconfirm } from 'antd'
import {
  HomeOutlined,
  DiffOutlined,
  EditOutlined,
  LogoutOutlined
} from '@ant-design/icons'
import './index.scss'
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useMemo } from 'react'
import useStore from 'src/store'
import { observer } from 'mobx-react-lite'

const { Header, Sider } = Layout

const MyLayout = () => {
  const { pathname } = useLocation()
  const currentKey = useMemo(() => {
    return pathname
  }, [pathname])
  const { userStore, loginStore } = useStore()
  const navigate = useNavigate()
  const onConfirm = () => {
    loginStore.logout()
    navigate('/')
  }
  useEffect(() => {
    userStore.setUserInfo()
  }, [userStore])
  const items = [
    {
      label: <Link to={'/'}>数据概览</Link>,
      key: '/',
      icon: <HomeOutlined />
    }, // 菜单项务必填写 key
    {
      label: <Link to={'/article'}>内容管理</Link>,
      key: '/article',
      icon: <DiffOutlined />
    },
    {
      label: <Link to={'/publish'}>发布文章</Link>,
      key: '/publish',
      icon: <EditOutlined />
    }
  ]
  return (
    <Layout>
      <Header className="header">
        <div className="logo" />
        <div className="user-info">
          <span className="user-name">{userStore.userInfo.name}</span>
          <span className="user-logout">
            <Popconfirm title="是否确认退出？" onConfirm={onConfirm} okText="退出" cancelText="取消">
              <LogoutOutlined /> 退出
            </Popconfirm>
          </span>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className="site-layout-background">
          <Menu
            items={items}
            mode="inline"
            theme="dark"
            defaultSelectedKeys={[currentKey]}
            style={{ height: '100%', borderRight: 0 }}
          >
          </Menu>
        </Sider>
        <Layout className="layout-content" style={{ padding: 20 }}>
          {/* 二级路由 */}
          <Outlet />
        </Layout>
      </Layout>
    </Layout>
  )
}

export default observer(MyLayout)