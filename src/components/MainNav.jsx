import { Link, useLocation } from 'react-router'

function MainNav() {
  return (
    <nav className="bg-blue-700 shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* LOGO และเมนูซ้าย */}
          <div className="flex items-center gap-6">
            <Link to="/" className="text-white font-bold text-xl">
              🧾 EM-Manager
            </Link>
          </div>

          {/* เมนูขวา */}
          <div className="flex items-center gap-4">
            <Link to="/register" className="text-white hover:text-yellow-300 transition">Register</Link>
            <Link to="/login" className="text-white hover:text-yellow-300 transition">Login</Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default MainNav