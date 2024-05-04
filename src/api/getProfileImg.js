import { instance } from './Axios';

export const getProfileImg = async () => {
  try {
    const response = await instance.get('/profile-images/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
