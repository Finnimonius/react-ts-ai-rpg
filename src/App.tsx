import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/App.css'
import AppLayout from './components/layout/AppLayout';
import PageLoader from './components/UI/PageLoader';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import { useAuthStore } from './stores/authStore';
import { motion } from 'framer-motion';
import { useCharacterStore } from './stores/characterStore';
import { useGameStore } from './stores/gameStore';

const Home = lazy(() => import('./pages/Home'));
const CharacterCreator = lazy(() => import('./pages/CharacterCreator'));
const Game = lazy(() => import('./pages/Game'));
const Rules = lazy(() => import('./pages/Rules'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));


export default function App() {
  const location = useLocation();

  const user = useAuthStore(state => state.user);
  const isAuthLoading = useAuthStore(state => state.isLoading);
  const isCharLoading = useCharacterStore(state => state.isLoading);
  const isGameLoading = useGameStore(state => state.isInitialLoading);
  
  const checkAuth = useAuthStore(state => state.checkAuth);
  const loadCharacter = useCharacterStore(state => state.loadCharacter);
  const loadGame = useGameStore(state => state.loadGame);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (user) {
      loadCharacter();
      loadGame();
    }
  }, [user, loadCharacter, loadGame]);

  const isLoading = isAuthLoading || (user && (isCharLoading || isGameLoading));

  if (isLoading) {
    return <PageLoader />
  }

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<PageLoader />}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0.9 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.1 }}
          style={{ minHeight: '100vh' }}
        >
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
        </motion.div>
      </Suspense>
    </AnimatePresence>
  )
}
