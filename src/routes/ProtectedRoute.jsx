import { Navigate, Outlet } from 'react-router'
import useAuthStore from '../store/auth.store'

function ProtectedRoute({ allowedRoles = [] }) {
  const token = useAuthStore(state => state.token)
  const user = useAuthStore(state => state.user)

  if (!token) {
    return <Navigate to="/login" replace />
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default ProtectedRoute
