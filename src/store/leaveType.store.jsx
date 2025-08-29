import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAllLeaveTypes,
  getLeaveTypeById,
  createLeaveType,
  updateLeaveTypeById,
  deleteLeaveTypeById,
} from "../api/leaveType";
import useAuthStore from "./auth.store"; // ดึง token จาก authStore

const leaveTypeStore = (set) => ({
  leaveTypes: [],
  selectedLeaveType: null,
  loading: false,
  error: null,

  // ดึง LeaveType ทั้งหมด
  fetchLeaveTypes: async () => {
    const token = useAuthStore.getState().accessToken;
    try {
      set({ loading: true });
      const res = await getAllLeaveTypes(token);
      set({ leaveTypes: res.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch leave types",
        loading: false,
      });
    }
  },

  // ดึง LeaveType ตาม id
  fetchLeaveTypeById: async (id) => {
    const token = useAuthStore.getState().accessToken;
    try {
      set({ loading: true });
      const res = await getLeaveTypeById(id, token);
      set({ selectedLeaveType: res.data.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch leave type",
        loading: false,
      });
    }
  },

  // สร้าง LeaveType ใหม่
  createLeaveType: async (data) => {
    const token = useAuthStore.getState().accessToken;
    try {
      await createLeaveType(data, token);
      await leaveTypeStore.getState().fetchLeaveTypes(); // refresh list
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to create leave type",
      });
    }
  },

  // อัพเดท LeaveType
  updateLeaveType: async (id, data) => {
    const token = useAuthStore.getState().accessToken;
    try {
      await updateLeaveTypeById(id, data, token);
      await leaveTypeStore.getState().fetchLeaveTypes(); // refresh list
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update leave type",
      });
    }
  },

  // ลบ LeaveType
  deleteLeaveType: async (id) => {
    const token = useAuthStore.getState().accessToken;
    try {
      await deleteLeaveTypeById(id, token);
      await leaveTypeStore.getState().fetchLeaveTypes(); // refresh list
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete leave type",
      });
    }
  },
});

const useLeaveTypeStore = create(
  persist(leaveTypeStore, { name: "leave-type-store" })
);

export default useLeaveTypeStore;
