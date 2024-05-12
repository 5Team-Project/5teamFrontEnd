import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { useState } from 'react';
import { darkTheme, lightTheme } from './styles/Theme';
import GlobalStyle from './styles/GlobalStyle';
import LandingPage from './pages/LandingPage';
import ListPage from './pages/ListPage';
import AddRollingPaper from './pages/AddRolingPage';
import Header from './components/Header';
import RollingPaperPage from './pages/rollingPaperPage/RollingPaperPage';
import RollingPaperPageEdit from './pages/rollingPaperPage/RollingPaperPageEdit';
import CreatePaperPage from './pages/CreatePaperPage';

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
          <Route path="/list" element={<ListPage />}>
            <Route path="?name=:name" element={<ListPage />} />
          </Route>

          <Route path="/post" element={<CreatePaperPage />} />
          <Route
            path="/post/:messageId/message"
            element={<AddRollingPaper />}
          />
          <Route path="/post/:recipientId" element={<RollingPaperPage />} />
          <Route
            path="/post/:recipientId/edit"
            element={<RollingPaperPageEdit />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
