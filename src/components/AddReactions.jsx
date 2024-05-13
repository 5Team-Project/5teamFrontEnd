import styled from 'styled-components';
import AddReactionIcon from '../assets/icons/IconAddReaction.svg';
import { useRef, useState } from 'react';
import EmojiPicker from 'emoji-picker-react';
import { postEmojiReactions } from '../api/postEmojiReaction';
import useClickOutside from '../hooks/useClickOutside';

const AddReactions = ({
  recipientId,
  updateReactionCount,
  theme,
  handleToast,
  isEditMode,
}) => {
  const [showPicker, setShowPicker] = useState(false);
  const [reactionData, setReactionData] = useState({
    emoji: '',
    type: 'increase',
  });
  const isDarkMode = theme !== 'light';
  const pickerRef = useRef();

  const handleShowEmojiPicker = () => {
    if (isEditMode) {
      handleToast('편집 모드에서는 사용이 불가합니다.');
    } else {
      setShowPicker(!showPicker);
    }
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
      if (updatedReaction) {
        setShowPicker(false);
        updateReactionCount();
        handleToast('You sent your emotions!!');
      }
    } catch (e) {
      console.error('리액션 추가 실패', e);
    }
  };

  useClickOutside(pickerRef, () => {
    setShowPicker(false);
  });

  return (
    <AddReactionsWrapper ref={pickerRef}>
      <ButtonWrapper onClick={handleShowEmojiPicker} type="button">
        <Icons src={AddReactionIcon} alt="리액션추가" isDarkMode={isDarkMode} />
        {/* <ButtonLabel>추가</ButtonLabel> */}
      </ButtonWrapper>
      {!isEditMode && (
        <PickerWrapper>
          <EmojiPicker
            open={showPicker}
            onEmojiClick={handleEmojiClick}
            theme="auto"
            searchPlaceHolder=" Search your Emoji"
            searchDisabled={true}
          />
        </PickerWrapper>
      )}
    </AddReactionsWrapper>
  );
};

const AddReactionsWrapper = styled.div``;

const ButtonWrapper = styled.button`
  height: 36px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
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

const ButtonLabel = styled.p`
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  color: ${({ theme }) => theme.colors.BLACK};
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

  @media ${({ theme }) => theme.device.Mobile} {
    left: -228px;
  }
`;
export default AddReactions;
