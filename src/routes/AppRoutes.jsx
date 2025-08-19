import { Route, Routes } from 'react-router'
import Home from '../pages/Home'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/LOgin'
import Layout from '../layouts/Layout'
import Dashboard from '../pages/Dashboard'
import LayoutDashboard from '../layouts/LayoutDashboard'
import Attendance from '../pages/Attendance'
import Leave from '../pages/Leave'
import ProtectedRoute from './ProtectedRoute'
import LayoutAdmin from '../layouts/LayoutAdmin'
import EmployeeList from '../pages/admin/EmployeeList'
import AdminDashboard from '../pages/admin/AdminDashboard'
import AdminLeaves from '../pages/admin/AdminLeaves'
import AdminHolidays from '../pages/admin/AdminHolidays'
import AdminHome from '../pages/admin/AdminHome'



function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Layout />}>
        <Route index element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="login" element={<Login />} />
      </Route>

      {/* Protected User Routes */}
      <Route element={<ProtectedRoute allowedRoles={['USER', 'ADMIN']} />}>
        <Route path="/" element={<LayoutDashboard />}>
          <Route index element={<Home />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="leave" element={<Leave />} />
        </Route>
      </Route>

      {/* Admin-only routes */}
      <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
        <Route path="/admin" element={<LayoutAdmin />}>
          <Route index element={<AdminHome />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="employees" element={<EmployeeList />} />
          <Route path="leaves" element={<AdminLeaves />} />
          <Route path="holidays" element={<AdminHolidays />} />
        </Route>
      </Route>
     
    </Routes>
  )
}

export default AppRoutes