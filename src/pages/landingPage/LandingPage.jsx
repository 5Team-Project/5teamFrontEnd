import Header from '../../components/Header';
import Banner from '../../components/main/Banner';
import NavigationBar from '../../components/NavigationBar';
import MessageModal from '../../components/postlist/MessageModal';

const LandingPage = () => {
  return (
    <>
      <NavigationBar />
      <Banner />
      <MessageModal />
    </>
  );
};

export default LandingPage;
