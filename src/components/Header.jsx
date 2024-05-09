import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconTextLogo from '../assets/icons/IconTextLogo.svg';
import { useLocation } from 'react-router-dom';
import Switch from 'react-switch';
import { FaSun, FaMoon } from 'react-icons/fa';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/list') {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [location]);

  return (
    <HeaderWrapper>
      <HeaderBox>
        <Logo href="/">
          <img src={IconTextLogo} alt="롤링로고" />
        </Logo>
        <ButtonWrapper>
          {showButton && (
            <ButtonMakeNewPaper>롤링 페이퍼 만들기</ButtonMakeNewPaper>
          )}
          <Switch
            onChange={toggleTheme}
            checked={isDarkMode}
            onColor="#424242"
            offColor="#F5F5F5"
            activeBoxShadow="0 0 2px 3px #0099E5"
            handleDiameter={28}
            height={24}
            width={55}
            borderRadius={12}
            uncheckedIcon={
              <IconWrapper>
                <FaSun color="orange" size={16} />
              </IconWrapper>
            }
            checkedIcon={
              <IconWrapper>
                <FaMoon color="white" size={16} />
              </IconWrapper>
            }
            onHandleColor="#9E9E9E"
            offHandleColor="#FFC583"
          />
        </ButtonWrapper>
      </HeaderBox>
    </HeaderWrapper>
  );
};

const IconWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

const HeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
`;

const HeaderBox = styled.div`
  max-width: 1248px;
  width: 100%;
  height: 64px;
  padding: 11px 24px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.a`
  width: 106px;
  height: 30px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonMakeNewPaper = styled.button`
  width: 157px;
  height: 40px;
  padding: 8px 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: center;
  margin-right: 16px;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 142px;
  }
`;

const ThemeToggleButton = styled.button`
  padding: 8px 16px;
  border-radius: 20px;
  background-color: ${({ theme, isDarkMode }) =>
    isDarkMode ? theme.colors.GRAY : theme.colors.DARKGRAY};
  color: ${({ theme }) => theme.colors.WHITE};
  font-size: ${({ theme }) => theme.fontsize.SMALL_TXT};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  cursor: pointer;
`;

export default Header;
