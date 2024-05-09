import styled from 'styled-components';
import AddReactionIcon from '../assets/icons/IconAddReaction.svg';
import DeleteIcon from '../assets/icons/IconDelete.svg';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { postEmojiReactions } from '../api/postEmojiReaction';

const AddReactions = ({ recipientId, updateReactionCount, theme }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [reactionData, setReactionData] = useState({
    emoji: '',
    type: 'increase',
  });
  const isDarkMode = theme !== 'light';

  const handleShowEmojiPicker = () => {
    setShowPicker(!showPicker);
  };

  const handleEmojiClick = async (emojiData) => {
    const newReactionData = {
      ...reactionData,
      emoji: emojiData.emoji,
    };
    try {
      const updatedReaction = await postEmojiReactions(
        newReactionData,
        recipientId,
      );
      setShowPicker(false);
      updateReactionCount(updatedReaction);
    } catch (e) {
      console.error('리액션 추가 실패', e);
    }
  };

  return (
    <>
      <ButtonWrapper onClick={handleShowEmojiPicker}>
        <Icons src={AddReactionIcon} alt="리액션추가" isDarkMode={isDarkMode} />
        <p>추가</p>
      </ButtonWrapper>

      <PickerWrapper>
        <EmojiPicker
          open={showPicker}
          onEmojiClick={handleEmojiClick}
          theme="auto"
          searchPlaceHolder=" Search your Emoji"
          searchDisabled={true}
        />
      </PickerWrapper>
    </>
  );
};

const ButtonWrapper = styled.button`
  height: 36px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;

  display: flex;
  align-items: center;
  gap: 4px;
  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }

  p {
    color: ${({ theme }) => theme.colors.BLACK};
  }

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
    padding: 6px 9px;
    p {
      display: none;
    }
  }
`;

const Icons = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ isDarkMode, theme }) =>
    isDarkMode
      ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
      : 'none'};
  @media ${({ theme }) => theme.device.Mobile} {
    width: 18px;
    height: 18px;
  }
`;

const PickerWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: -200px;
`;
export default AddReactions;