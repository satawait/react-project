import './App.css'
import { BrowserRouter, Routes, Route, Link, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import AuthComponents from './components/AuthComponent'
import { history } from "@/utils"
// 导入必要组件
import { lazy, Suspense } from 'react'
// 按需导入路由组件
const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {
  return (
    <HistoryRouter history={history}>
      <Suspense
        fallback={
          <div
            style={{
              textAlign: 'center',
              marginTop: 200
            }}
          >
            loading...
          </div>
        }
      >
        <div className="App font-red">
          <Routes>
            <Route path="login" element={<Login />}></Route>
            <Route path="/" element={
              <AuthComponents>
                <Layout />
              </AuthComponents>
            }>
              <Route index element={<Home />}></Route>
              <Route path="article" element={<Article />}></Route>
              <Route path="publish" element={<Publish />}></Route>
            </Route>
          </Routes>
        </div>
      </Suspense>
    </HistoryRouter>
  )
}

export default App
