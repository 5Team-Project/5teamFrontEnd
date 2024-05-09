import { getData } from '../../api/getData';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';
import WriterCountIcon from '../WriterCountIcon';
import WriterCountText from '../WriterCountText';
import ReactionCount from '../ReactionCount';
import ListCardSkeleton from './ListSkeleton';

const ListCard = ({ data }) => {
  const theme = useContext(ThemeContext);
  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const [reaction, setReaction] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLoad = async () => {
      const queryData = `/6-5/recipients/${data.id}/`;
      try {
        const res = await getData(queryData);
        setCount(res.messageCount);
        setRecent(res.recentMessages);
        setReaction(res.topReactions);

        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      } catch (e) {
        console.error(e);
        setIsLoading(false);
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

  if (isLoading) {
    return <ListCardSkeleton />;
  }

  if (!bgColor) return;

  return (
    <ListCardWrap
      to={`/post/${data.id}`}
      style={
        isBgImg
          ? {
              backgroundImage: `linear-gradient( rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3) ),url(${data.backgroundImageURL})`,
            }
          : { backgroundColor: bgColor }
      }
    >
      <ListCardMain>
        <ListCardName
          style={
            isBgImg
              ? {
                  color: 'white',
                }
              : { color: `black` }
          }
        >
          To. {data.name}
        </ListCardName>
        <WriterCountIcon count={count} recent={recent} />
        <WriterCountText count={count} isBgImg={isBgImg} />
      </ListCardMain>
      {!!reaction.length && <ListCardLine />}
      <ReactionCount topReactions={reaction} />
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

  @media ${({ theme }) => theme.device.Tablet} {
    width: 245px;
    height: 250px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    width: 315px;
    height: 300px;
  }
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

const ListCardLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.BLACK}1f;
  padding-bottom: 20px;
`;
