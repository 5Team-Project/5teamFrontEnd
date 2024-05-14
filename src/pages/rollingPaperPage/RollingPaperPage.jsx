import MessageList from '../../components/postlist/MessageList';
import styled, { ThemeContext, css, keyframes } from 'styled-components';
import { useContext, useEffect, useState } from 'react';
import { getMessage, getBackgroundByRecipientId } from '../../api/getMessage';
import { useParams, Link } from 'react-router-dom';
import NavigationBar from '../../components/NavigationBar';
import { getDataByRecipientId } from '../../api/getDataByRecipientId';
import ArrowLeftIcon from '../../assets/icons/IconArrowLeft.svg';

const MESSAGE_LIMIT = 8;

const COLOR_LIST = [
  { value: '#ffd8a8', name: 'beige' },
  { value: '#f3d9fa', name: 'purple' },
  { value: '#dbe4ff', name: 'blue' },
  { value: '#e9fac8', name: 'green' },
];

const RollingPaperPage = () => {
  const themeContext = useContext(ThemeContext);
  const { recipientId } = useParams();

  const [messages, setMessages] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [recipientData, setRecipientData] = useState({});

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

  return (
    <>
      <NavigationBar recipientId={recipientId} recipientData={recipientData} />
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
          showDeleteButton={false}
        />
      </MessageMainContainer>
    </>
  );
};
export default RollingPaperPage;

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
    transform: translateX(30%);
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
      animation: ${slideIn} 0.5s forwards;
      visibility: visible;
      opacity: 1;
    }
  }
`;

const IconArrowLeft = styled.img`
  width: 100%;
  height: 100%;
`;
