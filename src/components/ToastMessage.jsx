import styled from 'styled-components';
import testImg from '../assets/images/ProfileForTest.png';

const ToastMessage = ({ isOpen, text }) => {
  return (
    isOpen && (
      <ToastMessageBox>
        <ToastMessageIcon src={testImg} alt="성공!" />
        <ToastMessageText>{text}</ToastMessageText>
      </ToastMessageBox>
    )
  );
};

const ToastMessageBox = styled.div`
  min-width: 320px;
  max-width: 524px;
  width: 40%;
  height: 64px;
  background-color: ${({ theme }) => theme.colors.BLACK}CC;
  border-radius: 8px;
  padding: 19px 30px;

  display: flex;
  align-items: center;
  gap: 12px;

  position: fixed;
  bottom: 20vh;
  left: 50%;
  transform: translateX(-50%);

  animation: fadeout 2s ease-in-out;
  opacity: 0;
  @keyframes fadeout {
    0% {
      opacity: 0;
    }
    25% {
      opacity: 1;
    }
    75% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

const ToastMessageIcon = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 140px;
  object-fit: cover;
`;

const ToastMessageText = styled.p`
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  line-height: 26px;
  text-align: left;
`;

export default ToastMessage;
