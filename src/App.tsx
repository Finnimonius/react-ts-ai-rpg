import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import './styles/App.css'
import AppLayout from './components/layout/AppLayout';
import PageLoader from './components/UI/PageLoader';


const Home = lazy(() => import('./pages/Home'));
const CharacterCreator = lazy(() => import('./pages/CharacterCreator'));
const Game = lazy(() => import('./pages/Game'));
const Rules = lazy(() => import('./pages/Rules'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));
const Gameplay = lazy(() => import('./pages/Gameplay'));


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
          <Route path='play' element={<Game />} />
          <Route path="/play/:step" element={<Game />} />
          <Route path='/play/game/*' element={<Gameplay />} />
          <Route path='*' element={<NotFoundPage />} />
        </Route>
      </Routes>
      </Suspense>
    </AnimatePresence>
  )
}
