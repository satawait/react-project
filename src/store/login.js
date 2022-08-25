import { makeAutoObservable } from "mobx"
import { http, setToken, getToken } from "@/utils"
import { removeToken } from "src/utils"
class LoginStore {
  token = getToken() || ''
  constructor() {
    makeAutoObservable(this)
  }
  setToken = async ({ mobile, code }) => {
    const res = await http.post('http://geek.itheima.net/v1_0/authorizations', {
      mobile,
      code
    })
    this.token = res.data.token
    setToken(this.token)
  }
  logout = () => {
    this.token = ''
    removeToken()
  }
}
export default LoginStore