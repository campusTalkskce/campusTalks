import React, { useState, useEffect, useRef } from 'react';
import './Technews.css';
import Navigation from './Navigation';

export default function Technews() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const hasFetched = useRef(false); // ✅ correct place

  useEffect(() => {
    if (hasFetched.current) return; // ✅ prevents double API call (React Strict Mode)
    hasFetched.current = true;

    async function fetchAllTechNews() {
      setLoading(true);
      setError(null);

      try {
        const query = encodeURIComponent(
          '"Artificial Intelligence" OR "Machine Learning" OR "Generative AI" OR Cybersecurity OR Blockchain OR DevOps OR Robotics OR "Internet of Things" OR "Embedded Systems"'
        );

        const apiKey = import.meta.env.VITE_GNEWS_API_KEY; // ⚠️ use .env in production

        if (!apiKey) {
          setError("API Key is missing.");
          setLoading(false);
          return;
        }

        const apiUrl = `https://gnews.io/api/v4/top-headlines?category=technology&lang=en&country=in&q=${query}&max=10&apikey=${apiKey}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const data = await response.json();

        // remove duplicate articles
        const uniqueArticles = Array.from(
          new Map(data.articles.map(article => [article.url, article])).values()
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

              {article.image && (
                <img src={article.image} alt={article.title} />
              )}

              <p className="article-source">
                Source: {article.source.name}
              </p>

              <p>
                {article.description || 'No description available.'}
              </p>

              <a
                className="read-more"
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more...
              </a>
            </div>
          ))}
        </main>

      </div>
    </div>
  );
}