import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext, css, keyframes } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage, getBackgroundByRecipientId } from '../../api/getMessage';
import { Link, useParams } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import { getDataByRecipientId } from '../../api/getDataByRecipientId';
import ArrowLeftIcon from '../../assets/icons/IconArrowLeft.svg';

const MESSAGE_LIMIT = 6;

const COLOR_LIST = [
  { value: '#FFE5B4', name: 'beige' },
  { value: '#DCB9FF', name: 'purple' },
  { value: '#B9E0FF', name: 'blue' },
  { value: '#B3F0C8', name: 'green' },
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
        <GoListPageButtonWrap>
          <GoListPageButtonBox>
            <Link to={`/list`} as="button" type="button">
              <GoListPageButton type="button">
                <IconArrowLeft
                  src={ArrowLeftIcon}
                  alt="롤링페이퍼 목록페이지로 가기"
                />
                <GoListPageLabel>리스트로 돌아가기</GoListPageLabel>
              </GoListPageButton>
            </Link>
          </GoListPageButtonBox>
        </GoListPageButtonWrap>
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
const GoListPageButtonWrap = styled.div`
  width: 100%;
  height: 80px;
`;

const GoListPageButtonBox = styled.div`
  width: 1200px;
  height: 100%;
  margin: 0 auto;

  display: flex;
  align-items: center;

  @media ${({ theme }) => theme.device.Tablet} {
    width: 720px;
  }
  @media ${({ theme }) => theme.device.Mobile} {
    width: 320px;
  }

  & a {
    text-decoration: none;
  }
`;

const slideIn = keyframes`
  from {
    transform: translateX(100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
`;

const GoListPageLabel = styled.p`
  font-size: ${({ theme }) => theme.fontsize.S_TITLE};
  color: ${({ theme }) => theme.fontsize.DARK_DARKGRAY};
  visibility: hidden;
  opacity: 0;
`;

const GoListPageButton = styled.button`
  width: 25px;
  height: 25px;
  transition: all 0.3s;

  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    ${GoListPageLabel} {
      animation: ${slideIn} 0.3s forwards; /* 호버 시에 애니메이션 효과 적용 */
      visibility: visible;
      opacity: 1;
    }
  }
`;

const IconArrowLeft = styled.img`
  width: 100%;
  height: 100%;
`;
