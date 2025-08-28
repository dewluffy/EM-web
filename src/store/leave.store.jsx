import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as leaveApi from "../api/leave"; // ต้องสร้าง api แยก

const leaveStore = (set) => ({
  leaves: [],           // ข้อมูล leave ของ user
  leaveDays: 12,        // สมมติค่าเริ่มต้น 12 วันต่อปี
  pendingLeaves: [],    // สำหรับ admin
  rejectedLeaves: [],

  // ==========================
  // สำหรับ user เรียกข้อมูล leave ของตัวเอง
  // ==========================
  getMyLeave: async () => {
    try {
      const res = await leaveApi.getLeaves();
      const myLeaves = res.data.leaves || [];

      // คำนวณ leaveDays ที่เหลือ
      const leaveDaysRemaining = myLeaves.reduce((acc, leave) => {
        if (leave.status === "approved") return acc - leave.days;
        return acc;
      }, 12);

      set({ leaves: myLeaves, leaveDays: leaveDaysRemaining });
      return { success: true, leaveDays: leaveDaysRemaining };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch leaves" };
    }
  },

  // ==========================
  // CRUD Leave สำหรับ user
  // ==========================
  createLeave: async (data) => {
    try {
      const res = await leaveApi.createLeave(data);
      set((state) => ({ leaves: [...state.leaves, res.data.leave] }));
      return { success: true, leave: res.data.leave };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to create leave" };
    }
  },

  updateLeave: async (id, data) => {
    try {
      const res = await leaveApi.updateLeave(id, data);
      set((state) => ({
        leaves: state.leaves.map((l) => (l.id === id ? res.data.leave : l))
      }));
      return { success: true, leave: res.data.leave };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to update leave" };
    }
  },

  deleteLeave: async (id) => {
    try {
      await leaveApi.deleteLeave(id);
      set((state) => ({ leaves: state.leaves.filter((l) => l.id !== id) }));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to delete leave" };
    }
  },

  // ==========================
  // สำหรับ admin
  // ==========================
  fetchPendingLeaves: async () => {
    try {
      const res = await leaveApi.getPendingLeaves();
      set({ pendingLeaves: res.data.leaves });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch pending leaves" };
    }
  },

  fetchRejectedLeaves: async () => {
    try {
      const res = await leaveApi.getRejectedLeaves();
      set({ rejectedLeaves: res.data.leaves });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to fetch rejected leaves" };
    }
  },

  approveLeave: async (id) => {
    try {
      const res = await leaveApi.approveLeave(id);
      set((state) => ({
        pendingLeaves: state.pendingLeaves.filter((l) => l.id !== id),
        leaves: state.leaves.map((l) => (l.id === id ? res.data.leave : l))
      }));
      return { success: true, leave: res.data.leave };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to approve leave" };
    }
  },

  rejectLeave: async (id) => {
    try {
      const res = await leaveApi.rejectLeave(id);
      set((state) => ({
        pendingLeaves: state.pendingLeaves.filter((l) => l.id !== id),
        rejectedLeaves: [...state.rejectedLeaves, res.data.leave]
      }));
      return { success: true, leave: res.data.leave };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || "Failed to reject leave" };
    }
  }
});

const useLeaveStore = create(
  persist(leaveStore, { name: "leave-store" })
);

export default useLeaveStore;
