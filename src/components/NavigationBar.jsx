import styled from 'styled-components';
import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';
import Actions from './Actions';
import React, { useEffect, useState } from 'react';
import DropReactions from './DropReactions';
import { getDataByRecipientId } from '../api/getDataByRecipientId';

const NavigationBar = ({ recipientId }) => {
  const [title, setTitle] = useState('Dear');
  const [messageCount, setMessageCount] = useState(0);
  const [recentSenders, setRecentSenders] = useState([]);
  const [reactions, setReactions] = useState([]);

  useEffect(() => {
    const handleLoadRecipientData = async () => {
      try {
        const res = await getDataByRecipientId(`${recipientId}/`);
        if (res) {
          setTitle(res.name);
          setMessageCount(res.messageCount);
          setRecentSenders(res.recentMessages);
          setReactions(res.topReactions);
        }
      } catch (e) {
        console.error(e);
      }
    };
    handleLoadRecipientData();
  }, []);

  const updateReactionCount = (updatedReaction) => {
    const updatedReactions = reactions.map((reaction) =>
      reaction.emoji === updatedReaction.emoji ? updatedReaction : reaction,
    );
    setReactions(updatedReactions);
  };

  return (
    <NavWrapper>
      <NavBox>
        <Title>
          <span>To. </span>
          <span>{title}</span>
        </Title>
        <PostStats>
          <PostStatsBox>
            <WriterCountIcon count={messageCount} recent={recentSenders} />
            <WriterCountText count={messageCount} />
            <Divider />
            <ReactionCount reactions={reactions} />
            <DropReactions recipientId={recipientId} />
          </PostStatsBox>
          <Divider />
          <Actions
            recipientId={recipientId}
            updateReactionCount={updateReactionCount}
          />
        </PostStats>
      </NavBox>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
  background-color: ${({ theme }) => theme.colors.WHITE};
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
    font-size: ${({ theme }) => theme.fontsize.TITLE};
    font-weight: ${({ theme }) => theme.fontweight.REGULAR};
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
