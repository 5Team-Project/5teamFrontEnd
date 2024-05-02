import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useState } from 'react';

const ReactionCount = ({ reaction }) => {
  return (
    <ReactionCountWrapper>
      <ReactionButtonBox>
        {reaction.map((emoji) => {
          return (
            <ReactionButtons key={emoji.id}>
              {emoji.emoji} {emoji.count}
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
  background: rgba(0, 0, 0, 0.54);
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;

export default ReactionCount;
