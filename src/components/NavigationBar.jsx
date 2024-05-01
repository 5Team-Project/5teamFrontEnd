import styled from 'styled-components';
import { Theme } from '../styles/Theme';
import WriterCount from './WriterCount';
import ReactionCount from './ReactionCount';

const NavigationBar = () => {
  return (
    <NavWrapper>
      <NavBox>
        <Title>To. AnitaMaxWynn</Title>
        <PostStats>
          <WriterCount />
          <Divider />
          <ReactionCount />
          <Divider />
          <Actions>
            <ActionButtons>add</ActionButtons>
            <ActionButtons>share</ActionButtons>
            <ActionButtons>edit</ActionButtons>
          </Actions>
        </PostStats>
      </NavBox>
    </NavWrapper>
  );
};

const NavWrapper = styled.nav`
  width: 100%;
  height: 64px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.GRAY};
`;

const NavBox = styled.div`
  max-width: 1207px;
  width: 100%
  height: 64px;
  padding: 11px 0;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
`;

const Title = styled.a`
  width: 106px;
  height: 30px;
`;

const PostStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 14px;
`;
const Divider = styled.div`
  width: 1px;
  height: 90%;
  background-color: ${({ theme }) => theme.colors.GRAY};
`;

const Actions = styled.div`
  height: 36px;
  display: flex;
  justify-content: space-between;
  gap: 14px;
`;

const ActionButtons = styled.button`
  height: 36px;
  padding: 8px;
  border-radius: 6px;
  border: 1px solid ${({ theme }) => theme.colors.GRAY};

  font-size: 16px;
  line-height: 20px;
  letter-spacing: -0.01em;
  text-align: center;
`;

export default NavigationBar;
