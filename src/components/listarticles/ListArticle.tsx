import React, { useState, useEffect } from 'react';
import { Card, List, Input, Pagination, Select } from 'antd';
import axios from 'axios';
import './ListArticle.scss';

const { Option } = Select;
const { Search } = Input;

interface Article {
  title: string;
  description: string;
  urlToImage: string;
}

const ListArticle: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<Article[]>([]);
  const [searchValue, setSearchValue] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [articlesPerPage] = useState<number>(3);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('https://newsapi.org/v2/everything', {
          params: {
            q: searchQuery || 'all',
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
  }, [searchQuery]);

  const handleSearch = (value: string) => {
    setSearchValue(value);
    const filtered = articles.filter(article =>
      article.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredArticles(filtered);
    setCurrentPage(1); 
  };

  const handleSelectChange = (value: string) => {
    setSearchQuery(value); 
  };

  const indexOfLastArticle = currentPage * articlesPerPage;
  const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
  const currentArticles = filteredArticles.slice(indexOfFirstArticle, indexOfLastArticle);

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <div className="list-article-container">
      <div className="list-article-filter">
        <Select defaultValue="all" style={{ width: 120 }} onChange={handleSelectChange}>
          <Option value="all">All</Option>
          <Option value="technology">Technology</Option>
          <Option value="business">Business</Option>
          <Option value="sports">Sports</Option>
        </Select>
        <Search
          placeholder="Search articles"
          allowClear
          enterButton="Search"
          onSearch={handleSearch}
          className="list-article-search"
        />
      </div>
      <div className="articles-container">
        {currentArticles.map((article: Article) => (
          <Card
            key={article.title}
            hoverable
            className="list-article-card"
            cover={<img alt={article.title} src={article.urlToImage} className="list-article-image" />}
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
        className="list-article-pagination"
      />
    </div>
  );
};

export default ListArticle;
