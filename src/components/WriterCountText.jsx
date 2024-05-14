import styled, { ThemeContext } from 'styled-components';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const WriterCountText = ({ count, isBgImg = false }) => {
  const theme = useContext(ThemeContext);
  const [fontColor, setFontColor] = useState();
  const isListPage = useLocation().pathname;

  useEffect(() => {
    '/list' !== isListPage
      ? setFontColor(null)
      : setFontColor(!isBgImg ? '#484848' : '#fff');
  }, []);

  if (count > 0) {
    return (
      <WriterCountTextWrapper>
        <CountText style={{ color: fontColor }}>
          {count}명이 작성했어요!
        </CountText>
      </WriterCountTextWrapper>
    );
  } else {
    return (
      <WriterCountTextWrapper>
        <CountText style={{ color: fontColor }}>
          첫번째 편지를 작성해보세요!
        </CountText>
      </WriterCountTextWrapper>
    );
  }
};

const WriterCountTextWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  width: 100%;
  height: 27px;
  white-space: nowrap;

  display: flex;
  align-items: center;
`;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default WriterCountText;
