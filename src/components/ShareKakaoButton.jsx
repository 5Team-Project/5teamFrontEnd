import { useEffect } from 'react';

const { Kakao } = window;

const ShareKakaoButton = () => {
  const publishedUrl = '';
  const localUrl = 'http://localhost:3000/';

  const shareKakao = () => {
    useEffect(() => {
      Kakao.Share.sendDefault({
        objectType: 'feed',
        content: {
          title: 'title',
          description: 'description',
          imageUrl: 'imgUrl',
          link: {
            mobileWebUrl: publishedUrl,
          },
        },
        buttons: [
          {
            title: 'title',
            link: {
              mobileWebUrl: publishedUrl,
            },
          },
        ],
      });
    });
  };

  return (
    <ShareKakaoButton onClick={() => shareKakao()}>
      카카오톡 공유
    </ShareKakaoButton>
  );
};

export default ShareKakaoButton;
