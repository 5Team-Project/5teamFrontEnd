import styled, { ThemeContext } from 'styled-components';
import { useContext, useState } from 'react';
import { formatDate } from '../../utils/formatDate';
import MessageModal from './MessageModal';

const RELATIONSHIPS = {
  가족: 'GREEN',
  동료: 'PURPLE',
  친구: 'BLUE',
  지인: 'ORANGE',
};

const MessageListItem = ({ message }) => {
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
      </ProfileContainer>
      <MessageHr />
      <MessageTextContainer>
        <MessageText>{message.content}</MessageText>
        <p>{formatDate(message.createdAt)}</p>
      </MessageTextContainer>
    </MessageContainer>
  );
};
const MessageList = ({ messages }) => {
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
      <MessageModal
        message={modalData}
        isModalOpen={isModalOpen}
        closeModal={closeModal}
      />
      <MessageListContainer>
        {messages.map((message) => {
          return (
            <li key={message.id} onClick={() => handleMessageClick(message)}>
              <MessageListItem message={message} />
            </li>
          );
        })}
      </MessageListContainer>
    </>
  );
};

export default MessageList;

const MessageListContainer = styled.ul`
  width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  grid-column-gap: 24px;
  grid-row-gap: 28px;
`;

const MessageContainer = styled.div`
  background-color: WHITE;
  width: 384px;
  height: 280px;
  border-radius: 16px;
  padding: 28px 24px 24px 24px;
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
  width: 41px;
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
  height: 106px;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;
