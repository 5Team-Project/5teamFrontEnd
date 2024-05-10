import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage } from '../../api/getMessage';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  const { messageId } = useParams();
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [messageLimit, setMessageLimit] = useState(8);
  const [page, setPage] = useState(1);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLoadMessage = async (options) => {
    setLoading(true);
    const response = await getMessage(options);
    const res = response.results;

    if (options.offset === 0) {
      setMessages(res);
      setMessageLimit(9);
    } else {
      setMessages((prevMessages) => [...prevMessages, ...res]);
    }
    setOffset((prevOffset) => prevOffset + messageLimit);
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
      handleLoadMessage({ messageId, offset, messageLimit });
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    handleLoadMessage({ messageId, offset, messageLimit });
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
