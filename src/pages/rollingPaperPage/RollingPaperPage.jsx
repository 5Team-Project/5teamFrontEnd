import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage } from '../../api/getMessage';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import { getDataByRecipientId } from '../../api/getDataByRecipientId';

const MESSAGE_LIMIT = 8;

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  const { recipientId } = useParams();
  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recipientData, setRecipientData] = useState({});

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 3 && !loading && hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const handleLoadRecipientData = async () => {
      try {
        const res = await getDataByRecipientId(`${recipientId}/`);
        if (res) {
          setRecipientData(res);
        }
      } catch (e) {
        console.error(e);
      }
    };
    handleLoadRecipientData();
  }, []);

  useEffect(() => {
    const handleLoadMessage = async (options) => {
      setLoading(true);
      const response = await getMessage(options);
      const res = await response.results;
      if (options.offset === 0) {
        setMessages(res);
        setOffset((prevOffset) => prevOffset + MESSAGE_LIMIT);
      } else {
        setMessages((prevMessages) => [...prevMessages, ...res]);
        setOffset((prevOffset) => prevOffset + MESSAGE_LIMIT);
      }
      if (response.next === null) {
        setHasNext(false);
      } else {
        setHasNext(true);
      }
      setLoading(false);
    };
    handleLoadMessage({ recipientId, offset, MESSAGE_LIMIT });
  }, [page]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const updateRecipientData = (updatedData) => {
    const dataForUpdate = recipientData.map((prevData) =>
      prevData.messageCount === updatedData ? updatedData : prevData,
    );
    setRecipientData(dataForUpdate);
  };

  return (
    <>
      <NavigationBar recipientId={recipientId} recipientData={recipientData} />
      <MessageMainContainer>
        <MessageList
          messages={messages}
          recipientId={recipientId}
          showDeleteButton={false}
          updateRecipientData={updateRecipientData}
        />
      </MessageMainContainer>
    </>
  );
};
export default RollingPaperPage;

const MessageMainContainer = styled.div`
  width: 100%;
  height: auto;
  background-color: ${({ theme }) => theme.colors.ORANGE};
`;
