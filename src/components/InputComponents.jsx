import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const InputComponent = ({ placeholder, value, onChange, onBlur }) => {
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length > 10) {
      setIsError(true);
      setErrorMessage('10글자를 넘을 수 없습니다.');
      return;
    }
    setIsError(false);
    setErrorMessage('');
    onChange(e);
  };

  const handleInputBlur = () => {
    if (value.trim() === '') {
      setIsError(true);
      setErrorMessage('값을 입력해 주세요.');
    } else {
      setIsError(false);
      setErrorMessage('');
    }
    onBlur();
  };

  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        isError={isError}
      />
      {isError && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  width: 100%;
  height: 98px;
  gap: 12px;
`;

const StyledInput = styled.input`
  width: 100%;
  height: 50px;
  padding: 20px 16px;
  gap: 10px;
  border-radius: 8px;
  margin-top: 10px;
  border: 1px solid #cccccc;
  color: ${({ theme }) => theme.colors.BLACK};
  ${(props) =>
    props.isError &&
    css`
      border-color: red;
    `}
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 5px;
`;

export default InputComponent;
