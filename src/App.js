import './App.css';
import Login from './pages/Login';
import Register from './pages/Register';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthLayout from './components/layout/AuthLayout';
import{createTheme, ThemeProvider }from "@mui/material/styles"
import { CssBaseline } from '@mui/material';
import { yellow } from '@mui/material/colors';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import Store from './pages/Store';
import SearchStore from './pages/SearchStore';
import Favorite from './pages/Favorite'
import AdminAuthLayout from './components/layout/AdminAuth';
import AdminLogin from './pages/AdminLogin';
import AdminRegister from './pages/AdminRegister';
import AdminApp from './components/layout/AdminApp';
import AdminHome from './pages/AdminHome';
import AdminStore from './pages/AdminStore';


function App() {
  const theme = createTheme({
    palette: { primary:yellow },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />}/>
        </Route>
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />
            <Route path="store" element={<Home />} />
            <Route path="store/:storeId" element={<Store />} />
            <Route path="Searchstore" element={<SearchStore />} />
            <Route path="favorite" element={<Favorite />} />
          </Route>
          <Route path="/" element={<AdminAuthLayout />}>
            <Route path="/adminlogin" element={<AdminLogin />} />
            <Route path="/adminregister" element={<AdminRegister />} />
          </Route>
          <Route path="/" element={<AdminApp />}>
            <Route path="/adminstore" element={<AdminHome />} />
            <Route path="/adminstore/:storeId" element={<AdminStore />} />
          </Route>
      </Routes>

    </BrowserRouter>
      </ThemeProvider>
  );
}

export default App;
