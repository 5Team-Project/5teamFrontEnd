import React, { useState } from 'react';
import styled, { css } from 'styled-components';

const InputComponent = ({ placeholder, value, onChange, onBlur }) => {
  const [isError, setIsError] = useState(false);

  const handleInputBlur = () => {
    if (value.trim() === '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
    onBlur();
  };

  return (
    <InputContainer>
      <StyledInput
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={handleInputBlur}
        isError={isError}
      />
      {isError && <ErrorMessage>값을 입력해 주세요.</ErrorMessage>}
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
