import styled, { ThemeContext } from 'styled-components';
import React, { useContext } from 'react';
import { formatDate } from '../../utils/formatDate';
import { mapFontName } from '../../utils/mapFont';

const MakeModalContent = ({ message }) => {
  const theme = useContext(ThemeContext);
  return (
    <ModalContentWrapper>
      <ModalHeader>
        <ProfileBox>
          <ProfileImageBox>
            <ProfileImage src={message.profileImageURL} alt="프로필 이미지" />
          </ProfileImageBox>
          <SenderBox>
            <SenderFrom>
              <span>From.</span>
              <SenderName> {message.sender}</SenderName>
            </SenderFrom>
            <SenderBadge relation={message.relationship}>
              {message.relationship}
            </SenderBadge>
          </SenderBox>
        </ProfileBox>
        <CreatedAt>{formatDate(message.createdAt)}</CreatedAt>
      </ModalHeader>
      <MessageBox
        message={message}
        dangerouslySetInnerHTML={{ __html: message.content }}
      />
    </ModalContentWrapper>
  );
};

const MessageModal = ({ message, isModalOpen, closeModal }) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      {isModalOpen && (
        <MyModalBG onClick={closeModal}>
          <MyModal onClick={(e) => e.stopPropagation()}>
            <MakeModalContent message={message} />
            <ModalCloseButton onClick={closeModal}>확인</ModalCloseButton>
          </MyModal>
        </MyModalBG>
      )}
    </>
  );
};

const ModalContentWrapper = styled.div``;

const ModalHeader = styled.div`
  width: 520px;
  height: 56px;
  margin-bottom: 20px;

  display: flex;
  align-items: center;
  justify-content: space-between;
  @media ${({ theme }) => theme.device.Mobile} {
    width: 325px;
  }
`;
const ProfileBox = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const ProfileImageBox = styled.div`
  width: 56px;
  height: 56px;
`;
const ProfileImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 140px;
  object-fit: cover;
`;
const SenderBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
const SenderFrom = styled.div`
  font-size: ${({ theme }) => theme.fontsize.S_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
`;
const SenderName = styled.span`
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
`;
const SenderBadge = styled.div`
  width: 45px;
  height: 20px;
  text-align: center;
  border-radius: 4px;
  padding: 0px 8px;
  line-height: 150%;
  color: ${({ theme }) => theme.colors.WHITE};
  background-color: ${({ relation, theme }) =>
    theme.colors[RELATIONSHIPS[relation]] ??
    theme.colors[RELATIONSHIPS['지인']]};
  font-size: ${({ theme }) => theme.fontsize.SMALL_TXT};
`;
const RELATIONSHIPS = {
  가족: 'GREEN',
  동료: 'VIOLET',
  친구: 'BLUE',
  지인: 'ORANGE',
};
const CreatedAt = styled.div`
  font-size: ${({ theme }) => theme.fontsize.SMALL_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.GRAY};
`;
const MessageBox = styled.div`
  width: 520px;
  height: 260px;
  padding: 16px 20px 0 0;
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY};
  overflow-y: auto;
  font-family: ${({ message }) => mapFontName(message.font)};

  &::-webkit-scrollbar {
    width: 2px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.GRAY};
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background-color: transparent;
  }

  scrollbar-width: thin;
  scrollbar-color: ${({ theme }) => theme.colors.GRAY} transparent;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 325px;
  }
`;

const MyModalBG = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
`;

const MyModal = styled.div`
  width: 600px;
  height: 480px;
  padding: 40px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.WHITE};

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  gap: 0;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 375px;
    padding: 25px;
  }
`;

const ModalCloseButton = styled.button`
  width: 120px;
  height: 40px;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  margin-top: 26px;

  background-color: ${({ theme }) => theme.colors.PURPLE};

  &:hover {
    background-color: ${({ theme }) => theme.colors.BLUE};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.RED};
  }
`;
export default MessageModal;
