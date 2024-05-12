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

  gap: 15px;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: 767px) {
    flex-wrap: wrap;
    gap: 10px;
    padding-left: 10px;
  }
`;

const ColorButton = styled.button`
  width: calc(25% - 15px);
  padding-bottom: calc(25% - 15px);
  border-radius: 15px;
  background-color: ${({ color }) => color};
  border: ${({ selected }) => (selected ? '2px solid #AB57FF' : 'none')};
  cursor: pointer;
  display: flex;
  position: relative;

  @media (max-width: 767px) {
    width: calc(50% - 10px);
    padding-bottom: calc(50% - 10px);
  }

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
