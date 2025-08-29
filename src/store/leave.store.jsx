import { create } from "zustand";
import { persist } from "zustand/middleware";
import * as leaveApi from "../api/leave";

const leaveStore = (set, get) => ({
  leaves: [],
  leaveTypes: [],
  selectedLeave: null,
  loading: false,
  error: null,

  // Leave Types
  fetchLeaveTypes: async () => {
    set({ loading: true });
    try {
      const leaveTypes = await leaveApi.getLeaveTypes();
      set({ leaveTypes, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch leave types", loading: false });
    }
  },

  // Leaves
  fetchLeaves: async () => {
    set({ loading: true });
    try {
      const leaves = await leaveApi.getAllLeaves();
      set({ leaves, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch leaves", loading: false });
    }
  },

  createLeave: async (data) => {
    set({ loading: true });
    try {
      await leaveApi.createLeave(data);
      await get().fetchLeaves();
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to create leave", loading: false });
    }
  },

  updateLeave: async (id, data) => {
    set({ loading: true });
    try {
      await leaveApi.updateLeave(id, data);
      await get().fetchLeaves();
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to update leave", loading: false });
    }
  },

  deleteLeave: async (id) => {
    set({ loading: true });
    try {
      await leaveApi.deleteLeave(id);
      await get().fetchLeaves();
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to delete leave", loading: false });
    }
  },

  approveLeave: async (id) => {
    set({ loading: true });
    try {
      await leaveApi.approveLeave(id);
      await get().fetchLeaves();
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to approve leave", loading: false });
    }
  },

  rejectLeave: async (id) => {
    set({ loading: true });
    try {
      await leaveApi.rejectLeave(id);
      await get().fetchLeaves();
      set({ loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to reject leave", loading: false });
    }
  },

  fetchPendingLeaves: async () => {
    set({ loading: true });
    try {
      const leaves = await leaveApi.getPendingLeaves();
      set({ leaves, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch pending leaves", loading: false });
    }
  },

  fetchRejectedLeaves: async () => {
    set({ loading: true });
    try {
      const leaves = await leaveApi.getRejectedLeaves();
      set({ leaves, loading: false });
    } catch (err) {
      set({ error: err.message || "Failed to fetch rejected leaves", loading: false });
    }
  },
});

const useLeaveStore = create(
  persist(leaveStore, {
    name: "leave-store",
    partialize: (state) => ({
      leaves: state.leaves,
      leaveTypes: state.leaveTypes,
    }),
  })
);

export default useLeaveStore;
