import { getToken } from "@/utils"
import { Navigate } from "react-router-dom"

function AuthComponents ({ children }) {
  const token = getToken()
  return (
    token ? <>{children}</> : <Navigate to="/login" replace />
  )
}
export default AuthComponents