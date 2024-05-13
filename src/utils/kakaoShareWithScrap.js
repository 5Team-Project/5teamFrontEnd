const { Kakao } = window;

export const kakaoShareWithScrap = () => {
  Kakao.Share.sendScrap({
    requestUrl: 'https://developers.kakao.com',
  });
};
