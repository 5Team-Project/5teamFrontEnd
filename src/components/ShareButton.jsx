import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';
import ShareIcon from '../assets/icons/IconShare.svg';

const ShareButton = ({ handleToast }) => {
  const [isOpen, setIsOpen] = useState(false);

  const baseUrl = process.env.REACT_APP_BASE_URL;
  const location = useLocation();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleCopyUrl = async (text) => {
    try {
      const currentUrl = new URL(baseUrl);
      currentUrl.pathname = location.pathname;
      await navigator.clipboard.writeText(currentUrl);
      handleToast('URL이 복사 되었다능.');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <ShareButtonWrapper onClick={toggleDropdown}>
        <Icons src={ShareIcon} alt="공유" />
        {isOpen && (
          <DropDownList>
            <DropDownItem>
              <DropDownLabel>카카오톡 공유</DropDownLabel>
            </DropDownItem>
            <DropDownItem onClick={handleCopyUrl}>
              <DropDownLabel>URL 공유</DropDownLabel>
            </DropDownItem>
          </DropDownList>
        )}
      </ShareButtonWrapper>
    </>
  );
};

const ShareButtonWrapper = styled.button`
  height: 36px;
  padding: 6px 16px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;

  display: flex;
  align-items: center;
  gap: 4px;
  position: relative;
  p {
    color: ${({ theme }) => theme.colors.BLACK};
  }

  @media ${({ theme }) => theme.device.Mobile} {
    width: 36px;
    padding: 6px 9px;
    p {
      display: none;
    }
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
    width: 18px;
    height: 18px;
  }
`;

export default ShareButton;
