import { useEffect } from 'react';

const { Kakao } = window;

// function loginWithKakao() {
//   Kakao.Auth.authorize({
//     redirectUri: 'https://developers.kakao.com/tool/demo/oauth',
//   });
// }

// function displayToken() {
//   var token = getCookie('authorize-access-token');

//   if (token) {
//     Kakao.Auth.setAccessToken(token);
//     Kakao.Auth.getStatusInfo()
//       .then(function (res) {
//         if (res.status === 'connected') {
//           document.getElementById('token-result').innerText =
//             'login success, token: ' + Kakao.Auth.getAccessToken();
//         }
//       })
//       .catch(function (err) {
//         Kakao.Auth.setAccessToken(null);
//       });
//   }
// }

const ShareKakaoButton = () => {
  const publishedUrl = 'https://5team-front-end.vercel.app/';
  const localUrl = 'http://localhost:3000/';

  const handleClickShare = () => {
    window.open(
      'www.naver.com',
      'Kakao Login',
      'width=400, height= 300, top=10, left=10',
    );
    // };
    // useEffect(() => {
    //   if (!Kakao.isInitialized()) {
    //     Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    //     console.log(Kakao.isInitialized());
    //   }
    // }, []);

    // displayToken();

    // function getCookie(name) {
    //   var parts = document.cookie.split(name + '=');
    //   if (parts.length === 2) {
    //     return parts[1].split(';')[0];
    //   }
    // }

    return (
      <ShareKakaoButton onClick={handleClickShare}>
        카카오톡 공유
      </ShareKakaoButton>
    );
  };
};

export default ShareKakaoButton;
