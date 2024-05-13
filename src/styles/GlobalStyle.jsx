import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';
import NanumPenTtf from '../assets/font/NanumPen.ttf';
import NanumMyeongjoTtf from '../assets/font/NanumMyeongjo.ttf';
import BMJUATtf from '../assets/font/BMJUA_ttf.ttf';
import Gmarket from '../assets/font/GmarketSansTTFMedium.ttf';

const GlobalStyle = createGlobalStyle`
  ${reset}
  
  @font-face {
    font-family: 'NanumMyeongjo';
    src: url(${NanumMyeongjoTtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'BMJUATtf';
    src: url(${BMJUATtf}) format('truetype');
    font-weight: normal;
    font-style: normal;
    font-display: block;
  }

  @font-face {
    font-family: 'Gmarket';
    src: url(${Gmarket}) format('truetype');
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
  font-family: 'Pretendard', 'BMJUATtf', 'NanumMyeongjo', 'NanumPen',  sans-serif;
}

  p {
    margin: 0;
  }

  html{
    font-family: 'BMJUATtf','Pretendard', 'NanumMyeongjo', 'NanumPen',  sans-serif;
  }


  body {
    background-color: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.BLACK : theme.colors.WHITE};
    color: ${({ theme }) =>
      theme.mode === 'dark' ? theme.colors.WHITE : theme.colors.BLACK};
    font-family: 'BMJUATtf', 'Pretendard', 'NanumMyeongjo', 'NanumPen',  sans-serif;

  }

  button {
    padding: 0;
    margin: 0;
    border: none;
    cursor: pointer;
    background-color: transparent;
    font-family: 'BMJUATtf', 'Pretendard', 'NanumMyeongjo', 'NanumPen',  sans-serif;
  }

  input, textarea {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    border: none;
    background-color: transparent;
    font-family: 'BMJUATtf', 'Pretendard', 'NanumMyeongjo', 'NanumPen',  sans-serif;
    resize: none;
  }

  input:focus, textarea:focus {
    outline: none;
  }
`;

export default GlobalStyle;
