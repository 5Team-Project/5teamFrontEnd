import { instance } from './Axios';

export const PostMessages = async (data, messageId) => {
  try {
    const response = await instance.post(
      `/6-5/recipients/${messageId}/messages/`,
      JSON.stringify(data),
    );
    return response.data;
  } catch (error) {
    console.error('작성 실패:', error);
  }
};
