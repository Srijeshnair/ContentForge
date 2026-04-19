import { useState } from 'react';
import AppLayout from './layouts/AppLayout';
import HomePage from './pages/HomePage';
import GeneratorPage from './pages/GeneratorPage';

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'generator'>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'generator':
        return <GeneratorPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <AppLayout onNavigate={setCurrentPage}>
      {renderPage()}
    </AppLayout>
  );
}

export default App;
