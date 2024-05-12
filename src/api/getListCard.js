import { instance } from './Axios';

export const getListCard = async (id) => {
  const body = `/6-5/recipients/${id}/`;
  try {
    const res = await instance.get(body);
    return res.data;
  } catch (error) {
    console.error(error);
  }
};
