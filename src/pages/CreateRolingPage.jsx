import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import BackImageComponent from '../components/BackComponents';

const CreateRollingPaper = () => {
  const [toValue, setInputValue] = useState('');
  
  const [isInputError, setIsInputError] = useState(false);



    return(
      <>
        <CreatePaperWrapper>
          <ToContainer>
            <LabeStyle>To.</LabeStyle>
              <input
                placeholder="받는 사람 이름을 입력해 주세요"
                value={inputValue}
                onChange={(event) => setToValue(event.target.value)}
                onBlur={handeToInputBox} 
                isError={isInputError}
              />
            {isInputError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
          </ToContainer>
        </CreatePaperWrapper>
        <BackSelectContainer>
          <LabeStyle>"배경화면을 선택해 주세요.</LabeStyle>
          <div className="select">컬러를 선택하거나, 이미지를 선택할 수 있습니다.</div>
        </BackSelectContainer>

        <BackSelectButtonContainer>
          <>
            <button onClick={handleClick}>컬러</button>
            <button onClick={handleClick}>이미지</button>
            <select id="colorSelect" onChange={handleColorSelectChange}>
              <option value="orange">Orange</option>
              <option value="purple">Purple</option>
              <option value="blue">Blue</option>
              <option value="green">Green</option>
            </select>
          </>
        </BackSelectButtonContainer>
        <CreateButtonContainer>
          <button id="createButton" onClick={handleCreateButtonClick} disabled={!toValue.trim()}>
            생성하기
          </button>
        </CreateButtonContainer>
      </> 
  );
};

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export default CreateRollingPaper;