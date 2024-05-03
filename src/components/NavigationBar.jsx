import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';
import Actions from './Actions';
import { getData } from '../api/getData';
import React, { useEffect, useState } from 'react';
import DropReactions from './DropReactions';

const NavigationBar = () => {
  const [title, setTitle] = useState('Dear');
  const [count, setCount] = useState(0);
  const [recent, setRecent] = useState([]);
  const [reaction, setReaction] = useState([]);

  useEffect(() => {
    const handleLoad = async () => {
      const queryData = '/6-5/recipients/6723/';
      try {
        const res = await getData(queryData);
        if (res) {
          setTitle(res.name);
          setCount(res.messageCount);
          setRecent(res.recentMessages);
          setReaction(res.topReactions);
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
          <PostStatsBox>
            <WriterCountIcon count={count} recent={recent} />
            <WriterCountText count={count} />
            <Divider />
            <ReactionCount reaction={reaction} />
            <DropReactions />
          </PostStatsBox>
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
  position: relative;
`;

const NavBox = styled.div`
  max-width: 1248px;
  width: 100%;
  height: 64px;
  padding: 11px 24px;
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

  @media ${({ theme }) => theme.device.Mobile} {
    position: absolute;
    bottom: 75px;
    right: 24px;
  }
`;

const PostStats = styled.div`
  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 100%;
    justify-content: space-between;
  }
`;

const PostStatsBox = styled.div`
  display: flex;
  align-items: center;
`;

const Divider = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.GRAY};
  margin: 0 14px;

  @media ${({ theme }) => theme.device.Tablet} {
    display: none;
    margin: 0;
  }
`;

export default NavigationBar;
