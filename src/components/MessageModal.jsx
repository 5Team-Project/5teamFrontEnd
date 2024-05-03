import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import React, { useState } from 'react';
import TestImage from '../assets/images/ProfileForTest.png';

const MessageModal = ({ content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };

  const MakeModalContent = () => {
    return (
      <>
        <div></div>
      </>
    );
  };

  return (
    <>
      {isOpen && (
        <MyModalBG onClick={handleModalChange}>
          <MyModal onClick={(e) => e.stopPropagation()}>
            내용
            <TestImg src={TestImage} alt="테스트이미지" />
            <ModalCloseButton>확인</ModalCloseButton>
          </MyModal>
        </MyModalBG>
      )}
    </>
  );
};

const TestImg = styled.img`
  height: 100%;
`;

const MyModalBG = styled.div`
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100vh;
  z-index: 99;
  position: fixed;
  top: 0;
  left: 0;
`;

const MyModal = styled.div`
  width: 600px;
  height: 480px;
  padding: 40px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.WHITE};
`;

const ModalCloseButton = styled.button`
  width: 120px;
  height: 40px;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;

  background-color: ${({ theme }) => theme.colors.PURPLE};
`;
export default MessageModal;
