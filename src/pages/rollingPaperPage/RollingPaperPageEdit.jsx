import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext, css } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage, getBackgroundByRecipientId } from '../../api/getMessage';
import { useParams } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import { getDataByRecipientId } from '../../api/getDataByRecipientId';

const MESSAGE_LIMIT = 6;

const COLOR_LIST = [
  { value: '#ffd8a8', name: 'beige' },
  { value: '#f3d9fa', name: 'purple' },
  { value: '#dbe4ff', name: 'blue' },
  { value: '#e9fac8', name: 'green' },
];

const RollingPaperPageEdit = () => {
  const themeContext = useContext(ThemeContext);
  const { recipientId } = useParams();

  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recipientData, setRecipientData] = useState({});

  const [needUpdateRecipientData, setNeedUpdateRecipientData] = useState(true);
  const [needUpdateMessages, setNeedUpdateMessages] = useState(true);

  const [bgImage, setBgImage] = useState();
  const [resColor, setResColor] = useState('');
  const [bgColor, setBgColor] = useState('');

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 3 && !loading && hasNext) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    const handleLoadRecipientData = async () => {
      if (needUpdateRecipientData) {
        try {
          const res = await getDataByRecipientId(`${recipientId}/`);
          if (res) {
            setRecipientData(res);
          }
        } catch (e) {
          console.error(e);
        }
      }
      setNeedUpdateRecipientData(false);
    };
    handleLoadRecipientData();
  }, [needUpdateRecipientData]);

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
      setNeedUpdateMessages(false);
    };
    handleLoadMessage({ recipientId, offset, MESSAGE_LIMIT });
  }, [page, needUpdateMessages]);

  useEffect(() => {
    const loadBackground = async (recipientId) => {
      const responseBackground = await getBackgroundByRecipientId(recipientId);
      setBgImage(responseBackground.backgroundImageURL);
      setResColor(responseBackground.backgroundColor);
    };
    loadBackground(recipientId);
  }, [recipientId]);

  useEffect(() => {
    const tempColor = COLOR_LIST.find((elementColor) => {
      return elementColor.name === resColor;
    });
    if (tempColor) {
      setBgColor(tempColor.value);
    } else {
      setBgColor('#FFFFFF');
    }
  }, [resColor]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  const updateRecipientData = () => {
    setNeedUpdateRecipientData(true);
  };
  const updateMessageData = () => {
    setOffset(0);
    setMessages([]);
    setNeedUpdateMessages(true);
  };

  return (
    <>
      <NavigationBar
        recipientId={recipientId}
        isEditMode={true}
        recipientData={recipientData}
      />
      <MessageMainContainer bgImage={bgImage} bgColor={bgColor}>
        <MessageList
          messages={messages}
          recipientId={recipientId}
          showDeleteButton={true}
          updateRecipientData={updateRecipientData}
          updateMessageData={updateMessageData}
        />
      </MessageMainContainer>
    </>
  );
};
export default RollingPaperPageEdit;

const MessageMainContainer = styled.div`
  width: 100%;
  height: auto;
  ${({ bgImage, bgColor }) =>
    bgImage
      ? css`
          background-image: url(${bgImage});
          background-repeat: no-repeat;
          background-position: top center;
          background-size: cover;
        `
      : css`
          background-color: ${bgColor};
        `}
`;
