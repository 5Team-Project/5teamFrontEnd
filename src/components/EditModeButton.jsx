import styled from 'styled-components';
import DeleteButton from '../assets/icons/IconDelete.svg';
import { Link } from 'react-router-dom';
import { useRef, useState } from 'react';
import useClickOutside from '../hooks/useClickOutside';

const EditModeButton = ({ theme, handleToast, recipientId }) => {
  const isDarkMode = theme !== 'light';
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useClickOutside(dropdownRef, () => {
    setIsOpen(false);
  });

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <EditButtonWrapper ref={dropdownRef} onClick={toggleDropdown}>
      <Icons src={DeleteButton} alt="삭제" isDarkMode={isDarkMode} />
      <DropDownList style={isOpen ? {} : { display: 'none' }}>
        <DropDownItem>
          <DropDownLabel>페이퍼 삭제하기</DropDownLabel>
        </DropDownItem>
        <Link to={`/post/${recipientId}/edit`}>
          <DropDownItem>
            <DropDownLabel>메세지 편집</DropDownLabel>
          </DropDownItem>
        </Link>
      </DropDownList>
    </EditButtonWrapper>
  );
};

const EditButtonWrapper = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;
  justify-content: center;

  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
  }
`;

const DropDownList = styled.div`
  position: absolute;
  top: 42px;
  right: 0;
  padding: 10px 0;
  background-color: ${({ theme }) => theme.colors.WHITE};
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  border-radius: 8px;
  z-index: 100;
`;

const DropDownItem = styled.div`
  width: 120px;
  height: 50px;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.colors.WHITE};

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE};
  }

  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }
`;

const DropDownLabel = styled.p`
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  line-height: 26px;
`;

const Icons = styled.img`
  width: 24px;
  height: 24px;
  filter: ${({ isDarkMode, theme }) =>
    isDarkMode
      ? `invert(1) sepia(1) saturate(0) hue-rotate(0deg) brightness(${theme.darkModeBrightness})`
      : 'none'};
  @media ${({ theme }) => theme.device.Mobile} {
    width: 24px;
    height: 24px;
  }
`;
export default EditModeButton;
