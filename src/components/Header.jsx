import styled from 'styled-components';
import IconTextLogo from '../assets/images/IconTextLogo.svg';

const Header = () => {
  return (
    <HeaderWrapper>
      <HeaderBox>
        <Logo href="/">
          <img src={IconTextLogo} alt="롤링로고" />
        </Logo>
        <ButtonMakeNewPaper>롤링 페이퍼 만들기</ButtonMakeNewPaper>
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
  max-width: 1207px;
  width: 100%
  height: 64px;
  padding: 11px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.a`
  width: 106px;
  height: 30px;
`;

const ButtonMakeNewPaper = styled.button`
  width: 157px;
  height: 40px;
  padding: 8px 16px;
  border-radius: 6px;
  border: 1px solid #cccccc;

  font-size: 16px;
  line-height: 26px;
  letter-spacing: -0.01em;
  text-align: center;
`;

export default Header;
