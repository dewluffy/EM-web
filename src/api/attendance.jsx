import axios from "./axios"; // instance ที่แนบ token

const BASE_URL = "/attendance";

export const checkIn = async (location) => axios.post(`${BASE_URL}/checkin`, { location });
export const checkOut = async () => axios.post(`${BASE_URL}/checkout`);
export const getMyAttendance = async () => axios.get(`${BASE_URL}/me`);
export const getAttendanceByEmployeeId = async (id) => axios.get(`${BASE_URL}/admin/${id}`);
export const updateAttendance = async (id, data) => axios.patch(`${BASE_URL}/admin/${id}`, data);
export const deleteAttendance = async (id) => axios.delete(`${BASE_URL}/admin/${id}`);
