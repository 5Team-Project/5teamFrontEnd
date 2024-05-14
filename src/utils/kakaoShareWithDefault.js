const { Kakao } = window;

export const kakaoShareWithDefault = () => {
  Kakao.Share.sendDefault({
    objectType: 'feed',
    content: {
      title: '제목',
      description: '설명',
      imageUrl:
        'https://mud-kage.kakao.com/dn/NTmhS/btqfEUdFAUf/FjKzkZsnoeE4o19klTOVI1/openlink_640x640s.jpg',
      link: {
        mobileWebUrl: 'https://developers.kakao.com',
        webUrl: 'https://developers.kakao.com',
      },
    },
    buttons: [
      {
        title: '제목',
        link: {
          mobileWebUrl: 'https://developers.kakao.com',
          webUrl: 'https://developers.kakao.com',
        },
      },
      // {
      //   title: '앱으로 이동',
      //   link: {
      //     mobileWebUrl: 'https://developers.kakao.com',
      //     webUrl: 'https://developers.kakao.com',
      //   },
      // },
    ],
  });
};
