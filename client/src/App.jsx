import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setToken, setUserId } from './store/slices/authSlice';
import Profile from './pages/Profile';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      dispatch(setToken(token));
      dispatch(setUserId(userId));
      setIsLoggedIn(true);
      // navigate('/dashboard', { replace: true });
    } else {
      setIsLoggedIn(false);
    }
  }, [dispatch, navigate]);

  useEffect(() => {
    const protectedRoutes = ['/dashboard', '/profile'];
    const currentPath = window.location.pathname;

    if (!isLoggedIn && protectedRoutes.includes(currentPath)) {
      navigate('/', { replace: true });
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className='App h-[100vh] overflow-hidden'>
      <Navbar />
      <Routes>
        <Route path="/" element={isLoggedIn ? <Dashboard /> : <Login />} />
        <Route 
          path="/dashboard" 
          element={isLoggedIn ? <Dashboard /> : <Login />} 
        />
        <Route 
          path="/profile" 
          element={isLoggedIn ? <Profile /> : <Login />} 
        />
      </Routes>
    </div>
  )
}

export default App;