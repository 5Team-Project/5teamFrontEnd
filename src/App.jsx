import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import LandingPage from './pages/LandingPage/LandingPage';
import ListPage from './pages/ListPage';
import AddRollingPaper from './pages/AddRolingPage';
import Header from './components/Header';
import RollingPaperPage from './pages/rollingPaperPage/RollingPaperPage';
import CreatePaper from './components/postcard/CreatePaper';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <GlobalStyle />
      <BrowserRouter>
        <Header toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/list" element={<ListPage />} />
          <Route path="/test" element={<AddRollingPaper />} />
          <Route path="/paper" element={<CreatePaper />} />
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
