import { Link } from 'react-router'

function AdminNavbar() {
  return (
    <nav className="bg-blue-800 text-white px-6 py-4 shadow-md flex justify-between items-center">
      {/* Logo / Title */}
      <div className="text-xl font-bold tracking-wide">
        🛠️ Admin Panel
      </div>

      {/* Navigation Links */}
      <div className="flex gap-6 text-sm md:text-base justify-between">
        <Link to="/admin" className="hover:text-yellow-300 transition-colors duration-200">
          Home
        </Link>
        <Link to="/admin" className="hover:text-yellow-300 transition-colors duration-200">
          Profile
        </Link>
      </div>
    </nav>
  )
}

export default AdminNavbar