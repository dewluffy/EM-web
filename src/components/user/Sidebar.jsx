import { Link, useNavigate } from 'react-router'
import useAuthStore from '../../store/auth.store'

function Sidebar() {
  const logout = useAuthStore(state => state.actionLogout)
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }
  return (
    <div className="w-52 h-screen bg-blue-800 text-white flex flex-col p-4 space-y-2 shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">User Name</h2>

      <Link
        to="/dashboard"
        className="hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        🏠 Dashboard
      </Link>

      <Link
        to="/attendance"
        className="hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        📅 Attendance
      </Link>

      <Link
        to="/leave"
        className="hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        📝 Leave Requests
      </Link>

      <Link
        to="/profile"
        className="hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        👤 Profile
      </Link>

      <Link
        to="/settings"
        className="hover:bg-blue-600 px-4 py-2 rounded transition"
      >
        ⚙️ Settings
      </Link>

      <div className="flex justify-center mt-auto pt-4 border-t border-blue-600">
        <button onClick={handleLogout} className="hover:bg-red-600 text-lg font-semibold px-4 py-2 bg-red-500 text-white rounded cursor-pointer">
          🚪Logout
          </button> 
      </div>
    </div>
  )
}

export default Sidebar