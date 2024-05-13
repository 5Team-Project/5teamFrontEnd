import styled from 'styled-components';
import arrowLeft from '../../assets/icons/IconArrowLeft.svg';
import arrowRight from '../../assets/icons/IconArrowRight.svg';
import useDeviceSize from '../../hooks/useDeviceSize';

const ListSlideMoveButtons = ({ handlePrev, handleNext, isDarkMode }) => {
  const { deviceSize } = useDeviceSize();
  return (
    <>
      {deviceSize === 'desktop' && (
        <>
          <ListBtnLeft onClick={handlePrev} isDarkMode={isDarkMode}>
            <img src={arrowLeft} alt="왼쪽 화살표" />
          </ListBtnLeft>
          <ListBtnRight onClick={handleNext} isDarkMode={isDarkMode}>
            <img src={arrowRight} alt="오른쪽 화살표" />
          </ListBtnRight>
        </>
      )}
    </>
  );
};

const ListBtnLeft = styled.button`
  position: absolute;
  left: -10px;
  top: 165px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: ${({ theme }) => theme.colors.WHITE}e5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &:disabled {
    display: none;
  }

  img {
    filter: ${({ isDarkMode, theme }) =>
      isDarkMode
        ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
        : 'none'};
  }
`;

const ListBtnRight = styled.button`
  position: absolute;
  right: -10px;
  top: 165px;

  border: 1px solid #dadcdf;
  border-radius: 64px;

  background-color: ${({ theme }) => theme.colors.WHITE}e5;

  width: 40px;
  height: 40px;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 1;

  &:disabled {
    display: none;
  }

  img {
    filter: ${({ isDarkMode, theme }) =>
      isDarkMode
        ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
        : 'none'};
  }
`;

export default ListSlideMoveButtons;
