import { useEffect, useState } from 'react'
import { getAllEmployees } from '../../api/admin'
import useAuthStore from '../../store/auth.store'

function EmployeeList() {
  const token = useAuthStore(state => state.token)
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!token) return

    getAllEmployees(token)
      .then(res => {
        console.log('✅ API Response:', res.data)
        setEmployees(res.data.employees || [])
        setLoading(false)
      })
      .catch(err => {
        console.error('❌ API Error:', err)
        setError('Failed to load employee list')
        setLoading(false)
      })
  }, [token])

  if (loading) {
    return <div className="text-center text-blue-500 mt-10">Loading employees...</div>
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>
  }

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Employee List</h2>

      <div className="overflow-x-auto bg-white shadow rounded-lg border border-gray-200">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Position</th>
              <th className="px-4 py-2">Department</th>
              <th className="px-4 py-2">Role</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((emp, index) => (
              <tr key={emp.id} className="border-t hover:bg-gray-50">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{emp.firstName} {emp.lastName}</td>
                <td className="px-4 py-2">{emp.email}</td>
                <td className="px-4 py-2">{emp.position || '-'}</td>
                <td className="px-4 py-2">{emp.department || '-'}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-white text-xs ${emp.role === 'ADMIN' ? 'bg-red-500' : 'bg-blue-500'}`}>
                    {emp.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default EmployeeList
