import { instance } from './Axios';

export const deleteMessage = async (messageId) => {
  try {
    const res = await instance.delete(`/6-5/messages/${messageId}/`);
    return res;
  } catch (error) {
    console.error(error);
  }
};
