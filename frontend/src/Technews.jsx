import React, { useState, useEffect } from 'react';
import './Technews.css';
import Navigation from './Navigation';

export default function Technews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    async function fetchAllTechNews() {
      setLoading(true);
      setError(null);

      const keywordGroups = [
        ['"Artificial Intelligence"', '"Machine Learning"', '"Generative AI"'],
        ['Cybersecurity', 'Blockchain', 'DevOps'],
        ['Robotics', '"Internet of Things"', '"Embedded Systems"']
      ];

      const apiKey = "5e0a40551498acd09a00bdf3bfcc0c27"; // ✅ Replace with your own key
      const articlesPerPage = 2;

      if (!apiKey) {
        setError("API Key is missing. Please create a .env file.");
        setLoading(false);
        return;
      }

      try {
        const allArticles = [];
        for (const group of keywordGroups) {
          const query = encodeURIComponent(group.join(' OR '));
          const apiUrl = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=in&q=${query}&max=${articlesPerPage}&apikey=${apiKey}`;

          const response = await fetch(apiUrl);
          if (!response.ok) {
            throw new Error(`HTTP error for query "${group.join(', ')}": Status ${response.status}`);
          }

          const data = await response.json();
          allArticles.push(...data.articles);

          
          await delay(10000);
        }

       
        const uniqueArticles = Array.from(
          new Map(allArticles.map(article => [article.url, article])).values()
        );
        setNews(uniqueArticles);

      } catch (err) {
        console.error("Failed to fetch news:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllTechNews();
  }, []);

  if (loading) {
    return <div className="status-message">Loading tech news...</div>;
  }
  if (error) {
    return <div className="status-message error">Error: {error}</div>;
  }
return (
  <div className="news-feed">
    <div className="layout">
    
      <aside className="sidebar">
       <Navigation />
        
      </aside>

   
      <main className="content">
        <h1>Latest Tech News from India</h1>
        {news.map((article, index) => (
          <div className="article" key={article.url || index}>
            <h2>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </h2>
            {article.image && <img src={article.image} alt={article.title} />}
            <p className="article-source">Source: {article.source.name}</p>
            <p>{article.description || 'No description available.'}</p>
            <a className="read-more" href={article.url} target="_blank" rel="noopener noreferrer">
              Read more...
            </a>
          </div>
        ))}
      </main>
    </div>
    </div>
  
);

}
