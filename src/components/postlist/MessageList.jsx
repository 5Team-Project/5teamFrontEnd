import React, { useContext, useEffect, useState } from 'react';
import PlusIcon from '../../assets/icons/ic_plus.svg';
import styled, { ThemeContext } from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import MessageModal from './MessageModal';
import { mapFontName } from '../../utils/mapFont';
import { Link, useNavigate } from 'react-router-dom';
import DeleteButton from '../../assets/icons/IconDelete.svg';
import { deleteMessage } from '../../api/deleteMessage';
import { deletePaper } from '../../api/deletePaper';
import ConfirmModal from './ConfirmModal';

const RELATIONSHIPS = {
  가족: 'GREEN',
  동료: 'PURPLE',
  친구: 'BLUE',
  지인: 'ORANGE',
};

const MessageListItem = ({
  message,
  showDeleteButton,
  updateRecipientData,
  updateMessageData,
}) => {
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [messageIdToDelete, setMessageIdToDelete] = useState('');

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    setMessageIdToDelete(message.id);
  };
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setMessageIdToDelete('');
  };

  const handleDeleteMessage = async () => {
    try {
      const res = await deleteMessage(`${messageIdToDelete}`);
      if (res) {
        console.log('Message deleted successfully!');
        updateRecipientData();
        updateMessageData();
        closeConfirmModal();
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <MessageContainer>
      <ProfileContainer>
        <ProfileImgWrap>
          <ProfileImg src={message.profileImageURL} alt="프로필 이미지" />
        </ProfileImgWrap>
        <ProfileTextWrap>
          <p>
            From. <SenderName>{message.sender}</SenderName>
          </p>
          <ProfileRelation relation={message.relationship}>
            {message.relationship}
          </ProfileRelation>
        </ProfileTextWrap>
        {showDeleteButton && (
          <>
            <DeleteMessageButton onClick={openConfirmModal} type="button">
              <Icons src={DeleteButton} alt="메세지삭제" />
            </DeleteMessageButton>
            <ConfirmModal
              isConfirmModalOpen={isConfirmModalOpen}
              closeConfirmModal={closeConfirmModal}
              handleDelete={handleDeleteMessage}
            />
          </>
        )}
      </ProfileContainer>
      <MessageHr />
      <MessageTextContainer>
        <MessageText
          dangerouslySetInnerHTML={{ __html: message.content }}
          style={{ fontFamily: mapFontName(message.font) }}
        />{' '}
        <p>{formatDate(message.createdAt)}</p>
      </MessageTextContainer>
    </MessageContainer>
  );
};
const MessageList = ({
  theme,
  messages,
  recipientId,
  showDeleteButton,
  updateRecipientData,
  updateMessageData,
}) => {
  const isDarkMode = theme !== 'light';
  const themeContext = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const navigate = useNavigate();
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [paperIdToDelete, setPaperIdToDelete] = useState('');

  const handleMessageClick = (data) => {
    if (!showDeleteButton) {
      setIsModalOpen(true);
      setModalData(data);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  const openConfirmModal = () => {
    setIsConfirmModalOpen(true);
    setPaperIdToDelete(recipientId);
  };
  const closeConfirmModal = () => {
    setIsConfirmModalOpen(false);
    setPaperIdToDelete('');
  };

  const handleDeletePaper = async () => {
    try {
      const res = await deletePaper(`${paperIdToDelete}`);
      if (res) {
        navigate('/list');
        console.log('Paper deleted successfully!');
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      {showDeleteButton && (
        <>
          <MessageEditHeader>
            <DeletePaperButton type="button" onClick={openConfirmModal}>
              <Icons
                src={DeleteButton}
                alt="페이퍼삭제"
                isDarkMode={isDarkMode}
              />
              <ButtonLabel>페이퍼 삭제</ButtonLabel>
            </DeletePaperButton>
          </MessageEditHeader>
          {isConfirmModalOpen && (
            <ConfirmModal
              isConfirmModalOpen={isConfirmModalOpen}
              closeConfirmModal={closeConfirmModal}
              handleDelete={handleDeletePaper}
            />
          )}
        </>
      )}
      <MessageModal
        message={modalData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <MessageListContainer>
        <AddMessageContainer>
          <MessageAddButton>
            <Link to={`/post/${recipientId}/message`}>
              <Icon src={PlusIcon} alt="메세지 추가" />
            </Link>
          </MessageAddButton>
        </AddMessageContainer>
        {messages &&
          messages.map((message) => {
            return (
              <li key={message.id} onClick={() => handleMessageClick(message)}>
                <MessageListItem
                  message={message}
                  showDeleteButton={showDeleteButton}
                  updateRecipientData={updateRecipientData}
                  updateMessageData={updateMessageData}
                />
              </li>
            );
          })}
      </MessageListContainer>
    </>
  );
};

export default MessageList;

const MessageListContainer = styled.ul`
  margin: 0 auto;
  padding-top: 64px;
  padding-bottom: 64px;
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  grid-column-gap: 24px;
  grid-row-gap: 28px;
`;
const MessageContainer = styled.div`
  background-color: ${({ theme }) => theme.colors.WHITE};
  width: 384px;
  height: 280px;
  border-radius: 16px;
  padding: 28px 24px 24px 24px;
  position: relative;
`;
const AddMessageContainer = styled(MessageContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Icon = styled.img`
  height: 24px;
  width: 24px;
`;
const MessageAddButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.DARKGRAY};
  ${Icon} {
    width: 1.5rem;
    height: 1.5rem;
  }
`;

const ProfileContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 24px;
`;
const ProfileImgWrap = styled.div`
  width: 56px;
  height: 56px;
  border-radius: 50%;
  overflow: hidden;
`;
const ProfileImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
const ProfileTextWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  font-size: ${({ theme }) => theme.fontsize.S_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;
const SenderName = styled.span`
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
`;
const ProfileRelation = styled.div`
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
const MessageHr = styled.hr`
  color: #eeeeee;
  width: 100%;
  margin: 16px 0;
`;
const MessageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
`;
const MessageText = styled.div`
  height: 104px;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-height: 20px;
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;

const DeleteMessageButton = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  position: absolute;
  top: 28px;
  right: 32px;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
  }
`;

const Icons = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ isDarkMode, theme }) =>
    isDarkMode
      ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
      : 'none'};
  @media ${({ theme }) => theme.device.Mobile} {
    width: 24px;
    height: 24px;
  }
`;

const MessageEditHeader = styled.div`
  max-width: 1200px;
  width: 100%;
  height: 0;
  margin: 0 auto;
  padding: 0;
  text-decoration: none;
  position: relative;

  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const DeletePaperButton = styled.div`
  height: 39px;
  padding: 0 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;

  position: absolute;
  top: 10px;

  background-color: ${({ theme }) => theme.colors.PURPLE};
  color: ${({ theme }) => theme.colors.DARKGRAY};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  z-index: 1;

  border-radius: 8px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_DD};
  }
  @media ${({ theme }) => theme.device.Tablet} {
    position: fixed;
    max-width: 1200px;
    width: 90%;
    height: 55px;
    font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};

    top: 90vh;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const ButtonLabel = styled.p`
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
`;
