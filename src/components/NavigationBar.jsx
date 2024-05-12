import styled from 'styled-components';
import WriterCountIcon from './WriterCountIcon';
import WriterCountText from './WriterCountText';
import ReactionCount from './ReactionCount';
import AddReactions from './AddReactions';
import React, { useEffect, useState } from 'react';
import DropReactions from './DropReactions';
import { getDataByRecipientId } from '../api/getDataByRecipientId';
import ShareButton from './ShareButton';
import ToastMessage from './ToastMessage';
import EditModeButton from './EditModeButton';

const NavigationBar = ({ recipientId, recipientData, isEditMode }) => {
  const [title, setTitle] = useState('Dear');
  const [messageCount, setMessageCount] = useState(0);
  const [recentSenders, setRecentSenders] = useState([]);
  const [allReactions, setAllReactions] = useState([]);
  const [topReactions, setTopReactions] = useState([]);
  const [isToastOpen, setIsToastOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [needUpdateReactions, setNeedUpdateReactions] = useState(true);

  useEffect(() => {
    setTitle(recipientData.name);
    setMessageCount(recipientData.messageCount);
    setRecentSenders(recipientData.recentMessages);
  }, [recipientData]);

  useEffect(() => {
    const handleLoadReactions = async () => {
      if (needUpdateReactions) {
        try {
          const res = await getDataByRecipientId(`${recipientId}/reactions/`);
          if (res && res.results) {
            setAllReactions(res.results);
            setTopReactions(res.results.slice(0, 3));
          }
        } catch (e) {
          console.error(e);
        }
      }
      setNeedUpdateReactions(false);
    };
    handleLoadReactions();
  }, [needUpdateReactions]);

  const updateReactionCount = () => {
    setNeedUpdateReactions(true);
  };

  const handleToast = (text) => {
    setToastMessage(text);
    setIsToastOpen(true);
    const toastTimer = setTimeout(() => {
      setIsToastOpen(false);
      setToastMessage('');
    }, 2000);
    return () => clearTimeout(toastTimer);
  };

  return (
    <>
      <NavWrapper>
        <NavBox>
          <Title>
            <span>To. </span>
            <span>{title}</span>
          </Title>

          <PostStats>
            <PostStatsBox>
              <WriterCountWrapper>
                <WriterCountIcon count={messageCount} recent={recentSenders} />
                <WriterCountText count={messageCount} />
              </WriterCountWrapper>
              <Divider />
              <ReactionCount topReactions={topReactions} />
              <DropReactions reactions={allReactions} />
            </PostStatsBox>
            <Divider />
            <ActionButtons>
              <AddReactions
                recipientId={recipientId}
                updateReactionCount={updateReactionCount}
                handleToast={handleToast}
                isEditMode={isEditMode}
              />
              <ShareButton handleToast={handleToast} isEditMode={isEditMode} />
              <EditModeButton
                handleToast={handleToast}
                recipientId={recipientId}
                isEditMode={isEditMode}
              />
            </ActionButtons>
          </PostStats>
        </NavBox>
      </NavWrapper>
      <ToastMessage isOpen={isToastOpen} text={toastMessage} />
    </>
  );
};

const NavWrapper = styled.nav`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
  background-color: ${({ theme }) => theme.colors.WHITE};
  position: relative;
  z-index: 999;
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
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  @media ${({ theme }) => theme.device.Mobile} {
    position: absolute;
    bottom: 75px;
    left: 63px;
    font-size: ${({ theme }) => theme.fontsize.S_TITLE};
    font-weight: ${({ theme }) => theme.fontweight.REGULAR};
    color: ${({ theme }) => theme.colors.DARKGRAY};
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

const WriterCountWrapper = styled.div`
  display: flex;
  align-items: center;
  @media ${({ theme }) => theme.device.Tablet} {
    display: none;
  }
`;

const ActionButtons = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
  position: relative;
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
