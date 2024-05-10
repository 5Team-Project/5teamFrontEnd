import { instance } from './Axios';

export const PostPaper = async (data) => {
  try {
    const response = await instance.post('6-5/recipients/', data);
    return response.data;
  } catch (error) {
    console.error('작성 실패:', error);
    throw error;
  }
};
