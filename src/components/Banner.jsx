import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import BannerImageExampleCards from '../assets/images/BannerImageExampleCards.svg';
import BannerImageExampleEmojis from '../assets/images/BannerImageExampleEmojis.png';

const Banner = () => {
  return (
    <ContentContainer>
      <ContentWrapper>
        <BannerWrapper>
          <BannerDescriptionBox>
            <BannerNumberTag>Point. 01</BannerNumberTag>
            <BannerTextBox>
              <BannerLabel>
                누구나 손쉽게, 온라인 <br />
                롤링 페이퍼를 만들 수 있어요
              </BannerLabel>
              <BannerText>로그인 없이 자유롭게 만들어요.</BannerText>
            </BannerTextBox>
          </BannerDescriptionBox>
          <BannerImage src={BannerImageExampleCards} alt="메세지 카드 예시" />
        </BannerWrapper>
        <BannerWrapper>
          <BannerDescriptionBox>
            <BannerNumberTag>Point. 02</BannerNumberTag>
            <BannerTextBox>
              <BannerLabel>
                서로에게 이모지로 감정을 <br />
                표현해보세요
              </BannerLabel>
              <BannerText>롤링 페이퍼에 이모지를 추가할 수 있어요.</BannerText>
            </BannerTextBox>
          </BannerDescriptionBox>
          <BannerImage
            src={BannerImageExampleEmojis}
            alt="이모지 리액션 예시"
          />
        </BannerWrapper>
      </ContentWrapper>
      <ButtonWrapper>
        <ButtonToLink>구경해보기</ButtonToLink>
      </ButtonWrapper>
    </ContentContainer>
  );
};

const ContentContainer = styled.main`
  width: 1200px;
  margin: 124px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const ContentWrapper = styled.div`
  width: 1200px;
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

const BannerWrapper = styled.section`
  width: 1200px;
  height: 324px;
  padding: 60px 0;
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.SURFACE};
  display: flex;
  justify-content: space-between;

  &:nth-child(odd) {
    padding-left: 60px;
  }
  &:nth-child(even) {
    flex-direction: row-reverse;
    padding-right: 192px;
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
  text-align: left;
  color: #ffffff;
`;

const BannerTextBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const BannerLabel = styled.h2`
  font-size: 24px;
  font-weight: 700;
  line-height: 36px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #181818;
`;

const BannerText = styled.p`
  font-size: 18px;
  font-weight: 400;
  line-height: 28px;
  letter-spacing: -0.01em;
  text-align: left;
  color: #555555;
`;

const BannerImage = styled.img`
  width: 720px;
  height: 204px;
`;

const ButtonWrapper = styled.div`
  width: 1200px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ButtonToLink = styled.button`
  width: 280px;
  height: 56px;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.PURPLE};
`;
export default Banner;
