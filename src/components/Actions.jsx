import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import AddReactionIcon from '../assets/icons/IconAddReaction.svg';
import ShareIcon from '../assets/icons/IconShare.svg';
import DeleteIcon from '../assets/icons/IconDelete.svg';

const Actions = ({ theme }) => {
  const isDarkMode = theme !== 'light';

  return (
    <ActionWrapper>
      <ActionButtons>
        <Icons src={AddReactionIcon} alt="리액션추가" isDarkMode={isDarkMode} />
        <p>추가</p>
      </ActionButtons>
      <ActionButtons>
        <Icons src={ShareIcon} alt="공유" isDarkMode={isDarkMode} />
      </ActionButtons>
      <ActionButtons>
        <Icons src={DeleteIcon} alt="삭제" isDarkMode={isDarkMode} />
      </ActionButtons>
    </ActionWrapper>
  );
};

const ActionWrapper = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  gap: 14px;

  :hover {
    background-color: ${({ theme }) => theme.colors.GRAY};
  }

  :active {
    background-color: ${({ theme }) => theme.colors.PURPLE};
  }

  @media ${({ theme }) => theme.device.Mobile} {
    gap: 7px;
  }
`;

const ActionButtons = styled.button`
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

export default Actions;
