import styled, { css } from 'styled-components';
import { useState } from 'react';
import ProfileImageComponent from '../components/ProfileComponents';
import DropdownRelative from '../components/DropRelative';
import ReactQuillContext from '../utils/ReactQuill';
import DropdownFont from '../components/DropFont';

const AddRollingPaper = () => {
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (value) => {
    setInputValue(value);
  };

  const isButtonDisabled = !inputValue;

  return (
    <>
      <AddPaperWrapper>
        <FromContainer>
          <LabelStyle>From.</LabelStyle>
          <InputFrom
            placeholder="이름을 입력해 주세요."
            onChange={handleInputChange}
          />
        </FromContainer>
        <ProfileContainer>
          <LabelStyle>프로필 이미지</LabelStyle>
          <ProfileImageComponent />
        </ProfileContainer>
        <RelationContainer>
          <LabelStyle>상대와의 관계</LabelStyle>
          <DropdownRelative />
        </RelationContainer>
        <ContentContainer>
          <LabelStyle>내용을 입력해 주세요</LabelStyle>
          <ReactQuillContext />
        </ContentContainer>
        <FontContainer>
          <LabelStyle>폰트 선택</LabelStyle>
          <DropdownFont />
        </FontContainer>
        <ButtonContainer>
          <SubmitButton disabled={isButtonDisabled}>생성하기</SubmitButton>
        </ButtonContainer>
      </AddPaperWrapper>
    </>
  );
};

const AddPaperWrapper = styled.div`
  display: flex;
  padding: 40px 350px;
  width: 100%;
  height: 944px;
  gap: 50px;
  opacity: 0px;
  flex-direction: column;
`;

const FromContainer = styled.div`
  width: 100%;
  height: 98px;
  gap: 12px;
  opacity: 0px;
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
`;

const ProfileContainer = styled.div`
  width: 100%;
  height: 142px;
  gap: 12px;
  opacity: 0px;
`;

const RelationContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 98px;
  gap: 12px;
  opacity: 0px;
`;

const ContentContainer = styled.div`
  width: 100%;
  height: 308px;
  gap: 12px;
  opacity: 0px;
`;

const FontContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 320px;
  height: 98px;
  gap: 12px;
  opacity: 0px;
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
  opacity: 0px;
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
export default AddRollingPaper;
