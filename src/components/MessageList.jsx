import styled, { ThemeContext } from 'styled-components';

const formatDate = (value) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}/${month}/${day}`;
};
const MessageListItem = ({ message }) => {
  return (
    <MessageContainter font={message.font}>
      <ProfileContainer>
        <ProfileImgWrap>
          <ProfileImg src={message.profileImageURL} alt="프로필 이미지" />
        </ProfileImgWrap>
        <ProfileTextWrap>
          <p>From.{message.sender}</p>
          <p>{message.relationship}</p>
        </ProfileTextWrap>
      </ProfileContainer>
      <MessageHr />
      <MessageTextContainer>
        <MessageText>{message.content}</MessageText>
        <p>{formatDate(message.createdAt)}</p>
      </MessageTextContainer>
    </MessageContainter>
  );
};
const MessageList = ({ messages }) => {
  const themeContext = useContext(ThemeContext);

  return (
    <MessageListContainter>
      {messages.map((message) => {
        return (
          <li key={message.id}>
            <MessageListItem message={message} />
          </li>
        );
      })}
    </MessageListContainter>
  );
};

export default MessageList;

const MessageListContainter = styled.ul`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-auto-rows: 280px;
  grid-column-gap: 24px;
  grid-row-gap: 28px;
`;

const MessageContainter = styled.div`
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
`;
