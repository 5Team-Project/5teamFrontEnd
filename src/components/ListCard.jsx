import { getData } from '../api/getData';

import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';

const ListCard = ({ data }) => {
  const theme = useContext(ThemeContext);

  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const [reaction, setReaction] = useState([]);

  useEffect(() => {
    const handleLoad = async () => {
      const queryData = `/6-5/recipients/${data.id}/`;
      try {
        const res = await getData(queryData);
        setCount(res.messageCount);
        setRecent(res.recentMessages);
        setReaction(res.topReactions);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoad();
  }, []);

  const [isBgImg, setIsBgImg] = useState();

  const [bgColor, setBgColor] = useState('');
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
      <ListCardMain>
        <ListCardName>To. {data.name}</ListCardName>
        <WriterCountIcon count={count} recent={recent} />
        <WriterCountText count={count} isBgImg={isBgImg} />
      </ListCardMain>
      <ReactionCount reaction={reaction} />
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
  border: 1px solid ${({ theme }) => theme.colors.BLACK}1a;

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
