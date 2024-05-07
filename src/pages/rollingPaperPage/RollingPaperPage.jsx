import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage } from '../../api/getMessage';
import { useParams } from 'react-router-dom';

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  const { messageId } = useParams();
  const [messages, setMessages] = useState([]);

  const handleLoadMessage = async () => {
    const { results } = await getMessage(messageId);
    setMessages(results);
  };

  useEffect(() => {
    handleLoadMessage();
  }, []);

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
