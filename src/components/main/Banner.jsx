import styled from 'styled-components';
import BannerImageExampleCards from '../../assets/icons/BannerImageExampleCards.svg';
import BannerImageExampleEmojis from '../../assets/images/BannerImageExampleEmojis.png';
import { Link } from 'react-router-dom';

const Banner = () => {
  return (
    <ContentContainer>
      <ContentWrapper>
        <BannerWrapper>
          <BannerDescriptionBox>
            <BannerNumberTag>Point.01</BannerNumberTag>
            <BannerTextBox>
              <BannerLabel>
                누구나 손쉽게, 온라인 <br />
                롤링 페이퍼를 만들 수 있어요
              </BannerLabel>
              <BannerText>로그인 없이 자유롭게 만들어요.</BannerText>
            </BannerTextBox>
          </BannerDescriptionBox>
          <BannerImageBox>
            <BannerImage src={BannerImageExampleCards} alt="메세지 카드 예시" />
          </BannerImageBox>
        </BannerWrapper>
        <BannerWrapper>
          <BannerDescriptionBox>
            <BannerNumberTag>Point.02</BannerNumberTag>
            <BannerTextBox>
              <BannerLabel>
                서로에게 이모지로 감정을 <br />
                표현해보세요
              </BannerLabel>
              <BannerText>롤링 페이퍼에 이모지를 추가할 수 있어요.</BannerText>
            </BannerTextBox>
          </BannerDescriptionBox>
          <BannerImageBox>
            <BannerImage
              src={BannerImageExampleEmojis}
              alt="이모지 리액션 예시"
            />
          </BannerImageBox>
        </BannerWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Link to={'/list'} type="button">
          <ButtonToLink>구경해보기</ButtonToLink>
        </Link>
      </ButtonWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.main`
  max-width: 1248px;
  width: 100%;
  margin: 60px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;

  @media ${({ theme }) => theme.device.Mobile} {
    margin: 42px auto;
  }
`;

const ContentWrapper = styled.div`
  max-width: 1248px;
  width: 100%;
  padding: 0 24px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BannerWrapper = styled.section`
  max-width: 1200px;
  height: 324px;
  padding: 60px 0;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SURFACE};
  display: flex;
  justify-content: space-between;
  gap: 36px;

  &:nth-child(odd) {
    padding-left: 60px;
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
    padding-right: 192px;

    @media ${({ theme }) => theme.device.Tablet} {
      flex-direction: column;
      padding: 60px;
    }
  }

  @media ${({ theme }) => theme.device.Tablet} {
    height: 440px;
    flex-direction: column;
    padding: 60px;
  }
`;

const BannerDescriptionBox = styled.article`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const BannerNumberTag = styled.div`
  width: 80px;
  height: 32px;
  padding: 6px 12px;
  border-radius: 50px;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  font-size: 14px;
  font-weight: 700;
  line-height: 20px;
  letter-spacing: -0.005em;
  text-align: center;
  color: #ffffff;
`;

const BannerTextBox = styled.div`
  display: flex;

  flex-direction: column;
  gap: 8px;
`;

const BannerLabel = styled.h2`
  width: 300px;
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  text-align: left;
  color: #181818;

  @media ${({ theme }) => theme.device.Tablet} {
    br {
      display: none;
    }
  }
  @media ${({ theme }) => theme.device.Mobile} {
    font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
    br {
      display: block;
    }
  }
`;

const BannerText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #555555;
`;

const BannerImageBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  overflow-x: scroll;
  overflow: visible;
  white-space: nowrap;
`;

const BannerImage = styled.img`
  width: 720px;
  height: 100%;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 540px;
    height: 100%;
  }
`;

const ButtonWrapper = styled.div`
  max-width: 1248px;
  height: 104px;
  padding: 0 24px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonToLink = styled.button`
  width: 280px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.PURPLE};
  padding: 14px 24px;
  border-radius: 12px;
  font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
  color: ${({ theme }) => theme.colors.DARKGRAY};

  & a {
    text-decoration: none;
  }

  @media ${({ theme }) => theme.device.Tablet} {
    max-width: 1200px;
    width: 100%;
  }
`;
export default Banner;
