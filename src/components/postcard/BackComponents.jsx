
import styled, { css } from 'styled-components';
import { useState, useEffect } from 'react';
import BackImageComponent from '../../components/BackgroundComponents';
import ReactQuillContext from '../utils/ReactQuill';
;
const CreateNewPaper = ()=> {
  const [toValue, setToValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('white');

  const handleToInputBox = () => {
      if (toValue.trim() === '') {
        setErrorMessage('받는 사람 이름을 입력해 주세요');
      } else {
        setErrorMessage('');``
      }0
    };

  const handleColorSelectChange = (event) => {
      setBackgroundColor(event.target.value);
    };

  const handleCreateButtonClick = () => {
      if (toValue.trim() !== '') {
          // 롤링페이퍼 생성 및 /post/{id} 로 이동하는 로직을 추가하세요.
          // window.location.href = "/post/{id}";
          alert('롤링페이퍼가 생성되었습니다.');
      }
  };
  
  
  return (
      <div className="CreateContainer" style={{ backgroundColor }}>
      <label htmlFor="toInput">To.</label>
      <input
          type="text"
          id="toInput"
          placeholder="Type here..."
          value={toValue}
          onChange={(event) => setToValue(event.target.value)}
          onBlur={handleToInputBox}
      />
      {errorMessage && <span className="ErrorMessage">{errorMessage}</span>}

      <div>
          <button id="colorButton">컬러</button>
          <select id="colorSelect" onChange={handleColorSelectChange}>
          <option value="orange">Orange</option>
          <option value="purple">Purple</option>
          <option value="blue">Blue</option>
          <option value="green">Green</option>
          </select>
      </div>

      <div>
          <button id="imageButton">이미지</button>
          <input type="file" id="imageUpload" accept="image/*" />
      </div>

      <button id="createButton" onClick={handleCreateButtonClick} disabled={!toValue.trim()}>
          생성하기
      </button>
      </div>
  );
  };

const CreateContainer = styled.div`
  margin: 50px auto;
  width: 300px;
  text-align: center;
`;

const ErrorMessage = styled.div`
  color: red;
`;

export default CreateNewPaper;