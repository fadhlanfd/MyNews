// App.tsx
import React from 'react';
import Header from './components/header/Header.tsx';
import Footer from './components/footer/Footer.tsx';
import Routes from './Routes.tsx';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <Routes />
      <Footer />
    </div>
  );
};

export default App;
