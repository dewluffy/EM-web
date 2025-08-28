// src/stores/attendance.store.js
import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as attendanceApi from "../api/attendance";

const attendanceStore = (set) => ({
  records: [],
  loading: false,
  error: null,

  // โหลด attendance ของตัวเอง
  fetchMyAttendance: async () => {
    set({ loading: true, error: null });
    try {
      const res = await attendanceApi.getMyAttendance();
      set({ records: res.data.attendance, loading: false });
      return { success: true };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch attendance" });
      return { success: false, message: err.response?.data?.message || "Failed to fetch attendance" };
    }
  },

  // Check-in
  checkIn: async (location) => {
    set({ loading: true, error: null });
    try {
      const res = await attendanceApi.checkIn(location);
      set((state) => ({
        records: [res.data.attendance, ...state.records],
        loading: false,
      }));
      return { success: true, attendance: res.data.attendance };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to check in" });
      return { success: false, message: err.response?.data?.message || "Failed to check in" };
    }
  },

  // Check-out
  checkOut: async () => {
    set({ loading: true, error: null });
    try {
      const res = await attendanceApi.checkOut();
      set((state) => ({
        records: state.records.map((r) =>
          r.date === res.data.attendance.date ? res.data.attendance : r
        ),
        loading: false,
      }));
      return { success: true, attendance: res.data.attendance };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to check out" });
      return { success: false, message: err.response?.data?.message || "Failed to check out" };
    }
  },

  // Admin - get attendance by employee
  fetchAttendanceByEmployee: async (id) => {
    set({ loading: true, error: null });
    try {
      const res = await attendanceApi.getAttendanceByEmployeeId(id);
      set({ loading: false });
      return { success: true, attendance: res.data.attendance };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to fetch attendance" });
      return { success: false, message: err.response?.data?.message || "Failed to fetch attendance" };
    }
  },

  // Admin - update attendance
  updateAttendance: async (id, data) => {
    set({ loading: true, error: null });
    try {
      const res = await attendanceApi.updateAttendance(id, data);
      set((state) => ({
        records: state.records.map((r) => (r.id === id ? res.data.attendance : r)),
        loading: false,
      }));
      return { success: true, attendance: res.data.attendance };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to update attendance" });
      return { success: false, message: err.response?.data?.message || "Failed to update attendance" };
    }
  },

  // Admin - delete attendance
  deleteAttendance: async (id) => {
    set({ loading: true, error: null });
    try {
      await attendanceApi.deleteAttendance(id);
      set((state) => ({
        records: state.records.filter((r) => r.id !== id),
        loading: false,
      }));
      return { success: true };
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || "Failed to delete attendance" });
      return { success: false, message: err.response?.data?.message || "Failed to delete attendance" };
    }
  },
});

const useAttendanceStore = create(persist(attendanceStore, { name: "attendance-store" }));

export default useAttendanceStore;
