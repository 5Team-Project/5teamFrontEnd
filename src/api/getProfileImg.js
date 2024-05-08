import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { storage } from '../utils/firebase';
import { instance } from './Axios';

export const getProfileImgs = async () => {
  try {
    const listRef = ref(storage, 'example_profiles/');
    const response = await listAll(listRef);
    const imageUrls = await Promise.all(
      response.items.map(async (item) => {
        const downloadURL = await getDownloadURL(item);
        return downloadURL;
      }),
    );
    return { imageUrls };
  } catch (error) {
    console.error(error);
    return { imageUrls: [] };
  }
};

export const getProfileImg = async () => {
  try {
    const response = await instance.get('/profile-images/');
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
