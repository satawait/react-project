import LoginStore from "./login"
import { createContext, useContext } from "react"
import UserStore from "./use"
import ChannelStore from "./channel"

class RootStore {
  constructor() {
    this.loginStore = new LoginStore()
    this.userStore = new UserStore()
    this.channelStore = new ChannelStore()
  }
}

const rootStore = new RootStore()
const context = createContext(rootStore)
const useStore = () => useContext(context)

export default useStore