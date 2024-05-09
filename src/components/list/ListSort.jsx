import arrowLeft from '../../assets/icons/arrow_left.svg';
import arrowRight from '../../assets/icons/arrow_right.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useDeviceSize from '../../hooks/useDeviceSize';
import { getData } from '../../api/getData';
import ListCard from './ListCard';

const ListSort = ({ sort, theme }) => {
  const [listData, setListData] = useState([]);
  const [path, setPath] = useState(null);
  const [nextPath, setNextPath] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { deviceSize } = useDeviceSize();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentLength, setCurrentLength] = useState(3);
  const [itemWidth, setItemWidth] = useState(295);

  const [touchStart, setTouchStart] = useState();

  const isDarkMode = theme !== 'light';

  useEffect(() => {
    const handleLoad = async () => {
      const commonPath = '/6-5/recipients/?limit=6';
      setPath(sort === 'like' ? `${commonPath}&sort=like` : `${commonPath}`);

      try {
        if (path === null) return;
        const res = await getData(path);

        setNextPath(res.next);
        setListData(res.results);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoad();
  }, [path]);

  // 다음 리스트 불러오기
  useEffect(() => {
    const addListData = async () => {
      if (!isLoading) return;

      try {
        if (nextPath === null) return;

        const res = await getData(nextPath);

        const newData = res.results;
        setNextPath(res.next);
        setListData([...listData, ...newData]);
      } catch (e) {
        console.error(e);
      }
      setIsLoading(false);
    };
    addListData();
  }, [isLoading]);

  // 사이즈에 따라서 리스트 이동 반경 제한
  useEffect(() => {
    switch (deviceSize) {
      case 'desktop':
        setCurrentLength(3);
        setItemWidth(295);
        break;
      case 'tablet':
        setCurrentLength(2);
        setItemWidth(255);
        break;
      case 'mobile':
        setCurrentLength(0);
        setItemWidth(325);
        break;
      default:
        setCurrentLength(3);
        setItemWidth(295);
    }
  }, [deviceSize]);

  const handlePrev = () => {
    const length = listData.length;
    const newIndex =
      (currentIndex - 1 + length - currentLength) % (length - currentLength);
    setCurrentIndex(newIndex);

    if (newIndex <= Math.floor(length / 2 - 1)) {
      setIsLoading(true);
    }
  };

  const handleNext = () => {
    const length = listData.length;
    const newIndex = (currentIndex + 1) % (length - currentLength);
    setCurrentIndex(newIndex);

    if (newIndex >= Math.floor(length / 2 - 1)) {
      setIsLoading(true);
    }
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
    <ListSortWrap>
      <ListSortSpan>
        {sort !== 'like'
          ? '최근에 만든 롤링 페이퍼 ⭐️️'
          : '인기 롤링 페이퍼 🔥'}
      </ListSortSpan>

      <ListCarousel
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <ListCarouselSize
          currentIndex={currentIndex}
          listData={listData}
          itemWidth={itemWidth}
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
    </ListSortWrap>
  );
};

const ListCarouselSize = ({ currentIndex, listData, itemWidth }) => {
  return (
    <ListSortMain
      style={{
        transform: `translateX(-${currentIndex * itemWidth}px)`,
      }}
    >
      {listData.map((data) => (
        <ListCard key={data.id} data={data} />
      ))}
    </ListSortMain>
  );
};

export default ListSort;

const ListSortWrap = styled.section`
  margin-top: 40px;
  max-width: 100%;
  position: relative;
  @media ${({ theme }) => theme.device.Mobile} {
    margin-top: 20px;
  }
`;

const ListSortSpan = styled.span`
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

const ListSortMain = styled.div`
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
