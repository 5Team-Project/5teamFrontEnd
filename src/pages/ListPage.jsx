import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';

import ListSortPanel from '../components/list/ListSortPanel';
import ListSearch from '../components/list/ListSearch';

const ListPage = () => {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name');

  return (
    <ListMainContainer>
      <ListSearch />
      <ListContent>
        {name ? (
          <ListSortPanel searchValue={name} />
        ) : (
          <>
            <ListSortPanel listSort={'like'} />
            <ListSortPanel />
          </>
        )}

        <LinkButton to="/post">나도 만들어보기</LinkButton>
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

const LinkButton = styled(Link)`
  margin-top: 25px;
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

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }

  @media ${({ theme }) => theme.device.Tablet} {
    width: 760px;
  }

  @media ${({ theme }) => theme.device.Mobile} {
    width: 360px;
  }
`;
