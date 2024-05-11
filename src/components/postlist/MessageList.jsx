import React, { useContext, useState } from 'react';
import PlusIcon from '../../assets/icons/ic_plus.svg';
import styled, { ThemeContext } from 'styled-components';
import { formatDate } from '../../utils/formatDate';
import MessageModal from './MessageModal';
import { mapFontName } from '../../utils/mapFont';
import { Link } from 'react-router-dom';
import DeleteButton from '../../assets/icons/IconDelete.svg';

const RELATIONSHIPS = {
  가족: 'GREEN',
  동료: 'PURPLE',
  친구: 'BLUE',
  지인: 'ORANGE',
};

const MessageListItem = ({ message, showDeleteButton }) => {
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
          <DeleteMessageButton>
            <Icons src={DeleteButton} alt="삭제" />
          </DeleteMessageButton>
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
const MessageList = ({ messages, recipientId, showDeleteButton }) => {
  const themeContext = useContext(ThemeContext);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleMessageClick = (data) => {
    setIsModalOpen(true);
    setModalData(data);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setModalData({});
  };

  return (
    <>
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
  font:;
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
