import instance from './Axios';

const getData = async (url) => {
  try {
    const { data } = await instance.get(url);
    return data;
  } catch (e) {
    console.error(e);
  }
};

export default getData;
