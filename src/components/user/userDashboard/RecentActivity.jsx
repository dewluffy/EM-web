function RecentActivity({ activities = [] }) {
  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Recent Activity</h2>
      {activities.length === 0 ? (
        <p>No recent activity</p>
      ) : (
        <ul className="list-disc list-inside">
          {activities.map((act, idx) => (
            <li key={idx}>{act}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RecentActivity;
