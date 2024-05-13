import styled, { ThemeContext } from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { getData } from '../api/getData';
import { useLocation } from 'react-router-dom';

const WriterCountText = ({ count, isBgImg = false }) => {
  const location = useLocation().pathname;
  const isListPage = location === '/list';

  const theme = useContext(ThemeContext);
  const [fontColor, setFontColor] = useState();

  useEffect(() => {
    setFontColor(!isBgImg ? '#484848' : '#fff');
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
`;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default WriterCountText;
