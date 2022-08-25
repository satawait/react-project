import './App.css'
import { BrowserRouter, Routes, Route, Link, unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import Login from '@/pages/Login'
import Layout from '@/pages/Layout'
import AuthComponents from './components/AuthComponent'
import Article from './pages/Article'
import Publish from './pages/Publish'
import Home from './pages/Home'
import { history } from "@/utils"

function App () {
  return (
    <HistoryRouter history={history}>
      <div className="App font-red">
        <Link to="/login">Login</Link>
        <Link to="/">Layout</Link>
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
    </HistoryRouter>
  )
}

export default App
