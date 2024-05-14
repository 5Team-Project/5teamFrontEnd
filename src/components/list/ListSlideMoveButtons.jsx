import styled from 'styled-components';
import arrowLeft from '../../assets/icons/IconArrowLeft.svg';
import arrowRight from '../../assets/icons/IconArrowRight.svg';
import useDeviceSize from '../../hooks/useDeviceSize';

const ListSlideMoveButtons = ({ handlePrev, handleNext, isDarkMode }) => {
  const deviceSize = useDeviceSize();
  return (
    <>
      {deviceSize === 'desktop' && (
        <>
          <ListSlideMoveButton
            onClick={handlePrev}
            isDarkMode={isDarkMode}
            direction="left"
          />
          <ListSlideMoveButton
            onClick={handleNext}
            isDarkMode={isDarkMode}
            direction="right"
          />
        </>
      )}
    </>
  );
};

export default ListSlideMoveButtons;

const ListSlideMoveButton = ({ onClick, isDarkMode, direction }) => (
  <StyledButton onClick={onClick} isDarkMode={isDarkMode} direction={direction}>
    <img
      src={direction === 'left' ? arrowLeft : arrowRight}
      alt={`${direction === 'left' ? '왼쪽' : '오른쪽'} 화살표`}
    />
  </StyledButton>
);

const StyledButton = styled.button`
  position: absolute;
  ${({ direction }) =>
    direction === 'left' ? 'left: -10px;' : 'right: -10px;'}
  top: 150px;

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
