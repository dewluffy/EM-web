import { Link } from 'react-router'

function QuickLinks() {
  return (
    <section>
      <h2 className="text-xl font-semibold mb-3">Quick Links</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Link
          to="/attendance"
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded text-center"
        >
          Attendance
        </Link>
        <Link
          to="/leave"
          className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded text-center"
        >
          Leave Requests
        </Link>
        <Link
          to="/profile"
          className="bg-gray-700 hover:bg-gray-800 text-white font-semibold py-3 rounded text-center"
        >
          Profile Settings
        </Link>
      </div>
    </section>
  )
}

export default QuickLinks
