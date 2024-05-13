import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';

import ListSort from '../components/list/ListSort';
import ListSearch from '../components/list/ListSearch';

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <ListMainContainer>
      <ListSearch />
      <ListContent>
        {name ? (
          <ListSort searchValue={name} />
        ) : (
          <>
            <ListSort listSort={'like'} />
            <ListSort />
          </>
        )}

        <ToPostPageDiv>
          <Link to={'/post'}>나도 만들어보기</Link>
        </ToPostPageDiv>
      </ListContent>
    </ListMainContainer>
  );
};

export default ListPage;

const ListMainContainer = styled.main`
  max-width: 1200px;
  margin: 0 auto;
  height: 80dvh;
  @media ${({ theme }) => theme.device.Tablet} {
    max-width: 768px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    max-width: 360px;
  }
`;

const ListContent = styled.article`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
`;

const ToPostPageDiv = styled.div`
  margin-top: 25px;
  display: flex;
  align-items: end;
  justify-content: center;

  flex-grow: 1;
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
    font-weight: ${({ theme }) => theme.fontweight.REGULAR};
    line-height: 28px;
    text-align: center;

    text-decoration: none;
    color: ${({ theme }) => theme.colors.WHITE};
  }

  @media ${({ theme }) => theme.device.Tablet} {
    margin: 0;
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
