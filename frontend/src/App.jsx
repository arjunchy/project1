import { BrowserRouter, Routes, Route, Outlet, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import './App.css';
import Login from './components/accounts/Login';
import Navbar from './components/header/Navbar';
import DataProvider from './context/DataProvider';
import Home from './components/Pages/Home';
import CollectionView from './components/pages/CollectionView'
import CreateCollection from './components/pages/CollectionView';

const PrivateRoute = ({ isAuthenticated, setIsAuthenticated }) => {
  return isAuthenticated ? (
    <>
    <Navbar setIsAuthenticated={setIsAuthenticated} />
      <Outlet />
    </>
  ) : (
    <Navigate replace to='/login' />
  );
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const storedAuthStatus = localStorage.getItem('isAuthenticated');
    return storedAuthStatus === 'true'; 
  });

  useEffect(() => {
    localStorage.setItem('isAuthenticated', isAuthenticated);
  }, [isAuthenticated]);

  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
          
          <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} />}>
            <Route path="/create" element={<CollectionView />} />
          </Route>

          <Route path="/createcollection" element={<CreateCollection/>} />

        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
