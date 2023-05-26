import { Suspense, lazy } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';

import AdvertsPage from './components/adverts/AdvertsPage';
import NewAdvertPage from './components/adverts/NewAdvertPage';
import AdvertPage from './components/adverts/AdvertPage';
import RequireAuth from './components/auth/RequireAuth';
import notFound from './assets/imagen404react.jpg';

import './App.css';

const LoginPage = lazy(() => import('./components/auth/LoginPage'));

function App() {
  return (
  
    <Suspense fallback={<div>Loading...</div>}>
      <div className="app">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route 
          path="/adverts" 
          element={
            <RequireAuth>
              <AdvertsPage />
            </RequireAuth>
          } />
          <Route 
            path="/adverts/:advertId" 
            element={
              <RequireAuth>
                <AdvertPage />
              </RequireAuth>
          } />
          <Route
            path="/adverts/new"
            element={
              <RequireAuth>
                <NewAdvertPage />
              </RequireAuth>
            }
          />
          <Route path="/" element={<Navigate to="/adverts" />} />
          <Route path="/404" element=<img id="notFound" src= {notFound} alt= "404"/> />
          <Route path="*" element={<Navigate to="/404" />} />
        </Routes>
      </div>
    </Suspense>
  );
}

export default App;
