import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage } from '../../api/getMessage';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';

const MESSAGELIMIT = 8;

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  const { messageId } = useParams();
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoadMessage = async (options) => {
    setLoading(true);
    const response = await getMessage(options);
    const res = response.results;
    if (options.offset === 0) {
      setMessages(res);
      setOffset((prevOffset) => prevOffset + MESSAGELIMIT);
    } else {
      setMessages((prevMessages) => [...prevMessages, ...res]);
      setOffset((prevOffset) => prevOffset + MESSAGELIMIT);
    }
    if (response.next === null) {
      setHasNext(false);
    } else {
      setHasNext(true);
    }
    setLoading(false);
  };

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 3 && !loading && hasNext) {
      handleLoadMessage({ messageId, offset, MESSAGELIMIT });
    }
  };

  useEffect(() => {
    handleLoadMessage({ messageId, offset, MESSAGELIMIT });
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

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
