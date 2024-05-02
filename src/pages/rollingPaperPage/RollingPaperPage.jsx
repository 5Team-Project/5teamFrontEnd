import messages from '../../messages.json';
import MessageList from '../../components/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext } from 'react';

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  return (
    <MessageListContainter>
      <MessageList messages={messages} />
    </MessageListContainter>
  );
};
export default RollingPaperPage;

const MessageListContainter = styled.div`
  background-color: ${({ theme }) => theme.colors.ORANGE};
  margin: 0 auto;
`;
