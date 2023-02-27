import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import DashBoard from './pages/DashBoard';
const theme = createTheme({
  palette: {
    success: {
      main: '#8A4FFF',
    },
    warning: {
      main: '#FFD700',
    },
  },
});
function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route exact path='/' element={<Login />}></Route>
          <Route exact path='/DashBoard' element={<DashBoard />}></Route>
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
