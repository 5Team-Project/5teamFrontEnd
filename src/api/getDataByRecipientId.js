import { instance } from './Axios';

export const getDataByRecipientId = async (recipientId) => {
  try {
    const res = await instance.get(`/6-5/recipients/${recipientId}`);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
