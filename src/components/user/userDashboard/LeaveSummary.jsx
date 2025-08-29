function LeaveSummary({ leaveDays = 12 }) {
  return (
    <div className="mb-6 p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-md transition-shadow duration-300">
      <h2 className="text-2xl font-semibold mb-3 text-gray-800">Leave Summary</h2>
      <p className="text-gray-600 mb-4">
        Remaining leave days: <span className="font-bold text-indigo-600">{leaveDays}</span>
      </p>
      <button
        className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-5 py-2 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
      >
        Request Leave
      </button>
    </div>
  );
}

export default LeaveSummary;
