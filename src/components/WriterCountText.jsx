import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useState } from 'react';

const WriterCountText = () => {
  return (
    <WriterCountTextWrapper>
      <span>102</span>
      <CountText>명이 작성했어요!</CountText>
    </WriterCountTextWrapper>
  );
};

const WriterCountTextWrapper = styled.div`
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  height: 27px;
  line-height: 30px;
`;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default WriterCountText;
