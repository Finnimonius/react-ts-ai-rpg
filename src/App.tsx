import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/App.css'
import AppLayout from './components/layout/AppLayout';
import PageLoader from './components/UI/PageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';

const Home = lazy(() => import('./pages/Home'));
const CharacterCreator = lazy(() => import('./pages/CharacterCreator'));
const Game = lazy(() => import('./pages/Game'));
const Rules = lazy(() => import('./pages/Rules'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
// const Gameplay = lazy(() => import('./pages/Gameplay'));


export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
      <Routes location={location} key={location.pathname}>
        <Route path='/' element={<AppLayout />}>
          <Route index element={<Home />} />
          <Route path='rules' element={<Rules />} />
          <Route path='charactercreator' element={<CharacterCreator />} />
          <Route path="login" element={<Login />} />
          <Route path='play/:step?/*' element={
            <ProtectedRoute>
              <Game />
            </ProtectedRoute>
          } />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
