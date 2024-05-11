import { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import InputComponent from '../InputComponents';
import { PostPaper } from '../../api/postPaper';
import { getBackGroundImg } from '../../api/getProfileImg';
import BackgroundColorSelector from './BackGroundColorSelector';
import BackgroundImageSelector from './BackGroundImageSelector';
import { useNavigate } from 'react-router-dom';

const CreatePaper = () => {
  const [inputValue, setInputValue] = useState('');
  const [selectedBackgroundImage, setSelectedBackgroundImage] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isColorSelected, setIsColorSelected] = useState(true);
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [backGroundImages, setBackGroundImages] = useState([]);

  const COLOR_LIST = [
    { value: '#FFE5B4', name: 'beige' },
    { value: '#DCB9FF', name: 'purple' },
    { value: '#B9E0FF', name: 'blue' },
    { value: '#B3F0C8', name: 'green' },
  ];

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isImageSelected) {
      const data = {
        name: inputValue,
        backgroundImageURL: selectedBackgroundImage,
        backgroundColor: selectedColor || 'beige',
      };

      try {
        const response = await PostPaper(data);
        const paperId = response.id;
        navigate(`/post/${paperId}`);
      } catch (error) {
        console.error('작성 실패:', error);
      }
    } else if (isColorSelected) {
      const selectedColorName = COLOR_LIST.find(
        (color) => color.value === selectedColor,
      )?.name;
      const data = {
        name: inputValue,
        backgroundColor: selectedColorName,
      };

      try {
        const response = await PostPaper(data);
        const paperId = response.id;
        navigate(`/post/${paperId}`);
      } catch (error) {
        console.error('작성 실패:', error);
      }
    } else {
      alert('이미지 또는 색상을 선택해주세요.');
      return;
    }
  };

  const handleInputBlur = () => {};

  useEffect(() => {
    const isInputEmpty = inputValue.trim() === '';
    setIsButtonDisabled(isInputEmpty);
  }, [inputValue]);

  useEffect(() => {
    const fetchProfileImages = async () => {
      try {
        const response = await getBackGroundImg();
        setBackGroundImages(response.imageUrls);
        setSelectedBackgroundImage(response.imageUrls[0]);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProfileImages();
  }, []);

  const handleColorClick = (color) => {
    const selectedColor = COLOR_LIST.find((c) => c.value === color);
    setSelectedColor(selectedColor.value);
    setSelectedBackgroundImage('');
    setIsImageSelected(false);
    setIsColorSelected(true);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedBackgroundImage(imageUrl);
    setSelectedColor('');
    setIsImageSelected(true);
    setIsColorSelected(false);
  };

  const handleToggle = () => {
    setIsColorSelected(!isColorSelected);
    setIsImageSelected(!isImageSelected);
  };

  return (
    <AddPageWrapper>
      <FromContainer>
        <LabelStyle>TO.</LabelStyle>
        <InputComponent
          placeholder="이름을 입력해 주세요."
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleInputBlur}
        />
      </FromContainer>
      <SelectTextWrapper>
        <LabelStyle>배경화면을 선택해주세요</LabelStyle>
        <Comment>컬러를 선택하거나 이미지를 선택할 수 있습니다.</Comment>
      </SelectTextWrapper>
      <ToggleWrapper>
        <ToggleButton selected={isColorSelected} onClick={handleToggle}>
          컬러
        </ToggleButton>
        <ToggleButton selected={!isColorSelected} onClick={handleToggle}>
          이미지
        </ToggleButton>
      </ToggleWrapper>

      {isColorSelected ? (
        <BackgroundColorSelector
          colors={COLOR_LIST}
          selectedColor={selectedColor}
          onColorClick={handleColorClick}
        />
      ) : (
        <BackgroundImageSelector
          images={backGroundImages}
          selectedImage={selectedBackgroundImage}
          onImageSelect={handleImageClick}
        />
      )}

      <SubmitButton
        type="submit"
        disabled={isButtonDisabled}
        onClick={handleSubmit}
      >
        생성하기
      </SubmitButton>
    </AddPageWrapper>
  );
};

const AddPageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 40px 350px;
  width: 100%;
  height: 944px;
  gap: 50px;
  @media (max-width: 767px) {
    padding: 10px 20px;
  }
  @media (max-width: 1200px) {
    padding: 49px 24px;
  }
`;

const FromContainer = styled.div`
  width: 100%;
  height: 98px;
  gap: 12px;
`;

const LabelStyle = styled.label`
  font-size: ${({ theme }) => theme.fontsize.M_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  line-height: 36px;
  letter-spacing: -0.01em;
  text-align: left;
`;

const Comment = styled.div`
  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: left;
`;

const SelectTextWrapper = styled.div`
  width: 301px;
  height: 66px;
`;

const ToggleWrapper = styled.div`
  display: flex;
`;

const ToggleButton = styled.button`
  width: 200px;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  background-color: ${({ selected }) => (selected ? '#DCB9FF' : '#e0e0e0')};
  color: ${({ selected }) => (selected ? 'white' : 'black')};
  cursor: pointer;
  &:first-child {
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
  &:last-child {
    border-top-right-radius: 4px;
    border-bottom-right-radius: 4px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 56px;
  top: 24px;
  left: 24px;
  padding: 14px 24px 14px 24px;
  gap: 10px;
  border-radius: 12px;

  cursor: pointer;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  color: ${({ theme }) => theme.colors.BLACK};

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.GRAY};
      color: ${({ theme }) => theme.colors.WHITE};
      cursor: not-allowed;
    `}
`;

export default CreatePaper;
