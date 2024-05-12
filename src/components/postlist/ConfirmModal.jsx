import styled, { ThemeContext } from 'styled-components';
import React, { useContext } from 'react';

const ConfirmModal = ({
  isConfirmModalOpen,
  closeConfirmModal,
  handleDelete,
}) => {
  const theme = useContext(ThemeContext);
  return (
    <>
      {isConfirmModalOpen && (
        <MyModalBG onClick={closeConfirmModal}>
          <MyModal onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <p>정말 삭제 하시겠습니까?</p>
            </ModalHeader>
            <MessageBox>
              <p>삭제된 콘텐츠는 복구가 불가합니다.</p>
            </MessageBox>
            <ButtonWrapper>
              <ModalAnswerButtonYes
                onClick={() => {
                  handleDelete();
                }}
              >
                예
              </ModalAnswerButtonYes>
              <ModalAnswerButton onClick={closeConfirmModal}>
                아니오
              </ModalAnswerButton>
            </ButtonWrapper>
          </MyModal>
        </MyModalBG>
      )}
    </>
  );
};

const MyModalBG = styled.div`
  background-color: rgba(0, 0, 0, 0.1);
  width: 100%;
  height: 100vh;
  z-index: 999;
  position: fixed;
  top: 0;
  left: 0;
`;

const MyModal = styled.div`
  width: 400px;
  height: 150px;
  padding: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 10px;
  box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.25);
  background-color: ${({ theme }) => theme.colors.WHITE};

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const ModalHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const MessageBox = styled.div`
  width: 100%;
  height: 100%;
  padding: 10px 0 0;
  font-size: ${({ theme }) => theme.fontsize.MINI_TXT};
  color: ${({ theme }) => theme.colors.DARKGRAY};
  border-top: 1px solid ${({ theme }) => theme.colors.GRAY};
`;

const ButtonWrapper = styled.div`
  display: flex;
  gap: 20px;
`;

const ModalAnswerButtonYes = styled.button`
  width: 80px;
  height: 30px;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  margin-top: 26px;

  background-color: ${({ theme }) => theme.colors.PURPLE_D};

  &:hover {
    background-color: ${({ theme }) => theme.colors.BLUE};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.RED};
  }
`;

const ModalAnswerButton = styled.button`
  width: 80px;
  height: 30px;
  padding: 7px 16px;
  border: none;
  border-radius: 6px;
  margin-top: 26px;

  background-color: ${({ theme }) => theme.colors.PURPLE};

  &:hover {
    background-color: ${({ theme }) => theme.colors.BLUE};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_DD};
  }
`;
export default ConfirmModal;
