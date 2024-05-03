import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import IconTextLogo from '../assets/images/IconTextLogo.svg';
import { useLocation } from 'react-router-dom';

const Header = () => {
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
        </ButtonWrapper>
      </HeaderBox>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid #cccccc;
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
  width: 157px;
  height: 40px;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 142px;
  }
`;

const ButtonMakeNewPaper = styled.button`
  width: 157px;
  height: 40px;
  padding: 8px 8px;
  border-radius: 6px;
  border: 1px solid #cccccc;

  font-size: ${({ theme }) => theme.fontsize.MEDIUM_TXT};
  font-weight: ${({ theme }) => theme.fontweight.BOLD};
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: center;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 142px;
  }
`;

export default Header;
