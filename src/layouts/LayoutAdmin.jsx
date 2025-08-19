import { Outlet } from 'react-router'
import AdminSidebar from '../components/admin/AdminSidebar'
import AdminNavbar from '../components/admin/AdminNavbar'

function LayoutAdmin() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AdminSidebar />
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <AdminNavbar />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default LayoutAdmin
