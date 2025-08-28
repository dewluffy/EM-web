function LeaveSummary({ leaveDays = 12 }) {
  return (
    <div className="mb-6 p-4 border rounded">
      <h2 className="text-xl font-semibold mb-2">Leave Summary</h2>
      <p>Remaining leave days: <span className="font-bold">{leaveDays}</span></p>
      <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">
        Request Leave
      </button>
    </div>
  );
}

export default LeaveSummary;
