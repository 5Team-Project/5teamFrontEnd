import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useState } from 'react';

const ReactionCount = () => {
  const [likes, setLikes] = useState(0);

  const handleReactions = () => {
    setLikes(likes + 1);
  };
  return (
    <ReactionCountWrapper>
      <ReactionButtonBox>
        <ReactionButtons onClick={handleReactions}>
          <span>&#x1F354; </span>
          {likes}
        </ReactionButtons>
        <ReactionButtons onClick={handleReactions}>
          <span>&#x1F354; </span>
          {likes}
        </ReactionButtons>
        <ReactionButtons onClick={handleReactions}>
          <span>&#x1F354; </span>
          {likes}
        </ReactionButtons>
      </ReactionButtonBox>
      <AddReactions>V</AddReactions>
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
  background: rgba(0, 0, 0, 0.54);
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
`;

const AddReactions = styled.button`
  width: 36px;
  height: 36px;
`;
export default ReactionCount;
