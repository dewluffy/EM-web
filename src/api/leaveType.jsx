import axios from "axios";

const API_URL = "http://localhost:8899/api/leave-types";

// ดึง LeaveType ทั้งหมด
export const getAllLeaveTypes = async (token) => {
  return await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ดึง LeaveType ตาม id
export const getLeaveTypeById = async (id, token) => {
  return await axios.get(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// สร้าง LeaveType ใหม่ (ADMIN)
export const createLeaveType = async (data, token) => {
  return await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// อัพเดท LeaveType ตาม id (ADMIN)
export const updateLeaveTypeById = async (id, data, token) => {
  return await axios.put(`${API_URL}/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ลบ LeaveType ตาม id (ADMIN)
export const deleteLeaveTypeById = async (id, token) => {
  return await axios.delete(`${API_URL}/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
