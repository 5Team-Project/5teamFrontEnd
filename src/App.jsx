import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Theme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import TestComponents from './components/TestComponents';
import LandingPage from './pages/landingPage/LandingPage';
import ListPage from './pages/ListPage';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
