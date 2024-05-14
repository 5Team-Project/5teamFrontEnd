import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconLogo from '../assets/icons/IconLogoColored.svg';
import { useLocation, useNavigate } from 'react-router-dom';
import Switch from 'react-switch';
import { FaSun, FaMoon } from 'react-icons/fa';

import LogoIconFortune from '../assets/images/LogoIconFortune.png';
import LogoTextFortune from '../assets/images/LogoTextFortune.png';
import LogoTextFortuneGray from '../assets/images/LogoTextFortuneGray.png';
import LogoTextFortune80 from '../assets/images/LogoTextFortune80.png';
import LogoArchFortune from '../assets/images/LogoArchFortune.png';
import LogoArchFortuneGray from '../assets/images/LogoArchFortuneGray.png';

const Header = ({ toggleTheme, isDarkMode }) => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === '/' || currentPath === '/list') {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [location]);

  const handleClick = () => {
    navigate('/post');
  };

  return (
    <HeaderWrapper>
      <HeaderBox>
        <Logo href="/">
          <IconLogoImg src={LogoIconFortune} alt="포춘아이콘로고" />
          {isDarkMode ? (
            <>
              <TextLogoImgDark src={LogoTextFortune80} alt="포춘텍스트로고" />
              <ArchLogoImgDark src={LogoArchFortuneGray} alt="포춘로고" />
            </>
          ) : (
            <>
              <TextLogoImg src={LogoTextFortune} alt="포춘텍스트로고" />
              <ArchLogoImg src={LogoArchFortune} alt="포춘로고" />
            </>
          )}
        </Logo>
        <ButtonWrapper>
          {showButton && (
            <ButtonMakeNewPaper onClick={handleClick}>
              롤링 페이퍼 만들기
            </ButtonMakeNewPaper>
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
                <FaSun color="#fcc419" size={16} />
              </IconWrapper>
            }
            checkedIcon={
              <IconWrapper>
                <FaMoon color="white" size={16} />
              </IconWrapper>
            }
            onHandleColor="#9E9E9E"
            offHandleColor="#ffe066"
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
  height: 30px;
  padding: 20px 0;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  color: ${({ theme }) => theme.colors.DARKGRAY};
`;

const IconLogoImg = styled.img`
  width: 28px;
  height: 28px;
  @media ${({ theme }) => theme.device.Mobile} {
    display: none;
  }
`;

const TextLogoImg = styled.img`
  width: 110px;
  height: 28px;
  object-fit: cover;

  @media ${({ theme }) => theme.device.Mobile} {
    display: none;
  }
`;

const ArchLogoImg = styled.img`
  width: 50px;
  display: none;
  object-fit: cover;

  @media ${({ theme }) => theme.device.Mobile} {
    display: block;
  }
`;

const TextLogoImgDark = styled.img`
  width: 110px;
  height: 28px;
  object-fit: cover;

  @media ${({ theme }) => theme.device.Mobile} {
    display: none;
  }
`;
const ArchLogoImgDark = styled.img`
  width: 50px;
  display: none;
  object-fit: cover;

  @media ${({ theme }) => theme.device.Mobile} {
    display: block;
  }
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const ButtonMakeNewPaper = styled.button`
  width: 157px;
  height: 40px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};
  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.REGULAR};
  color: ${({ theme }) => theme.colors.BLACK};
  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: ${({ theme }) => theme.colors.PURPLE};
  }
  &:active {
    background-color: ${({ theme }) => theme.colors.PURPLE_D};
  }

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
