import axios from "axios";

const API_URL = "http://localhost:8899/api/admin";

// ดึงพนักงานทั้งหมด
export const getAllEmployees = async (token) => {
  return await axios.get(`${API_URL}/users`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ดึงข้อมูลพนักงานตาม id
export const getEmployeeById = async (id, token) => {
  return await axios.get(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// อัพเดทข้อมูลพนักงานตาม id
export const updateEmployeeById = async (id, data, token) => {
  return await axios.patch(`${API_URL}/users/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// ลบพนักงานตาม id
export const deleteEmployeeById = async (id, token) => {
  return await axios.delete(`${API_URL}/users/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
