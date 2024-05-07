import arrowLeft from '../../assets/icons/arrow_left.svg';
import arrowRight from '../../assets/icons/arrow_right.svg';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListCard from './ListCard';
import useDeviceSize from '../../hooks/useDeviceSize';

const ListRecent = ({ listData, theme }) => {
  const [sortData, setSortData] = useState([]);
  const { deviceSize } = useDeviceSize();

  const isDarkMode = theme !== 'light';

  useEffect(() => {
    if (!listData) return;

    setSortData(
      [...listData].sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    );
  }, [listData]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLength, setCurrentLength] = useState(3);
  const [touchStart, setTouchStart] = useState();

  useEffect(() => {
    switch (deviceSize) {
      case 'desktop':
        setCurrentLength(3);
        break;
      case 'tablet':
        setCurrentLength(2);
        break;
      case 'mobile':
        setCurrentLength(0);
        break;
      default:
        setCurrentLength(3);
    }
  }, [deviceSize]);

  const handlePrev = () => {
    const length = listData.length;
    const newIndex =
      (currentIndex - 1 + length - currentLength) % (length - currentLength);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const length = listData.length;
    const newIndex = (currentIndex + 1) % (length - currentLength);
    setCurrentIndex(newIndex);
  };

  // 터치 슬라이드
  const handleTouchStart = (e) => {
    if (!touchStart) {
      setTouchStart(e.touches[0].clientX);
    }
  };

  const handleTouchMove = (e) => {
    if (touchStart === null) return;

    const touchMoveX = e.touches[0].clientX;
    const touchDeltaX = touchMoveX - touchStart;

    if (touchDeltaX > 50) {
      handlePrev();
      setTouchStart(null);
    } else if (touchDeltaX < -50) {
      handleNext();
      setTouchStart(null);
    }
  };
  const handleTouchEnd = () => {
    setTouchStart(null);
  };

  return (
    <ListRecentWrap>
      <ListRecentSpan>최근에 만든 롤링 페이퍼 ⭐️️</ListRecentSpan>

      <ListCarousel
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ListCarouselSize
          currentIndex={currentIndex}
          sortData={sortData}
          deviceSize={deviceSize}
        />
      </ListCarousel>

      {deviceSize === 'desktop' && (
        <>
          <ListBtnLeft onClick={handlePrev} isDarkMode={isDarkMode}>
            <img src={arrowLeft} alt="왼쪽 화살표" />
          </ListBtnLeft>
          <ListBtnRight onClick={handleNext} isDarkMode={isDarkMode}>
            <img src={arrowRight} alt="오른쪽 화살표" />
          </ListBtnRight>
        </>
      )}
    </ListRecentWrap>
  );
};

const ListCarouselSize = ({ currentIndex, sortData, deviceSize }) => {
  const [itemWidth, setItemWidth] = useState(295);
  useEffect(() => {
    switch (deviceSize) {
      case 'desktop':
        setItemWidth(295);
        break;
      case 'tablet':
        setItemWidth(255);
        break;
      case 'mobile':
        setItemWidth(325);
        break;
      default:
        setItemWidth(295);
    }
  }, [deviceSize]);
  return (
    <ListRecentMain
      style={{
        transform: `translateX(-${currentIndex * itemWidth}px)`,
      }}
    >
      {sortData.map((data) => (
        <ListCard key={data.id} data={data} />
      ))}
    </ListRecentMain>
  );
};

export default ListRecent;

const ListRecentWrap = styled.section`
  margin-top: 40px;
  max-width: 100%;
  position: relative;
  @media ${({ theme }) => theme.device.Tablet} {
    margin-top: 25px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    margin-top: 20px;
  }
`;

const ListRecentSpan = styled.span`
  font-size: ${({ theme }) => theme.fontsize.M_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};

  line-height: 36px;
  letter-spacing: -0.01em;
`;

const ListCarousel = styled.div`
  width: 1180px;
  margin-top: 16px;
  overflow: hidden;
  display: flex;

  @media ${({ theme }) => theme.device.Tablet} {
    margin-top: 8px;
    max-width: 760px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    max-width: 360px;
  }
`;

const ListRecentMain = styled.div`
  display: flex;
  padding: 0 10px;
  gap: 20px;
  transition: transform 0.5s ease;

  @media ${({ theme }) => theme.device.Tablet} {
    gap: 10px;
    padding: 0 2.5px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    gap: 10px;
    margin: 0 20px;
  }
`;

const ListBtnLeft = styled.button`
  position: absolute;
  left: -10px;
  top: 150px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: ${({ theme }) => theme.colors.WHITE}e5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &:disabled {
    display: none;
  }

  img {
    filter: ${({ isDarkMode, theme }) =>
      isDarkMode
        ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
        : 'none'};
  }
`;

const ListBtnRight = styled.button`
  position: absolute;
  right: -10px;
  top: 150px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: ${({ theme }) => theme.colors.WHITE}e5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &:disabled {
    display: none;
  }

  img {
    filter: ${({ isDarkMode, theme }) =>
      isDarkMode
        ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
        : 'none'};
  }
`;
