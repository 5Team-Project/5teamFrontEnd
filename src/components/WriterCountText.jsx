import styled, { ThemeContext } from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../api/getData';

const WriterCountText = ({ count, isBgImg = false }) => {
  const theme = useContext(ThemeContext);
  const [fontColor, setFontColor] = useState();

  useEffect(() => {
    setFontColor(!isBgImg ? theme.colors.DARKGRAY : theme.colors.WHITE);
  }, []);

  return (
    <WriterCountTextWrapper style={{ color: fontColor }}>
      <span>{count}</span>
      <CountText style={{ color: fontColor }}>명이 작성했어요!</CountText>
    </WriterCountTextWrapper>
  );
};

const WriterCountTextWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  height: 27px;
  line-height: 30px;

  @media ${({ theme }) => theme.device.Tablet} {
    display: none;
  }
`;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default WriterCountText;
