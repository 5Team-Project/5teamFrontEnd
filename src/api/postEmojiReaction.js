import { instance } from './Axios';

export const postEmojiReactions = async (reactionData, recipientId) => {
  const pathname = `6-5/recipients/${recipientId}/reactions/`;
  try {
    const res = await instance.post(pathname, JSON.stringify(reactionData));
    return res.data;
  } catch (e) {
    console.error('전송실패', e);
  }
};
