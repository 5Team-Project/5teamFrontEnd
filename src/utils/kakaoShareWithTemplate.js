const { Kakao } = window;

export const kakaoShareWithtemplate = () => {
  Kakao.Share.sendCustom({
    templateId: 107793,
    templateArgs: {
      title: '제목 영역입니다.',
      description: '설명 영역입니다.',
    },
  });
};
