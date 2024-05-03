import arrowLeft from '../../assets/images/arrow_left.svg';
import arrowRight from '../../assets/images/arrow_right.svg';
import styled from 'styled-components';
import ListCard from './ListCard';
import { useEffect, useState } from 'react';

const ListPopular = ({ listData }) => {
  const [sortData, setSortData] = useState([]);

  useEffect(() => {
    if (!listData) return;

    setSortData(
      [...listData].sort(function (a, b) {
        return b.messageCount - a.messageCount;
      }),
    );
  }, [listData]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    const length = listData.length;
    const newIndex = (currentIndex - 1 + length - 3) % (length - 3);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => {
    const length = listData.length;
    const newIndex = (currentIndex + 1) % (length - 3);
    setCurrentIndex(newIndex);
  };

  return (
    <ListPopularWrap>
      <ListPopularSpan>인기 롤링 페이퍼 🔥</ListPopularSpan>

      <ListBtnLeft onClick={handlePrev}>
        <img src={arrowLeft} alt="왼쪽 화살표" />
      </ListBtnLeft>
      <ListCarousel>
        <ListPopularMain
          style={{
            transform: `translateX(-${currentIndex * 295}px)`,
          }}
        >
          {sortData.map((data) => (
            <ListCard key={data.id} data={data} />
          ))}
        </ListPopularMain>
      </ListCarousel>
      <ListBtnRight onClick={handleNext}>
        <img src={arrowRight} alt="오른쪽 화살표" />
      </ListBtnRight>
    </ListPopularWrap>
  );
};

export default ListPopular;

const ListPopularWrap = styled.section`
  margin-top: 100px;
  max-width: 1200px;
  position: relative;
`;

const ListPopularSpan = styled.span`
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
`;

const ListPopularMain = styled.div`
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
