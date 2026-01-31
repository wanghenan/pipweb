import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { articlesData } from '../articles-data';

function ArticlePage() {
  const { id } = useParams();
  const articleId = parseInt(id);
  const article = articlesData.find(a => a.id === articleId);
  
  if (!article) {
    return (
      <div className="container">
        <header className="hero">
          <h1>文章不存在</h1>
          <p className="subtitle">抱歉，您要查看的文章不存在</p>
          <Link to="/articles" className="btn-link primary" style={{ marginTop: '20px' }}>
            返回文章列表
          </Link>
        </header>
      </div>
    );
  }
  
  return (
    <div className="container">
      <Link to="/articles" className="back-link">
        ← 返回文章列表
      </Link>
      
      <article className="article-detail">
        <header className="article-header">
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta">
            <span>{article.date}</span>
            <span>{article.readTime}</span>
            <span>👁 {article.views}</span>
          </div>
          <div className="article-tags">
            {article.tags.map((tag, index) => (
              <span key={index} className="tag">
                {tag}
              </span>
            ))}
          </div>
        </header>
        
        <div 
          className="article-content"
          dangerouslySetInnerHTML={{ __html: article.html }}
        />
      </article>
      
      <footer className="article-footer">
        <p>© 2026 Hernon</p>
      </footer>
    </div>
  );
}

export default ArticlePage;
