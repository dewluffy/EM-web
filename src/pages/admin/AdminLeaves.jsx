import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminLeaves() {
  const [leaves, setLeaves] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8899/api/leave')
      .then(res => setLeaves(res.data.leaves || []))
      .catch(err => console.error('Failed to fetch leaves:', err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📋 Leave Requests</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Name</th>
              <th className="px-4 py-2 border">Type</th>
              <th className="px-4 py-2 border">Start</th>
              <th className="px-4 py-2 border">End</th>
              <th className="px-4 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {leaves.map((leave, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2">{leave.employee?.firstName} {leave.employee?.lastName}</td>
                <td className="border px-4 py-2">{leave.leaveType?.name}</td>
                <td className="border px-4 py-2">{new Date(leave.startDate).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{new Date(leave.endDate).toLocaleDateString()}</td>
                <td className={`border px-4 py-2 capitalize ${leave.status === 'approved' ? 'text-green-600' : leave.status === 'rejected' ? 'text-red-600' : 'text-yellow-600'}`}>
                  {leave.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminLeaves
