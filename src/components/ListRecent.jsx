import arrowLeft from '../assets/images/arrow_left.svg';
import arrowRight from '../assets/images/arrow_right.svg';
import styled from 'styled-components';
import ListCard from './ListCard';
import { useEffect, useState } from 'react';

const ListRecent = ({ listData }) => {
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    if (!listData) return;

    setSortData(
      [...listData].sort(function (a, b) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }),
    );
  }, [listData]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const newIndex =
      (currentIndex - 1 + listData.length - 3) % (listData.length - 3);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % (listData.length - 3);
    setCurrentIndex(newIndex);
  };

  return (
    <ListRecentWrap>
      <ListRecentSpan>최근에 만든 롤링 페이퍼 ⭐️️</ListRecentSpan>

      <ListBtnLeft onClick={handlePrev}>
        <img src={arrowLeft} alt="왼쪽 화살표" />
      </ListBtnLeft>

      <ListCarousel>
        <ListRecentMain
          style={{
            transform: `translateX(-${currentIndex * 295}px)`,
          }}
        >
          {sortData.map((data) => (
            <ListCard key={data.id} data={data} />
          ))}
        </ListRecentMain>
      </ListCarousel>

      <ListBtnRight onClick={handleNext}>
        <img src={arrowRight} alt="오른쪽 화살표" />
      </ListBtnRight>
    </ListRecentWrap>
  );
};

export default ListRecent;
const ListRecentWrap = styled.section`
  margin-top: 100px;
  max-width: 1200px;
  position: relative;
`;

const ListRecentSpan = styled.span`
  font-size: 24px;

  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.01em;
`;

const ListCarousel = styled.div`
  width: 1180px;
  margin-top: 16px;
  overflow: hidden;
  display: flex;
`;

const ListRecentMain = styled.div`
  display: flex;
  padding: 0 10px;
  justify-content: space-around;
  gap: 20px;
  transition: transform 0.5s ease;
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
`;
