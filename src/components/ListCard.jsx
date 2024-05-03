import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import ListMessagesData from '../DummyListMessagesData.json';
import ListReactionsData from '../DummyListReactionsData.json';
import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';

const ListCard = ({ data }) => {
  const [isBgImg, setIsBgImg] = useState();

  const [bgColor, setBgColor] = useState('');

  const [ListMessages, setListMessages] = useState([]);
  const [ListReactions, setListReactions] = useState([]);

  const theme = useContext(ThemeContext);

  useEffect(() => {
    setIsBgImg(!!data.backgroundImageURL);
  }, [data.backgroundImageURL]);

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

  useEffect(() => {
    setListMessages(
      [...ListMessagesData].sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    );
  }, [ListMessagesData]);

  useEffect(() => {
    setListReactions(
      [...ListReactionsData].sort(function (a, b) {
        return b.count - a.count;
      }),
    );
  }, [ListReactionsData]);

  if (!bgColor) return;

  return (
    <ListCardWrap
      to={`/post/${data.id}`}
      style={
        isBgImg
          ? { backgroundImage: `url(${data.backgroundImageURL})` }
          : { backgroundColor: bgColor }
      }
    >
      <ListCard Main>
        <ListCardName>To. {data.name}</ListCardName>
        <WriterCountIcon />
        <WriterCountText />
      </ListCard>

      <ReactionCount />
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
  border: 1px solid ${({ theme }) => theme.colors.BLACK};
h
  padding: 30px 24px 20px;

  text-decoration: none;
  color: ${({ theme }) => theme.colors.BLACK};

  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
`;

const ListCardMain = styled.div`
  display: flex;
  flex-direction: column;

  gap: 12px;
  flex-grow: 3;
`;

const ListCardName = styled.span`
  font-size: ${({ theme }) => theme.fontsize.M_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  line-height: 36px;
  letter-spacing: -0.01em;
`;
