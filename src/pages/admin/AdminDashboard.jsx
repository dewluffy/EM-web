function AdminDashboard() {
  return (
    <div>
      <h1 className="text-2xl font-bold text-blue-800 mb-4">📊 Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Total Employees</h2>
          <p className="text-3xl font-bold text-blue-700">25</p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Pending Leaves</h2>
          <p className="text-3xl font-bold text-yellow-500">4</p>
        </div>
        <div className="bg-white p-6 rounded shadow border">
          <h2 className="text-lg font-semibold text-gray-600">Today's Attendance</h2>
          <p className="text-3xl font-bold text-green-500">20</p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
