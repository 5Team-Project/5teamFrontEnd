import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import ProfileImageComponent from '../components/postMessage/ProfileComponents';
import DropdownRelative from '../components/postMessage/DropRelative';
import ReactQuillContext from '../utils/ReactQuill';
import DropdownFont from '../components/postMessage/DropFont';
import { PostMessages } from '../api/postMessage';
import InputComponent from '../components/InputComponents';

const AddRollingPaper = () => {
  const [inputValue, setInputValue] = useState('');
  const [quillValue, setQuillValue] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [selectedRelationship, setSelectedRelationship] = useState('지인');
  const [selectedFont, setSelectedFont] = useState('Noto Sans');
  const [selectedImage, setSelectedImage] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleInputBlur = () => {};

  const handleQuillChange = (value) => {
    setQuillValue(value);
  };

  const handleRelationshipChange = (value) => {
    setSelectedRelationship(value);
  };

  const handleFontChange = (value) => {
    setSelectedFont(value);
  };

  const handleImageSelect = (imageUrl) => {
    setSelectedImage(imageUrl);
  };

  useEffect(() => {
    const isInputEmpty = inputValue.trim() === '';
    const isQuillEmpty = quillValue === '' || quillValue === '<p><br></p>';
    setIsButtonDisabled(isInputEmpty || isQuillEmpty);
  }, [inputValue, quillValue]);

  const handleSubmit = async () => {
    const data = {
      sender: inputValue,
      profileImageURL: selectedImage,
      relationship: selectedRelationship,
      content: quillValue,
      font: selectedFont,
    };

    try {
      const response = await PostMessages(data);
      console.log('작성 성공:', response);
    } catch (error) {
      console.error('작성 실패:', error);
    }
  };

  return (
    <>
      <AddPaperWrapper onSubmit={handleSubmit}>
        <FromContainer>
          <LabelStyle>From.</LabelStyle>
          <InputComponent
            placeholder="이름을 입력해 주세요."
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputBlur}
          />
        </FromContainer>
        <ProfileContainer>
          <LabelStyle>프로필 이미지</LabelStyle>
          <ProfileImageComponent onImageSelect={handleImageSelect} />
        </ProfileContainer>
        <RelationContainer>
          <LabelStyle>상대와의 관계</LabelStyle>
          <DropdownRelative
            value={selectedRelationship}
            onChange={handleRelationshipChange}
          />
        </RelationContainer>
        <ContentContainer>
          <LabelStyle>내용을 입력해 주세요</LabelStyle>
          <ReactQuillContext value={quillValue} onChange={handleQuillChange} />
        </ContentContainer>
        <FontContainer>
          <LabelStyle>폰트 선택</LabelStyle>
          <DropdownFont value={selectedFont} onChange={handleFontChange} />
        </FontContainer>
        <ButtonContainer>
          <SubmitButton disabled={isButtonDisabled}>생성하기</SubmitButton>
        </ButtonContainer>
      </AddPaperWrapper>
    </>
  );
};

const AddPaperWrapper = styled.form`
  display: flex;
  padding: 40px 350px;
  width: 100%;
  height: 944px;
  gap: 50px;
  flex-direction: column;

  //모바일
  @media (max-width: 767px) {
    padding: 10px 20px;
  }
  //테블릿
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
  font-family: Pretendard;
  font-size: ${({ theme }) => theme.fontsize.M_TITLE};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  line-height: 36px;
  letter-spacing: -0.01em;
  text-align: left;
`;

const InputFrom = styled.input`
  width: 100%;
  height: 50px;
  padding: 20px 16px;
  gap: 10px;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid #cccccc;
  ${(props) =>
    props.isError &&
    css`
      border-color: red;
    `}
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 142px;
  gap: 12px;
`;

const RelationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 98px;
  gap: 12px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 308px;
  gap: 12px;
`;

const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 98px;
  gap: 12px;
  margin-top: 70px;
`;
const ButtonContainer = styled.div`
  width: 100%;
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
  color: ${({ theme }) => theme.colors.WHITE};

  ${(props) =>
    props.disabled &&
    css`
      background-color: ${({ theme }) => theme.colors.GRAY};
      color: ${({ theme }) => theme.colors.WHITE};
      cursor: not-allowed;
    `}
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;
export default AddRollingPaper;
