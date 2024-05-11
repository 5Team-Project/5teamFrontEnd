import styled from 'styled-components';
import DeleteButton from '../assets/icons/IconDelete.svg';

const EditModeButton = ({ theme, handleToast }) => {
  const isDarkMode = theme !== 'light';

  const underConstruction = () => {
    handleToast('!!! It is under construction !!!');
  };

  return (
    <EditButtonWrapper onClick={underConstruction}>
      <Icons src={DeleteButton} alt="삭제" isDarkMode={isDarkMode} />
    </EditButtonWrapper>
  );
};

const EditButtonWrapper = styled.button`
  width: 36px;
  height: 36px;
  padding: 6px 6px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;

  display: flex;
  align-items: center;
  gap: 4px;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
    padding: 6px 9px;
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
export default EditModeButton;
