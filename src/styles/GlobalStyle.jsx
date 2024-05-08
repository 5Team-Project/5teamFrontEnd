import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NanumPenTtf from '../assets/font/NanumPen.ttf';

const GlobalStyle = createGlobalStyle`
  ${reset}

  @font-face {
    font-family: 'NanumMyeongjo';
    src: url(../assets/font/NanumMyeongjo.ttf) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'NanumPen';
    src: url(${NanumPenTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  * {
  box-sizing: border-box;
  font-family: 'Pretendard', 'NanumMyeongjo', 'NanumPen',  sans-serif;
}

  p {
    margin: 0;
  }
  body {
    background-color: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.BLACK : theme.colors.WHITE};
    color: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.WHITE : theme.colors.BLACK};


  }



  button {
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
  }

  input, textarea {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    resize: none;
    font-family: 'Pretendard', 'NanumMyeongjo', 'NanumPen', sans-serif;
  }

  input:focus, textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
