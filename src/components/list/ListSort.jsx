import styled from 'styled-components';
import { useEffect, useState } from 'react';

import { getList } from '../../api/getList';

import useDeviceSize from '../../hooks/useDeviceSize';
import ListCard from './ListCard';
import ListSlideMoveButtons from './ListSlideMoveButtons';

const ListSort = ({ sort, theme }) => {
  const isDarkMode = theme !== 'light';

  const [userList, setUserList] = useState([]);
  const [userLastList, setUserLastList] = useState([]);
  const [slideList, setSlideList] = useState([]);

  const [path, setPath] = useState(null);
  const [nextPath, setNextPath] = useState(null);
  const [prevPath, setPrevPath] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);

  const { deviceSize } = useDeviceSize();

  const [currentIndex, setCurrentIndex] = useState(6);
  const [currentLength, setCurrentLength] = useState(3);
  const [itemWidth, setItemWidth] = useState(295);

  const [touchStart, setTouchStart] = useState();

  const [dataLength, setDataLength] = useState(0);
  const [offset, setOffset] = useState(0);

  const [isAnimate, setIsAnimate] = useState(false);
  const [isNext, setIsNext] = useState(false);

  const limit = 6;

  useEffect(() => {
    if (userList.length > 0) return;

    // 처음 데이터 6개 받아오기
    const handleLoadFirst = async () => {
      const commonPath = `/6-5/recipients/?limit=${limit}`;
      setPath(sort === 'like' ? `${commonPath}&sort=like` : `${commonPath}`);

      try {
        if (path === null) return;
        // console.log('처음데이터');
        const res = await getList(path);

        setDataLength(res.count);
        setOffset(res.count - limit);
        setNextPath(res.next);
        setUserList(res.results);
      } catch (e) {
        console.error(e);
      }
    };

    handleLoadFirst();
  }, [path]);

  // 마지막 데이터 6개 받아오기
  useEffect(() => {
    if (offset <= 0 || userLastList.length > 0) return;

    if (dataLength < 12) return;

    const handleLoadLast = async () => {
      const commonPath = `/6-5/recipients/?limit=${limit}`;
      const lastPath =
        sort === 'like'
          ? `${commonPath}&offset=${offset}&sort=like`
          : `${commonPath}&offset=${offset}`;

      try {
        if (path === null) return;
        const res = await getList(lastPath);

        // console.log('마지막데이터', res);

        setPrevPath(res.previous);
        setUserLastList(res.results);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoadLast();
  }, [offset]);

  // 처음 데이터 마지막 데이터 합치기
  useEffect(() => {
    if (userLastList.length <= 0 || userList.length <= 0) return;
    if (slideList.length != 0) return;

    setSlideList([...userLastList, ...userList]);
  }, [userLastList, userList]);

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

          const res = await getList(nextPath);

          // console.log('다음데이터', nextPath);

          const newData = res.results;

          setNextPath(res.next);

          if (offset - limit > 0) setOffset(offset - limit);

          setUserList([...userList, ...newData]);
        } catch (e) {
          console.error(e);
        }
      } else {
        try {
          if (prevPath === null) return;

          const res = await getList(prevPath);

          // console.log('이전데이터', prevPath);

          const newData = res.results;

          setPrevPath(res.previous);

          if (offset - limit > 0) setOffset(offset - limit);

          const setLists = [
            ...userList.slice(0, 6),
            ...newData,
            ...userList.slice(6),
          ];

          setUserList(setLists);
        } catch (e) {
          console.error(e);
        }
      }

      setIsLoading(false);
    };

    HandleAddListData();
  }, [isLoading, isNext]);

  // SlideData 업데이트
  useEffect(() => {
    if (nextPath === null) return;
    if (isUpdate) {
      // console.log('업데이트');
      if (slideList[0] === userList[0])
        setSlideList([...userList, ...userLastList]);
      else setSlideList([...userLastList, ...userList]);

      setIsUpdate(false);
    }
  }, [isUpdate]);

  // 캐러셀 이동 시 SlideData 순서 변경
  const SlideChange = (num) => {
    // console.log('num ', num, ' isNext ', isNext);

    if (slideList[0] === userList[0]) {
      if (isNext) {
        setSlideList([...userLastList, ...userList]);
        setCurrentIndex(2);
      } else {
        setSlideList([...userLastList, ...userList]);
        setCurrentIndex(6);
      }
    } else {
      if (isNext) {
        setSlideList([...userList, ...userLastList]);
        setCurrentIndex(num - 6);
      } else {
        setSlideList([...userList, ...userLastList]);
        setCurrentIndex(dataLength - 6);
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

    const length = slideList.length;
    const newIndex =
      (currentIndex - 1 + length - currentLength) % (length - currentLength);

    setCurrentIndex(newIndex);
    if (newIndex <= Math.floor(length / 2 - 1)) {
      if (prevPath === null) return;

      setIsLoading(true);
      setIsUpdate(true);
    }
  };

  const handleNext = () => {
    if (isAnimate) return;

    setIsAnimate(true);
    setIsNext(true);

    const length = slideList.length;
    const newIndex = (currentIndex + 1) % (length - currentLength);

    setCurrentIndex(newIndex);

    if (newIndex >= Math.floor(length / 2 + 1)) {
      if (nextPath === null) return;
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

            // console.log('currentIndex ', currentIndex);
            if (
              (currentIndex === slideList.length - 4 && isNext) ||
              (currentIndex === 0 && !isNext)
            ) {
              SlideChange(currentIndex);
            }
          }}
        >
          {slideList.map((data) => (
            <ListCard key={data.id} data={data} />
          ))}
        </ListSortSlide>
      </ListCarousel>

      <ListSlideMoveButtons
        handlePrev={handlePrev}
        handleNext={handleNext}
        isDarkMode={isDarkMode}
      />
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
