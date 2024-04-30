import arrowLeft from '../assets/images/arrow_left.svg';
import arrowRight from '../assets/images/arrow_right.svg';

import styled from 'styled-components';
import ListCard from './ListCard';

const ListPopular = ({ listData }) => {
  return (
    <ListPopularWrap>
      <ListPopularSpan>인기 롤링 페이퍼 🔥</ListPopularSpan>

      <ListBtnLeft>
        <img src={arrowLeft} alt="왼쪽 화살표" />
      </ListBtnLeft>

      <ListCarousel>
        <ListPopularMain>
          {listData.map((list) => (
            <ListCard key={list.id} data={list} />
          ))}
        </ListPopularMain>
      </ListCarousel>
      <ListBtnRight>
        <img src={arrowRight} alt="오른쪽 화살표" />
      </ListBtnRight>
    </ListPopularWrap>
  );
};

export default ListPopular;

const ListPopularWrap = styled.section`
  margin-top: 100px;
  width: 1200px;
`;

const ListPopularSpan = styled.span`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.01em;
`;

const ListCarousel = styled.div`
  width: 100%;
  overflow: auto;
`;

const ListPopularMain = styled.div`
  position: relative;
  width: 1200px;
  height: 260px;
  display: flex;
  white-space: nowrap;
  gap: 20px;
`;

const ListBtnLeft = styled.button`
  position: absolute;
  left: 0;
  top: 100px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: #ffffffe5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;

const ListBtnRight = styled.button`
  position: absolute;
  right: 0;
  top: 100px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: #ffffffe5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;
`;
