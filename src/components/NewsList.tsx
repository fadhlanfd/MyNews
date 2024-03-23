import React, { useState, useEffect } from 'react';
import { Card, Input, Pagination } from 'antd';
import axios from 'axios';
import './NewsList.scss'; 

const { Search } = Input;

interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

const NewsList: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(3);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/top-headlines', {
          params: {
            country: 'us',
            apiKey: '11d7892e0f124e228e3ee5e596246fb2'
          }
        });
        setArticles(response.data.articles);
        setFilteredArticles(response.data.articles);
      } catch (error) {
        console.error('Error fetching news:', error);
      }
    };

    fetchNews();
  }, []);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1);
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="news-list-container">
      <div className="search-container">
        <Search
          placeholder="Search articles"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          className="news-list-search"
        />
      </div>
      <div className="articles-container">
        {currentArticles.map((article: Article, index: number) => (
          <Card
            key={index}
            hoverable
            className="news-list-card"
            cover={<img alt={article.title} src={article.urlToImage} className="news-list-image" />}
          >
            <Card.Meta title={article.title} description={article.description} />
          </Card>
        ))}
      </div>
      <Pagination
        current={currentPage}
        total={filteredArticles.length}
        pageSize={articlesPerPage}
        onChange={paginate}
        className="news-list-pagination"
      />
    </div>
  );
};

export default NewsList;
