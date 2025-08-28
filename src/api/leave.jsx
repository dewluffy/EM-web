import axios from 'axios'; // axios config ของคุณ

export const getMyLeaves = async () => {
  const res = await axios.get('/leave');
  return res.data.leaves;
};

export const getPendingLeaves = async () => {
  const res = await axios.get('/leave/pending');
  return res.data.leaves;
};

export const createLeaveRequest = async (data) => {
  const res = await axios.post('/leave', data);
  return res.data.leave;
};

export const approveLeaveRequest = async (id) => {
  const res = await axios.patch(`/leave/${id}/approve`);
  return res.data.leave;
};

export const rejectLeaveRequest = async (id) => {
  const res = await axios.patch(`/leave/${id}/reject`);
  return res.data.leave;
};
