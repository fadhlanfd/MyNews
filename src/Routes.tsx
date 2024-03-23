// src/Routes.tsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate untuk mengarahkan rute default
import NewsList from './components/NewsList.tsx';
import ListArticles from './components/listarticles/ListArticle.tsx';

const RoutesComponent: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/headline-news" />} />
        <Route path="/headline-news" element={<NewsList />} />
        <Route path="/list-articles" element={<ListArticles />} />
      </Routes>
    </Router>
  );
};

export default RoutesComponent;
