import arrowLeft from '../../assets/icons/arrow_left.svg';
import arrowRight from '../../assets/icons/arrow_right.svg';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import useDeviceSize from '../../hooks/useDeviceSize';
import { getData } from '../../api/getData';
import ListCard from './ListCard';
import { filter } from 'lodash';

const ListSort = ({ sort, theme }) => {
  const [listData, setListData] = useState([]);
  const [lastData, setLastData] = useState([]);
  const [slideData, setSlideData] = useState([]);

  const [path, setPath] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [prevPath, setPrevPath] = useState(null);

  const [isLoading, setIsLoading] = useState(false);

  const { deviceSize } = useDeviceSize();

  const [currentIndex, setCurrentIndex] = useState(6);
  const [currentLength, setCurrentLength] = useState(3);
  const [itemWidth, setItemWidth] = useState(295);

  const [touchStart, setTouchStart] = useState();

  const isDarkMode = theme !== 'light';

  const [dataLength, setDataLength] = useState(0);
  const [offset, setOffset] = useState(0);

  const [isUpdate, setIsUpdate] = useState(true);

  const [isAnimate, setIsAnimate] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const limit = 6;

  useEffect(() => {
    if (listData.length > 0) return;

    // 처음 데이터 6개 받아오기
    const handleLoadFirst = async () => {
      const commonPath = `/6-5/recipients/?limit=${limit}`;
      setPath(sort === 'like' ? `${commonPath}&sort=like` : `${commonPath}`);

      try {
        if (path === null) return;
        // console.log('처음데이터');
        const res = await getData(path);

        setDataLength(res.count);
        setOffset(res.count - limit);
        setNextPath(res.next);
        setListData(res.results);
      } catch (e) {
        console.error(e);
      }
    };

    handleLoadFirst();
  }, [path]);

  // 마지막 데이터 6개 받아오기
  useEffect(() => {
    if (offset <= 0 || lastData.length > 0) return;

    if (dataLength < 12) return;

    const handleLoadLast = async () => {
      const commonPath = `/6-5/recipients/?limit=${limit}`;
      const lastPath =
        sort === 'like'
          ? `${commonPath}&offset=${offset}&sort=like`
          : `${commonPath}&offset=${offset}`;

      try {
        if (path === null) return;
        const res = await getData(lastPath);

        // console.log('마지막데이터', res);

        setPrevPath(res.previous);
        setLastData(res.results);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoadLast();
  }, [offset]);

  // 처음 데이터 마지막 데이터 합치기
  useEffect(() => {
    if (lastData.length <= 0 || listData.length <= 0) return;
    setSlideData([...lastData, ...listData]);
  }, [lastData, listData]);

  // 마지막 데이터를 한번 더 안불러오게 nextPath의 limit을 설정
  useEffect(() => {
    if (offset <= 0) return;

    const handleOffsetCheck = () => {
      if (offset - limit < limit) {
        if (nextPath !== null) {
          setNextPath(
            nextPath.replace(`limit=${limit}`, `limit=${offset - limit}`),
          );
        }

        if (prevPath !== null) {
          setPrevPath(
            prevPath.replace(
              `limit=${limit}&offset=${offset - limit}`,
              `limit=${offset - limit}&offset=${offset - (offset - limit)}`,
            ),
          );
        }

        if (offset - limit <= 0) {
          setNextPath(null);
          setPrevPath(null);
        }

        return;
      }
    };

    handleOffsetCheck();
  }, [offset]);

  // 다음 리스트 불러오기
  useEffect(() => {
    const HandleAddListData = async () => {
      if (!isLoading) return;

      if (isNext) {
        try {
          if (nextPath === null) return;

          const res = await getData(nextPath);

          // console.log('다음데이터', res);

          const newData = res.results;

          setNextPath(res.next);

          if (offset - limit > 0) setOffset(offset - limit);

          setListData([...listData, ...newData]);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          if (prevPath === null) return;

          const res = await getData(prevPath);

          // console.log('이전데이터', res);

          const newData = res.results;

          setPrevPath(res.previous);

          if (offset - limit > 0) setOffset(offset - limit);

          const setLists = [
            ...listData.slice(0, 6),
            ...newData,
            ...listData.slice(6),
          ];

          setListData(setLists);
        } catch (e) {
          console.error(e);
        }
      }

      setIsLoading(false);
    };

    HandleAddListData();
  }, [isLoading]);

  // SlideData 업데이트
  useEffect(() => {
    if (nextPath === null) return;
    if (isUpdate) {
      // console.log('업데이트');
      setSlideData([...lastData, ...listData]);
      setIsUpdate(false);
    }
  }, [isUpdate, listData]);

  // 캐러셀 이동 시 SlideData 순서 변경
  const SlideChange = (num) => {
    console.log('num ', num, ' isNext ', isNext);
    if (slideData[0] === listData[0]) {
      if (isNext) {
        setSlideData([...lastData, ...listData]);
        setCurrentIndex(2);
      } else {
        setSlideData([...lastData, ...listData]);
        setCurrentIndex(6);
      }
    } else {
      if (isNext) {
        setSlideData([...listData, ...lastData]);
        setCurrentIndex(num - 6);
      } else {
        setSlideData([...listData, ...lastData]);
        setCurrentIndex(slideData.length - 6);
      }
    }
  };

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
    if (isAnimate) return;

    setIsAnimate(true);
    setIsNext(false);

    const length = slideData.length;
    const newIndex =
      (currentIndex - 1 + length - currentLength) % (length - currentLength);

    setCurrentIndex(newIndex);
    if (newIndex === Math.floor(length / 2 - 1)) {
      setIsLoading(true);

      setIsUpdate(true);
    }
  };

  const handleNext = () => {
    if (isAnimate) return;

    setIsAnimate(true);
    setIsNext(true);

    const length = slideData.length;
    const newIndex = (currentIndex + 1) % (length - currentLength);

    setCurrentIndex(newIndex);

    if (newIndex === Math.floor(length / 2 + 1)) {
      setIsLoading(true);

      setIsUpdate(true);
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
        <ListSortSlide
          style={{
            transform: `translateX(-${currentIndex * itemWidth}px)`,
            transition: `transform ${isAnimate ? 0.5 : 0}s ease`,
          }}
          onTransitionEnd={() => {
            setIsAnimate(false);

            console.log('currentIndex ', currentIndex);
            if (
              (currentIndex === slideData.length - 4 && isNext) ||
              (currentIndex === 0 && !isNext)
            ) {
              SlideChange(currentIndex);
            }
          }}
        >
          {slideData.map((data) => (
            <ListCard key={data.id} data={data} />
          ))}
        </ListSortSlide>
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
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};

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

const ListSortSlide = styled.div`
  display: flex;
  padding: 0 10px;
  gap: 20px;

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
  top: 160px;

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
  top: 160px;

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
