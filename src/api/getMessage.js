import { instance } from './Axios';

export const getMessage = async ({messageId, offset = 0, limit = 8}) => {
  try {
    const query = `offset=${offset}&limit=${limit}`;
    const response = await instance.get(
      `/6-5/recipients/${messageId}/messages/?${query}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
