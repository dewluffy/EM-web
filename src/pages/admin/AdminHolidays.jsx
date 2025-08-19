import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminHolidays() {
  const [holidays, setHolidays] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8899/api/holiday')
      .then(res => setHolidays(res.data.holidays || []))
      .catch(err => console.error('Failed to fetch holidays:', err))
  }, [])

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-700 mb-4">📅 Holidays</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Title</th>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday, idx) => (
              <tr key={idx} className="text-center">
                <td className="border px-4 py-2">{new Date(holiday.date).toLocaleDateString()}</td>
                <td className="border px-4 py-2">{holiday.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminHolidays
