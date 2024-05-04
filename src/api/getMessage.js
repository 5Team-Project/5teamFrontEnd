import { instance } from './Axios';

export const getMessage = async (messageId) => {
  try {
    const response = await instance.get(
      `/6-5/recipients/${messageId}/messages/`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
