import { Link } from 'react-router-dom';
import styled from 'styled-components';

import ListSort from '../components/list/ListSort';

const ListPage = () => {
  return (
    <ListMainContainer>
      <ListContent>
        <ListSort sort={'like'} />
        <ListSort />
        <ToPostPageDiv>
          <Link to={'/post'}>나도 만들어보기</Link>
        </ToPostPageDiv>
      </ListContent>
    </ListMainContainer>
  );
};

const ListMainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  @media ${({ theme }) => theme.device.Tablet} {
    max-width: 768px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    max-width: 360px;
  }
`;

const ListContent = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToPostPageDiv = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  & a {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 24px 0;

    width: 280px;
    height: 56px;

    border-radius: 12px;
    background-color: ${({ theme }) => theme.colors.PURPLE};

    font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
    font-weight: ${({ theme }) => theme.fontweight.BOLD};
    line-height: 28px;
    text-align: center;

    text-decoration: none;
    color: #fff;
  }

  @media ${({ theme }) => theme.device.Tablet} {
    margin-top: 10px;
    & a {
      width: 760px;
      height: 56px;
    }
  }
  @media ${({ theme }) => theme.device.Mobile} {
    & a {
      width: 360px;
      height: 56px;
    }
  }
`;

export default ListPage;
