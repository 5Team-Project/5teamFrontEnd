import styled from 'styled-components';
import React from 'react';

const ReactionCount = ({ topReactions }) => {
  return (
    <ReactionCountWrapper>
      <ReactionButtonBox>
        {topReactions &&
          topReactions.map((reaction) => {
            return (
              <ReactionButtons key={reaction.id}>
                {reaction.emoji} {reaction.count}
              </ReactionButtons>
            );
          })}
      </ReactionButtonBox>
    </ReactionCountWrapper>
  );
};

const ReactionCountWrapper = styled.div`
  height: 36px;
  display: flex;
  margin-right: 14px;

  @media ${({ theme }) => theme.device.Mobile} {
    margin-right: 0;
  }
`;

const ReactionButtonBox = styled.div`
  height: 36px;
  display: flex;
  gap: 8px;
`;

const ReactionButtons = styled.button`
  width: 63px;
  height: 36px;
  border-radius: 32px;
  padding: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.BLACK}8a;
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;

export default ReactionCount;
