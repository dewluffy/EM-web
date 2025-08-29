import axios from "axios";
import useAuthStore from "../store/auth.store";

const API_URL = "http://localhost:8899/api/leave";
const LEAVE_TYPE_URL = "http://localhost:8899/api/leave-types";

const getToken = () => useAuthStore.getState().accessToken;

// Leave APIs
export const getAllLeaves = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leaves;
};

export const getLeaveById = async (id) => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leave;
};

export const createLeave = async (data) => {
  const token = getToken();
  // data ต้องมี leaveTypeId, startDate, endDate, employeeId
  const res = await axios.post(`${API_URL}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leave;
};

export const updateLeave = async (id, data) => {
  const token = getToken();
  const res = await axios.patch(`${API_URL}/${id}`, data, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leave;
};

export const deleteLeave = async (id) => {
  const token = getToken();
  const res = await axios.delete(`${API_URL}/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.message;
};

export const approveLeave = async (id) => {
  const token = getToken();
  const res = await axios.patch(`${API_URL}/${id}/approve`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leave;
};

export const rejectLeave = async (id) => {
  const token = getToken();
  const res = await axios.patch(`${API_URL}/${id}/reject`, null, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leave;
};

export const getPendingLeaves = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leaves;
};

export const getRejectedLeaves = async () => {
  const token = getToken();
  const res = await axios.get(`${API_URL}/rejected`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leaves;
};

// Leave Type API
export const getLeaveTypes = async () => {
  const token = getToken();
  const res = await axios.get(`${LEAVE_TYPE_URL}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data.leaveTypes; // backend ต้องส่ง { leaveTypes: [...] }
};
