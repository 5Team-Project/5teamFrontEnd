import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

const ListCard = ({ data }) => {
  const [bgColor, setBgColor] = useState('');

  const theme = useContext(ThemeContext);

  useEffect(() => {
    switch (data.backgroundColor) {
      case 'beige':
        setBgColor(theme.colors.ORANGE);
        break;
      case 'purple':
        setBgColor(theme.colors.PURPLE);
        break;
      case 'blue':
        setBgColor(theme.colors.BLUE);
        break;
      case 'green':
        setBgColor(theme.colors.GREEN);
        break;
      default:
        setBgColor(theme.colors.ORANGE);
    }
  }, [data.backgroundColor]);

  if (!bgColor) return;

  return (
    <ListCardWrap to={`/post${data.id}`} style={{ backgroundColor: bgColor }}>
      <ListCardMain>
        <ListCardName>To. {data.name}</ListCardName>
        <ListCardSenders>이미지</ListCardSenders>
        <ListCardMsgCount>{data.messageCount}명이 작성했어요</ListCardMsgCount>
      </ListCardMain>

      <ListCardEmojiWrap>
        <ListCardEmoji>👍10</ListCardEmoji>
        <ListCardEmoji>✌️2</ListCardEmoji>
        <ListCardEmoji>😊3</ListCardEmoji>
      </ListCardEmojiWrap>
    </ListCardWrap>
  );
};

export default ListCard;

const ListCardWrap = styled(Link)`
  display: flex;
  flex-direction: column;

  text-align: start;
  width: 275px;
  height: 260px;

  border-radius: 16px;
  border: 1px solid #0000001a;

  padding: 30px 24px 20px;

  text-decoration: none;
  color: #000;
`;

const ListCardMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
  flex-grow: 3;
`;

const ListCardName = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.01em;
`;

const ListCardSenders = styled.div``;

const ListCardMsgCount = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 26px;
  letter-spacing: -0.01em;
`;

const ListCardEmojiWrap = styled.div`
  padding-top: 20px;
  border-top: 1px solid #0000001f;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const ListCardEmoji = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2px;

  padding: 8px 12px;
  border-radius: 32px;

  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  color: #fff;

  background: #0000008a;
`;
