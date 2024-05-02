import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';
import Actions from './Actions';
import { getData } from '../api/getData';
import React, { useEffect, useState } from 'react';

const NavigationBar = () => {
  const [title, setTitle] = useState('Dear');
  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    const handleLoad = async () => {
      const queryData = '/3-1/recipients/2629/';
      try {
        const res = await getData(queryData);
        if (res) {
          setTitle(res.name);
          setCount(res.messageCount);
          setRecent(res.recentMessages);
        }
      } catch (e) {
        console.error(e);
      }
    };
    handleLoad();
  }, []);

  return (
    <NavWrapper>
      <NavBox>
        <Title>
          <span>To. </span>
          <span>{title}</span>
        </Title>
        <PostStats>
          <WriterCountIcon count={count} recent={recent} />
          <WriterCountText count={count} />
          <Divider />
          <ReactionCount />
          <Divider />
          <Actions />
        </PostStats>
      </NavBox>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
`;

const NavBox = styled.div`
  max-width: 1207px;
  width: 100%;
  height: 64px;
  padding: 11px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.a`
  height: 42px;
  font-size: ${({ theme }) => theme.fontsize.TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  line-height: 45px;
  letter-spacing: -0.01em;
  text-align: left;
`;

const PostStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
`;
const Divider = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

export default NavigationBar;
