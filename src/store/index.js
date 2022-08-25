import LoginStore from "./login"
import { createContext, useContext } from "react"
import UserStore from "./use"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
  }
}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore