import { instance } from './Axios';

export const deletePaper = async (recipientId) => {
  try {
    const res = await instance.delete(`/6-5/messages/${recipientId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
