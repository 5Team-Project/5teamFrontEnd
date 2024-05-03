import { getData } from '../api/getData';

import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import styled from 'styled-components';

import ListPopular from '../components/ListPopular';
import ListRecent from '../components/ListRecent';

const ListPage = () => {
  const [listData, setListData] = useState([]);

  const [idData, setIdData] = useState([]);

  useEffect(() => {
    const handleLoad = async () => {
      try {
        const { results } = await getData('/6-5/recipients/');
        setListData(results);
      } catch (e) {
        console.error(e);
      }
    };
    handleLoad();
  }, []);

  if (listData === null) return;
  return (
    <ListMainContainer>
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
