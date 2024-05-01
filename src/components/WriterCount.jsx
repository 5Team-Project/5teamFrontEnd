import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useState } from 'react';
import TestImage from '../assets/images/ProfileForTest.png';

const WriterCount = () => {
  const [messages, setMessages] = useState();

  const queryData = `/6-5/recipients/id/messages/`;
  const handleLoad = async () => {};

  return (
    <WriterCountWrapper>
      <WriterCountBox>
        <ProfileImageBox style={{ left: '0px' }}>
          <ProfileImage src={TestImage} alt="프로필이미지" />
        </ProfileImageBox>
        <ProfileImageBox style={{ left: '14px' }}>
          <ProfileImage src={TestImage} alt="프로필이미지" />
        </ProfileImageBox>
        <ProfileImageBox style={{ left: '28px' }}>
          <ProfileImage src={TestImage} alt="프로필이미지" />
        </ProfileImageBox>
        <CountButton style={{ left: '42px' }}>
          <CountWriter>+99</CountWriter>
        </CountButton>
      </WriterCountBox>
      <WriterCountText>
        <span>102</span>
        <CountText>명이 작성했어요!</CountText>
      </WriterCountText>
    </WriterCountWrapper>
  );
};

const WriterCountWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 11px;
`;

const WriterCountBox = styled.div`
  width: 70px;
  height: 28px;
  display: flex;
  position: relative;
`;

const ProfileImageBox = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
`;

const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border: 1.4px solid ${({ theme }) => theme.colors.WHITE};
  border-radius: 140px;
  object-fit: cover;
`;

const CountButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1.4px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: 140px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  position: absolute;
`;

const CountWriter = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
  font-size: ${({ theme }) => theme.fontsize.MINI_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  text-align: left;
`;

const WriterCountText = styled.div`
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  height: 27px;
  line-height: 30px;
`;

const CountText = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;
export default WriterCount;
