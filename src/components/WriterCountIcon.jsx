import styled from 'styled-components';
import React from 'react';

const WriterCountIcon = ({ count, recent }) => {
  return (
    <WriterCountIconWrapper>
      {recent &&
        recent.map((profile) => {
          return (
            <ProfileImageWrapper key={profile.id}>
              <ProfileImageBox>
                <ProfileImage src={profile.profileImageURL} alt="profile" />
              </ProfileImageBox>
            </ProfileImageWrapper>
          );
        })}
      {count >= 4 && (
        <CountButtonBox>
          <CountButton>
            <CountWriter>{count <= 3 ? `` : `+${count - 3}`}</CountWriter>
          </CountButton>
        </CountButtonBox>
      )}
    </WriterCountIconWrapper>
  );
};

const WriterCountIconWrapper = styled.div`
  width: 100%;
  height: 28px;
  display: flex;
`;

const ProfileImageWrapper = styled.div`
  width: 14px;
  overflow: visible;
`;

const ProfileImageBox = styled.div`
  width: 28px;
  height: 28px;
  display: flex;
  justify-content: flex-end;
  transform: translateX(-50%);
`;

const ProfileImage = styled.img`
  width: 28px;
  height: auto;
  border: 1.4px solid ${({ theme }) => theme.colors.WHITE};
  border-radius: 140px;
  object-fit: cover;
`;

const CountButtonBox = styled.div`
  width: 14px;
`;

const CountButton = styled.button`
  width: 28px;
  height: 28px;
  border: 1.4px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: 140px;
  background-color: ${({ theme }) => theme.colors.WHITE};
  transform: translateX(-50%);
`;

const CountWriter = styled.span`
  color: ${({ theme }) => theme.colors.DARKGRAY};
  font-size: ${({ theme }) => theme.fontsize.MINI_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  text-align: left;
`;

export default WriterCountIcon;
