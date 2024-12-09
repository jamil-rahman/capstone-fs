import api from '../utils/axiosConfig';

export const sendEmail = async (data) => {
  return await api.post('/email/send', data);
};
