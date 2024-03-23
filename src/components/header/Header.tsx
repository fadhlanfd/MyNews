// Header.tsx
import React from 'react';
import { Layout } from 'antd';
import './Header.scss';

const { Header: AntdHeader } = Layout;

const Header: React.FC = () => {
  return (
    <AntdHeader className="header">
      <div className="logo">My News</div>
      <nav className="nav">
        <ul>
          <li><a href="/headline-news">Headline News</a></li>
          <li><a href="/list-articles">List Articles</a></li>
        </ul>
      </nav>
    </AntdHeader>
  );
};

export default Header;
