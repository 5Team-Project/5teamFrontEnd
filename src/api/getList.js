import { instance } from './Axios';

export const getList = async (body) => {
  try {
    const res = await instance.get(body);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
