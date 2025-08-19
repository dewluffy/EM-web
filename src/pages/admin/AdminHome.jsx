import { useEffect, useState } from 'react'
import useAuthStore from '../../store/auth.store'

function AdminHome() {
  const { user } = useAuthStore()
  const [date, setDate] = useState('')

  useEffect(() => {
    const today = new Date()
    const formatted = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
    setDate(formatted)
  }, [])

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-blue-700">
        🧑‍💼 Welcome Admin, {user.firstName} {user.lastName}
      </h1>
      <p className="text-gray-500">Today is {date}</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-6">
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Total Employees</h2>
          <p className="text-2xl font-bold text-blue-600">--</p> {/* คุณสามารถใส่จำนวนจริงได้ */}
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Pending Leaves</h2>
          <p className="text-2xl font-bold text-yellow-500">--</p>
        </div>
        <div className="bg-white shadow-lg rounded-lg p-5 border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-700">Upcoming Holidays</h2>
          <p className="text-2xl font-bold text-green-500">--</p>
        </div>
      </div>

      {/* เพิ่มปุ่มหรือลิงก์ไปยังหน้าต่างๆ ได้ */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Quick Access</h3>
        <div className="flex flex-wrap gap-4">
          <a href="/admin/employees" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Manage Employees
          </a>
          <a href="/admin/leaves" className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
            Approve Leaves
          </a>
          <a href="/admin/holidays" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Manage Holidays
          </a>
        </div>
      </div>
    </div>
  )
}

export default AdminHome
