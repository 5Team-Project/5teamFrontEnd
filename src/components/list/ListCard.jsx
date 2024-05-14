import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styled, { ThemeContext } from 'styled-components';

import WriterCountIcon from '../WriterCountIcon';
import WriterCountText from '../WriterCountText';
import ReactionCount from '../ReactionCount';

import ListCardSkeleton from './ListSkeleton';

const ListCard = ({ data }) => {
  const count = data.messageCount;
  const recent = data.recentMessages;
  const reaction = data.topReactions;

  const [isLoading, setIsLoading] = useState(true);
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  const [isBgImg, setIsBgImg] = useState();
  const [bgColor, setBgColor] = useState('');

  const title = data.name.length >= 10 ? data.name : '';

  const COLOR_LIST = [
    { value: '#ffd8a8', name: 'beige' },
    { value: '#f3d9fa', name: 'purple' },
    { value: '#dbe4ff', name: 'blue' },
    { value: '#e9fac8', name: 'green' },
  ];

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  useEffect(() => {
    setIsBgImg(!!data.backgroundImageURL);
  }, [data.backgroundImageURL]);

  useEffect(() => {
    const colorObj = COLOR_LIST.find(
      (item) => item.name === data.backgroundColor,
    );
    if (colorObj) {
      setBgColor(colorObj.value);
    } else {
      setBgColor('#FFE5B4');
    }
  }, [data.backgroundColor]);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageLoaded(true);
  };

  if (isLoading || (isBgImg && !isImageLoaded)) {
    return <ListCardSkeleton />;
  }

  if (!bgColor) return;

  return (
    <ListCardWrap
      to={`/post/${data.id}`}
      style={
        isBgImg
          ? {
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${data.backgroundImageURL})`,
            }
          : { backgroundColor: bgColor }
      }
    >
      {isBgImg && (
        <img
          src={data.backgroundImageURL}
          alt="Background"
          style={{ display: 'none' }}
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      <ListCardMain>
        <ListCardName
          title={title}
          style={isBgImg ? { color: 'white' } : { color: 'black' }}
        >
          To. {data.name}
        </ListCardName>
        <IconWrapper>
          <WriterCountIcon count={count} recent={recent} />
        </IconWrapper>
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

  transition: transform 0.5s ease;

  &:hover {
    transform: scale(1.05);
  }

  @media ${({ theme }) => theme.device.Tablet} {
    width: 245px;
    height: 250px;

    &:hover {
      transform: scale(1);
    }
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
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  line-height: 36px;
  letter-spacing: -0.01em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ListCardLine = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.BLACK}1f;
  padding-bottom: 20px;
`;

const IconWrapper = styled.div`
  transform: translateX(14px);
`;
