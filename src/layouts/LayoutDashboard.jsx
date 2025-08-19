import { Outlet } from 'react-router'
import Sidebar from '../components/user/Sidebar'
import UserNavbar from '../components/user/UserNavbar'

function LayoutDashboard() {
  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <UserNavbar />
        <div className='p-6'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default LayoutDashboard