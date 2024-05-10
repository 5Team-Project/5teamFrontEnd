import styled, { css } from 'styled-components';

const BackgroundImageSelector = ({ images, selectedImage, onImageClick }) => {
  return (
    <SelectImageWrapper>
      {images.map((imageUrl) => (
        <BackgroundImages
          key={imageUrl}
          src={imageUrl}
          alt="BackGround"
          selected={selectedImage === imageUrl}
          onClick={() => onImageClick(imageUrl)}
        />
      ))}
    </SelectImageWrapper>
  );
};

const SelectImageWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 15px;

  //모바일
  @media (max-width: 767px) {
    flex-wrap: wrap;
    padding-left: 15px;
  }
`;

const BackgroundImages = styled.div`
  width: 168px;
  height: 168px;
  border-radius: 8px;
  background-image: url(${({ src }) => src});
  background-size: cover;
  cursor: pointer;
  border: ${({ selected }) => (selected ? '2px solid black' : 'none')};
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

export default BackgroundImageSelector;
