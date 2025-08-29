import { useEffect, useState } from "react";
import dayjs from "dayjs";
import useLeaveStore from "../store/leave.store";

export default function Leave() {
  const { leaves, fetchLeaves, leaveTypes, fetchLeaveTypes, loading } =
    useLeaveStore();

  const [filterMonth, setFilterMonth] = useState("");
  const [filterYear, setFilterYear] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  useEffect(() => {
    fetchLeaveTypes();
    fetchLeaves();
  }, []);

  // Filtered Leaves
  const filteredLeaves = leaves.filter((leave) => {
    const leaveMonth = dayjs(leave.startDate).format("MM");
    const leaveYear = dayjs(leave.startDate).format("YYYY");
    return (
      (!filterMonth || filterMonth === leaveMonth) &&
      (!filterYear || filterYear === leaveYear) &&
      (!filterStatus || filterStatus === leave.status)
    );
  });

  const months = Array.from({ length: 12 }, (_, i) =>
    String(i + 1).padStart(2, "0")
  );
  const years = Array.from({ length: 5 }, (_, i) => String(dayjs().year() - i));
  const statuses = ["pending", "approved", "rejected"];

  return (
    <div className="p-4">
      <div className="mb-4 flex flex-wrap gap-4 items-end">
        {/* Month Filter */}
        <div>
          <label className="label">
            <span className="label-text">Month</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={filterMonth}
            onChange={(e) => setFilterMonth(e.target.value)}
          >
            <option value="">All</option>
            {months.map((m) => (
              <option key={m} value={m}>
                {m}
              </option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="label">
            <span className="label-text">Year</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={filterYear}
            onChange={(e) => setFilterYear(e.target.value)}
          >
            <option value="">All</option>
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>

        {/* Status Filter */}
        <div>
          <label className="label">
            <span className="label-text">Status</span>
          </label>
          <select
            className="select select-bordered w-full max-w-xs"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">All</option>
            {statuses.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>NO.</th>
              <th>Leave Type</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center">
                  Loading...
                </td>
              </tr>
            ) : filteredLeaves.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No leaves found.
                </td>
              </tr>
            ) : (
              filteredLeaves.map((leave, index) => (
                <tr key={leave.id}>
                  <td>{index + 1}</td>
                  <td>{leave.leaveType?.name || "N/A"}</td>
                  <td>{dayjs(leave.startDate).format("YYYY-MM-DD")}</td>
                  <td>{dayjs(leave.endDate).format("YYYY-MM-DD")}</td>
                  <td>
                    <span
                      className={`badge ${
                        leave.status === "approved"
                          ? "badge-success"
                          : leave.status === "rejected"
                          ? "badge-error"
                          : "badge-warning"
                      }`}
                    >
                      {leave.status}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
