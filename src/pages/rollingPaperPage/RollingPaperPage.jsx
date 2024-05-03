import messages from '../../messages.json';
import MessageList from '../../components/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <MessageMainContainer>
      <MessageList messages={messages} />
    </MessageMainContainer>
  );
};
export default RollingPaperPage;

const MessageMainContainer = styled.div`
  margin: 0 auto;
  background-color: ${({ theme }) => theme.colors.ORANGE};
`;
