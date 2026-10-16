import { Route, Routes } from 'react-router';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import MediaPage from './pages/MediaPage';
import AboutPage from './pages/AboutPage';
import CalculatorPage from './pages/CalculatorPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <>
      <Navigation />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/media" element={<MediaPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/calculator" element={<CalculatorPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
    </>
  );
}
