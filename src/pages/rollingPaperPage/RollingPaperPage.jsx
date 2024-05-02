import messages from '../../messages.json';
import MessageList from '../../components/MessageList';
import styled from 'styled-components';

const MessageListContainter = styled.div`
  background-color: #ffc583;
  margin: 0 auto;
`;

const RollingPaperPage = () => {
  return (
    <MessageListContainter>
      <MessageList messages={messages} />
    </MessageListContainter>
  );
};
export default RollingPaperPage;
