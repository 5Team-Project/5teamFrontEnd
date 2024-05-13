import styled from 'styled-components';
import BannerImageCards from '../../assets/images/BannerImageCards.png';
import BannerImageEmojis from '../../assets/images/BannerImageEmojis.png';
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
            <BannerImage src={BannerImageCards} alt="메세지 카드 예시" />
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
            <BannerImage src={BannerImageEmojis} alt="이모지 리액션 예시" />
          </BannerImageBox>
        </BannerWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <Link to={'/list'} as="button" type="button">
          구경해보기
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
  gap: 12px;

  &:nth-child(odd) {
    padding-left: 60px;
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
    padding-right: 192px;
  }

  @media ${({ theme }) => theme.device.Tablet} {
    &:nth-child(odd) {
      flex-direction: column;
    }
    &:nth-child(even) {
      flex-direction: column;
      padding-right: 60px;
    }
    padding: 60px;
    height: 460px;
    align-items: center;
  }
`;

const BannerDescriptionBox = styled.article`
  display: flex;
  flex-direction: column;
  text-align: left;
  gap: 16px;

  @media ${({ theme }) => theme.device.Tablet} {
    width: 100%;
  }
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
  width: 100%;
  font-size: 24px;
  font-weight: 400;
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
  width: 720px;
  display: flex;
  justify-content: center;

  @media ${({ theme }) => theme.device.Mobile} {
    width: 650px;
  }
`;

const BannerImage = styled.img`
  width: 100%;
`;

const ButtonWrapper = styled.div`
  max-width: 1248px;
  width: 100%;
  height: 104px;
  padding: 0 24px;
  margin: 0 auto;
  display: flex;
  align-items: center;

  & a {
    width: 280px;
    height: 56px;
    padding: 14px 24px;
    margin: 0 auto;
    border-radius: 12px;
    text-decoration: none;

    font-size: ${({ theme }) => theme.fontsize.LARGE_TXT};
    color: ${({ theme }) => theme.colors.DARKGRAY};
    background-color: ${({ theme }) => theme.colors.PURPLE};

    display: flex;
    align-items: center;
    justify-content: center;

    @media ${({ theme }) => theme.device.Tablet} {
      width: 100%;
    }

    &:hover {
      background-color: ${({ theme }) => theme.colors.PURPLE_D};
    }
    &:active {
      background-color: ${({ theme }) => theme.colors.PURPLE_DD};
    }
  }
`;

export default Banner;
