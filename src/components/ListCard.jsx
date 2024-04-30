import { useEffect, useState } from 'react';
import styled from 'styled-components';

const ListCard = ({ data }) => {
  const [bgColor, setBgColor] = useState('');

  useEffect(() => {
    switch (data.backgroundColor) {
      case 'beige':
        setBgColor('beige');
        break;
      case 'purple':
        setBgColor('purple');
        break;
      case 'blue':
        setBgColor('blue');
        break;
      case 'green':
        setBgColor('green');
        break;
      default:
        setBgColor('beige');
    }
  }, []);

  if (!bgColor) return;

  return (
    <ListCardWrap style={{ backgroundColor: bgColor }}>
      <ListCardMain>
        <ListCardName>To. {data.name}</ListCardName>
        <ListCardSenders>이미지</ListCardSenders>
        <ListCardMsgCount>{data.messageCount}명이 작성했어요</ListCardMsgCount>
      </ListCardMain>
      <ListCardEmojiWrap>
        <ListCardEmoji>이모지1</ListCardEmoji>
        <ListCardEmoji>이모지2</ListCardEmoji>
        <ListCardEmoji>이모지3</ListCardEmoji>
      </ListCardEmojiWrap>
    </ListCardWrap>
  );
};

export default ListCard;

const ListCardWrap = styled.div`
  width: 275px;
  height: 260px;
  border-radius: 16px;
  border: 1px solid #0000001a;
`;

const ListCardMain = styled.div``;

const ListCardName = styled.span``;

const ListCardSenders = styled.div``;

const ListCardMsgCount = styled.span``;

const ListCardEmojiWrap = styled.div``;

const ListCardEmoji = styled.div``;
