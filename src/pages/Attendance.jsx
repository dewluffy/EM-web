import { useEffect, useState } from "react";
import useAttendanceStore from '../store/attendance.store';
import dayjs from 'dayjs';
import Swal from 'sweetalert2';

function Attendance() {
  const { records, fetchMyAttendance, loading } = useAttendanceStore();

  const [month, setMonth] = useState(dayjs().month() + 1); // 1-12
  const [year, setYear] = useState(dayjs().year());
  const [filteredRecords, setFilteredRecords] = useState([]);

  useEffect(() => {
    fetchMyAttendance().catch(err => {
      Swal.fire('Error', err.message || 'Failed to fetch attendance.', 'error');
    });
  }, [fetchMyAttendance]);

  useEffect(() => {
    const filtered = (records || []).filter(r => {
      const rDate = dayjs(r.date);
      return rDate.month() + 1 === Number(month) && rDate.year() === Number(year);
    });
    setFilteredRecords(filtered);
  }, [records, month, year]);

  const totalDays = filteredRecords.length;
  const checkedInDays = filteredRecords.filter(r => r.checkIn).length;
  const lateDays = filteredRecords.filter(r => r.isLate).length;
  const absentDays = totalDays - checkedInDays;

  return (
    <div className="min-h-screen p-6 bg-base-200">
      <h1 className="text-3xl font-bold mb-6 text-base-content">Attendance Summary</h1>

      <div className="card bg-base-100 shadow-xl p-6 max-w-5xl mx-auto space-y-6">

        {/* Filter เดือน/ปี */}
        <div className="flex flex-wrap gap-4 mb-4 items-end">
          <div>
            <label className="label">
              <span className="label-text">Month</span>
            </label>
            <select 
              value={month} 
              onChange={e => setMonth(e.target.value)} 
              className="select select-bordered w-full"
            >
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i+1} value={i+1}>{dayjs().month(i).format('MMMM')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="label">
              <span className="label-text">Year</span>
            </label>
            <input 
              type="number" 
              value={year} 
              onChange={e => setYear(e.target.value)} 
              className="input input-bordered w-32"
            />
          </div>
        </div>

        {/* Summary */}
        <div className="grid grid-cols-4 gap-4 mb-4">
          <div className="card bg-green-100 p-4 rounded text-center shadow">
            <p className="text-gray-600">Total Days</p>
            <p className="text-xl font-bold">{totalDays}</p>
          </div>
          <div className="card bg-blue-100 p-4 rounded text-center shadow">
            <p className="text-gray-600">Checked In</p>
            <p className="text-xl font-bold">{checkedInDays}</p>
          </div>
          <div className="card bg-yellow-100 p-4 rounded text-center shadow">
            <p className="text-gray-600">Late</p>
            <p className="text-xl font-bold">{lateDays}</p>
          </div>
          <div className="card bg-red-100 p-4 rounded text-center shadow">
            <p className="text-gray-600">Absent</p>
            <p className="text-xl font-bold">{absentDays}</p>
          </div>
        </div>

        {/* ตารางรายวัน */}
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr>
                <th>Date</th>
                <th>Check In</th>
                <th>Check Out</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRecords.map(r => (
                <tr key={r.id}>
                  <td>{dayjs(r.date).format('YYYY-MM-DD')}</td>
                  <td>{r.checkIn ? dayjs(r.checkIn).format('HH:mm:ss') : '-'}</td>
                  <td>{r.checkOut ? dayjs(r.checkOut).format('HH:mm:ss') : '-'}</td>
                  <td>
                    {r.checkIn 
                      ? r.isLate 
                        ? <span className="badge badge-warning">Late</span> 
                        : <span className="badge badge-success">On time</span>
                      : <span className="badge badge-error">Absent</span>
                    }
                  </td>
                </tr>
              ))}
              {filteredRecords.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500">No records found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}

export default Attendance;
