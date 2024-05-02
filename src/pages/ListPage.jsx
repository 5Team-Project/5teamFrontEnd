import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import ListPopular from '../components/ListPopular';
import ListRecent from '../components/ListRecent';
import ListData from '../dummyListData.json';
import Header from '../components/Header';

const ListPage = () => {
  const [listData, setListData] = useState([]);

  useEffect(() => {
    setListData(ListData);
  }, []);

  if (!listData[0]) return;

  return (
    <ListMainContainer>
      <Header />
      <ListContent>
        <ListPopular listData={listData} />
        <ListRecent listData={listData} />
        <ToPostPageDiv>
          <Link to={'/post'}>나도 만들어보기</Link>
        </ToPostPageDiv>
      </ListContent>
    </ListMainContainer>
  );
};

const ListMainContainer = styled.main`
  width: 1200px;
  margin: 0 auto;
`;

const ListContent = styled.article`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ToPostPageDiv = styled.div`
  margin-top: 50px;
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
    background-color: #9935ff;

    text-decoration: none;
    color: #fff;
  }
`;

export default ListPage;
