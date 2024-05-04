import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Theme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import LandingPage from './pages/landingPage/LandingPage';
import ListPage from './pages/ListPage';
import AddRollingPaper from './pages/AddRolingPage';
import Header from './components/Header';
import RollingPaperPage from './pages/rollingPaperPage/RollingPaperPage';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/test" element={<AddRollingPaper />} />
          <Route path="post/">
            <Route index element={<RollingPaperPage />} />
            <Route path=":messageId" element={<RollingPaperPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
