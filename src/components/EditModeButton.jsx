import styled, { ThemeContext } from 'styled-components';
import IconSettings from '../assets/icons/IconSettings.svg';
import IconChecked from '../assets/icons/IconChecked.svg';
import { Link } from 'react-router-dom';
import { useContext } from 'react';

const EditModeButton = ({ theme, recipientId, isEditMode }) => {
  const isDarkMode = theme !== 'light';
  const themeContext = useContext(ThemeContext);

  if (isEditMode) {
    return (
      <Link to={`/post/${recipientId}`} style={{ textDecoration: 'none' }}>
        <EditButtonWrapper as="button" isEditMode={isEditMode}>
          <Icons src={IconChecked} alt="편집완료" isDarkMode={isDarkMode} />
          <ButtonLabel style={isEditMode ? {} : { display: 'none' }}>
            편집완료
          </ButtonLabel>
        </EditButtonWrapper>
      </Link>
    );
  } else {
    return (
      <Link to={`/post/${recipientId}/edit`} style={{ textDecoration: 'none' }}>
        <EditButtonWrapper as="button" isEditMode={isEditMode}>
          <Icons src={IconSettings} alt="편집하기" isDarkMode={isDarkMode} />
          <ButtonLabel style={!isEditMode ? {} : { display: 'none' }}>
            편집하기
          </ButtonLabel>
        </EditButtonWrapper>
      </Link>
    );
  }
};

const EditButtonWrapper = styled.button`
  height: 36px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;
  justify-content: center;
  background-color: ${({ theme, isEditMode }) =>
    isEditMode ? theme.colors.GREEN : theme.colors.WHITE};

  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
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
    width: 24px;
    height: 24px;
  }
`;

const ButtonLabel = styled.p`
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  @media ${({ theme }) => theme.device.Mobile} {
    display: none;
  }
`;
export default EditModeButton;
