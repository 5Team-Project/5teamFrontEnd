import styled, { css } from 'styled-components';

const BackgroundColorSelector = ({ colors, selectedColor, onColorClick }) => {
  return (
    <SelectBackGroundWrapper>
      {colors.map((color) => (
        <ColorButton
          key={color.value}
          color={color.value}
          selected={selectedColor === color.value}
          onClick={() => onColorClick(color.value)}
        >
          {selectedColor === color.value}
        </ColorButton>
      ))}
    </SelectBackGroundWrapper>
  );
};

const SelectBackGroundWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;

  //모바일
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding-left: 15px;
  }
`;

const ColorButton = styled.button`
  width: 168px;
  height: 168px;
  border-radius: 8px;
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? '2px solid #AB57FF' : 'none')};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  ${({ selected }) =>
    selected &&
    css`
      &::after {
        content: '✓';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 40px;
        font-weight: 700;
        color: white;
      }
    `}
`;

export default BackgroundColorSelector;
