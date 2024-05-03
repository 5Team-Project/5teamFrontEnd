import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React from 'react';
import TestImage from '../assets/images/ProfileForTest.png';

const WriterCountIcon = ({ count, recent }) => {
  return (
    <WriterCountIconWrapper>
      {recent.map((profile) => {
        return (
          <ProfileImageBox key={profile.id}>
            <ProfileImage src={profile.profileImageURL} alt="profile" />
          </ProfileImageBox>
        );
      })}
      <CountButton style={count <= 3 ? { display: 'none' } : { left: '42px' }}>
        <CountWriter>{count <= 3 ? `` : `+${count - 3}`}</CountWriter>
      </CountButton>
    </WriterCountIconWrapper>
  );
};

const WriterCountIconWrapper = styled.div`
  width: 70px;
  height: 28px;
  display: flex;
  position: relative;
  margin-right: 14px;

  @media ${({ theme }) => theme.device.Tablet} {
    display: none;
  }
`;

const ProfileImageBox = styled.div`
  width: 28px;
  height: 28px;
  position: absolute;
  &:nth-child(2) {
    left: 14px;
  }
  &:nth-child(3) {
    left: 28px;
  }
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

export default WriterCountIcon;
