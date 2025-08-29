import { useState, useEffect } from "react";
import Swal from "sweetalert2";

export default function TimeClock({
  attendanceRecords,
  checkIn,
  checkOut,
  loading,
}) {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isCheckingIn, setIsCheckingIn] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  // อัปเดตเวลาปัจจุบันทุกวินาที
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // ตรวจสอบว่าวันนี้เช็คอินแล้วหรือยัง
  const todayRecord = attendanceRecords?.find(
    (r) => new Date(r.date).toDateString() === currentTime.toDateString()
  );
  const hasCheckedIn = todayRecord?.checkIn;
  const hasCheckedOut = todayRecord?.checkOut;

  const handleCheckIn = async () => {
    setIsCheckingIn(true);
    try {
      await checkIn("Office");
      Swal.fire({
        icon: "success",
        title: "Checked In!",
        text: "คุณได้เช็คอินเรียบร้อยแล้ว",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ไม่สามารถเช็คอินได้ ลองใหม่อีกครั้ง",
      });
    } finally {
      setIsCheckingIn(false);
    }
  };

  const handleCheckOut = async () => {
    setIsCheckingOut(true);
    try {
      await checkOut();
      Swal.fire({
        icon: "success",
        title: "Checked Out!",
        text: "คุณได้เช็คเอาท์เรียบร้อยแล้ว",
        timer: 2000,
        showConfirmButton: false,
      });
    } catch (err) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "ไม่สามารถเช็คเอาท์ได้ ลองใหม่อีกครั้ง",
      });
    } finally {
      setIsCheckingOut(false);
    }
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow space-y-4 text-center">
      <div className="text-xl font-semibold">
        Current Time: {currentTime.toLocaleTimeString()}
      </div>

      <div className="flex justify-center gap-4">
        <button
          onClick={handleCheckIn}
          disabled={hasCheckedIn || isCheckingIn || loading}
          className={`cursor-pointer px-4 py-2 rounded ${
            hasCheckedIn ? "bg-gray-300" : "bg-green-500 text-white"
          } hover:opacity-80`}
        >
          {hasCheckedIn
            ? `Checked in at ${new Date(
                todayRecord.checkIn
              ).toLocaleTimeString()}`
            : isCheckingIn
            ? "Checking in..."
            : "Check In"}
        </button>

        <button
          onClick={handleCheckOut}
          disabled={!hasCheckedIn || hasCheckedOut || isCheckingOut || loading}
          className={`cursor-pointer px-4 py-2 rounded ${
            hasCheckedOut ? "bg-gray-300" : "bg-red-500 text-white"
          } hover:opacity-80`}
        >
          {hasCheckedOut
            ? `Checked out at ${new Date(
                todayRecord.checkOut
              ).toLocaleTimeString()}`
            : isCheckingOut
            ? "Checking out..."
            : "Check Out"}
        </button>
      </div>
    </div>
  );
}
