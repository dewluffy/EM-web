function RecentActivity({ activities = [] }) {
  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">Recent Activity</h2>
      {activities.length === 0 ? (
        <p className="text-gray-500">No recent activity</p>
      ) : (
        <ul className="space-y-2">
          {activities.map((act, idx) => (
            <li
              key={idx}
              className="flex items-center text-gray-700 bg-gray-50 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-100 transition-colors duration-200"
            >
              <span className="mr-2 text-indigo-500">•</span> {act}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivity;
