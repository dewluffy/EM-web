import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  getAllEmployees,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
} from "../api/adminApi";
import useAuthStore from "./authStore"; // ดึง token จาก authStore

const adminEmployeeStore = (set) => ({
  employees: [],
  selectedEmployee: null,
  loading: false,
  error: null,

  // ดึงพนักงานทั้งหมด
  fetchEmployees: async () => {
    const token = useAuthStore.getState().accessToken;
    try {
      set({ loading: true });
      const res = await getAllEmployees(token);
      set({ employees: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch employees",
        loading: false,
      });
    }
  },

  // ดึงพนักงานตาม id
  fetchEmployeeById: async (id) => {
    const token = useAuthStore.getState().accessToken;
    try {
      set({ loading: true });
      const res = await getEmployeeById(id, token);
      set({ selectedEmployee: res.data, loading: false });
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to fetch employee",
        loading: false,
      });
    }
  },

  // อัพเดตข้อมูลพนักงาน
  updateEmployee: async (id, data) => {
    const token = useAuthStore.getState().accessToken;
    try {
      await updateEmployeeById(id, data, token);
      // refresh ใหม่หลังอัพเดท
      await adminEmployeeStore.getState().fetchEmployees();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to update employee",
      });
    }
  },

  // ลบพนักงาน
  deleteEmployee: async (id) => {
    const token = useAuthStore.getState().accessToken;
    try {
      await deleteEmployeeById(id, token);
      // ลบเสร็จก็ดึงใหม่
      await adminEmployeeStore.getState().fetchEmployees();
    } catch (error) {
      set({
        error: error.response?.data?.message || "Failed to delete employee",
      });
    }
  },
});

const useAdminEmployeeStore = create(
  persist(adminEmployeeStore, { name: "admin-employee-store" })
);

export default useAdminEmployeeStore;
