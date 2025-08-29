import { useEffect, useState } from "react";
import useAuthStore from '../store/auth.store';
import useAttendanceStore from '../store/attendance.store';
import useLeaveStore from '../store/leave.store';

import UserProfile from '../components/user/UserProfile';
import QuickLinks from '../components/user/QuickLinks';
import TimeClock from '../components/user/userDashboard/TimeClock';
import RecentActivity from '../components/user/userDashboard/RecentActivity';

function Dashboard() {
  const user = useAuthStore(state => state.user);

  // ใช้ store ใหม่
  const { records: attendanceRecords, fetchMyAttendance, checkIn, checkOut, loading: attendanceLoading } = useAttendanceStore();
  const { leaves, leaveDays, getMyLeave } = useLeaveStore();

  const [recentActivities, setRecentActivities] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchMyAttendance(); // ดึง attendance
      await getMyLeave();        // ดึง leave
    };
    fetchData();
  }, [fetchMyAttendance, getMyLeave]);

  // อัปเดต recent activity อัตโนมัติเมื่อ attendance หรือ leave เปลี่ยน
  useEffect(() => {
    const activities = [];

    (attendanceRecords || []).forEach(record => {
      if(record.checkIn) activities.push(`Checked in at ${new Date(record.checkIn).toLocaleTimeString()}`);
      if(record.checkOut) activities.push(`Checked out at ${new Date(record.checkOut).toLocaleTimeString()}`);
    });

    (leaves || []).forEach(leave => {
      if(leave.status === "pending") activities.push(`Requested leave for ${leave.date}`);
      else if(leave.status === "approved") activities.push(`Leave approved for ${leave.date}`);
      else if(leave.status === "rejected") activities.push(`Leave rejected for ${leave.date}`);
    });

    setRecentActivities(activities.reverse());
  }, [attendanceRecords, leaves]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome back, {user?.firstName || 'User'}!
      </h1>

      <div className="bg-white rounded-lg shadow p-6 max-w-4xl mx-auto space-y-6">
        <UserProfile user={user} />

        {/* เวลาเข้างาน */}
        <TimeClock 
          attendanceRecords={attendanceRecords} 
          checkIn={checkIn} 
          checkOut={checkOut} 
          loading={attendanceLoading} 
        />

        {/* Recent Activity */}
        <RecentActivity activities={recentActivities} />

        <QuickLinks />
      </div>
    </div>
  );
}

export default Dashboard;
