import { instance } from './Axios';

export const getData = async (url) => {
  try {
    const res = await instance.get(url);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
