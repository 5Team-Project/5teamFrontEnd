import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Theme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import { ThemeProvider } from 'styled-components';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage';
import AddRollingPaper from './pages/AddRolingPage';
import Header from './components/Header';

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
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
