import React from 'react';
import { Link } from 'react-router-dom';
import { articlesData } from '../articles-data';

function HomePage() {
  const featuredArticles = articlesData.slice(0, 3);
  const latestArticles = articlesData.slice(0, 5);
  
  return (
    <div className="container">
      {/* Hero Section */}
      <header className="hero">
        <h1>你好，我是 Hernon</h1>
        <p className="subtitle">精确表达需求、量化交付标准、主导核心判断，将 AI 从工具进化为深度合作伙伴。</p>
      </header>
      
      {/* Buttons Section */}
      <section className="buttons-section">
        <div className="buttons-grid">
          <Link to="/articles" className="btn-link primary">
            阅读文章
          </Link>
          <a 
            href="https://blog.csdn.net/qq_33618717?type=blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link csdn"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.015 7.338c4.734-.622 7.676 2.044 8.503 5.365.471 1.895.272 3.712-.535 4.936-1.016 1.543-2.779 2.674-4.836 2.549-2.711-.165-3.683-2.373-5.303-4.045-1.03-1.063-1.94-1.148-2.378-.105-.628 1.494-1.127 3.131-1.913 4.563-1.336 2.436-4.043 2.765-5.666 1.118-1.437-1.46-1.378-4.478.108-5.893 3.027-2.882 7.688-5.17 12.02-5.888z"/>
            </svg>
            博客
          </a>
          <a 
            href="https://www.xiaohongshu.com/user/profile/6471d187000000002a03561e" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link xiaohongshu"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.987 2.194c-3.05-.09-5.787 1.847-6.833 4.792a6.085 6.085 0 00-1.27 4.147c.14.65.49 1.263.987 1.76a5.7 5.7 0 013.15 3.867c.39 1.244.18 2.608-.56 3.679-.75 1.084-1.91 1.72-3.19 1.72-1.02 0-2.03-.34-2.9-.98-1.15-.85-1.84-2.08-1.92-3.43-.11-1.93.55-3.79 1.8-5.1a9.21 9.21 0 013.84-2.49c2.05-.67 4.22-.33 6.03.93 1.14.79 2.01 1.86 2.52 3.09.12.28.08.6-.1.84-.2.27-.52.4-.84.35-.32-.05-.56-.33-.61-.65a6.83 6.83 0 00-2.3-3.12 7.16 7.16 0 00-3.65-1.43c-.96-.13-1.93.11-2.75.67a4.67 4.67 0 00-1.54 1.83c-.14.35-.54.55-.91.46-.37-.1-.56-.49-.45-.84.34-1.1 1.05-2.05 2.01-2.7.95-.65 2.11-.92 3.21-.77.55.08 1.08.26 1.57.54.2.12.45.14.67.05.22-.08.37-.29.38-.52.02-.56.05-1.12.05-1.68 0-.38-.26-.71-.62-.79-.36-.08-.75.06-.94.38-.44.75-.85 1.52-1.22 2.32-.18.38-.63.58-1.04.47-.41-.1-.64-.52-.53-.93.34-1.26.82-2.44 1.43-3.52A7.28 7.28 0 0012.987 2.194z"/>
            </svg>
            小红书
          </a>
          <a 
            href="https://mindspace.xin/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link ai-product"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
            AI产品
          </a>
        </div>
      </section>
      
      {/* Info Section */}
      <section className="info-section">
        <div className="info-card">
          <div className="info-item">
            <h3>核心理念</h3>
            <p>像管理"聪明人"一样驱动 AI。通过精确表达需求、量化交付标准、主导核心判断，将 AI 从工具进化为深度合作伙伴。</p>
          </div>
          <div className="info-item">
            <h3>专业擅长</h3>
            <p>复杂需求梳理 · 标准化流程建立 · 跨团队技术管理</p>
          </div>
          <div className="info-item">
            <h3>实战沉淀</h3>
            <p>聚焦技术选型、流程优化与生产力工具集成的深度思考。</p>
          </div>
        </div>
      </section>
      
      {/* Featured Articles */}
      <section className="creations-section">
        <h2>精选文章</h2>
        <p className="section-intro">关于产品思考、技术学习和生活感悟的文字沉淀</p>
        <div className="creations-grid">
          {featuredArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="card" style={{ textDecoration: 'none', color: 'inherit' }}>
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div style={{ marginTop: '15px', fontSize: '0.85em', color: '#888' }}>
                {article.date} · {article.readTime}
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Latest Articles */}
      <section className="articles-section">
        <h2>最新文章</h2>
        <div className="article-list">
          {latestArticles.map(article => (
            <Link to={`/article/${article.id}`} key={article.id} className="article-item">
              <h3>{article.title}</h3>
              <p>{article.description}</p>
              <div className="article-meta">
                <span>{article.date}</span>
                <span>{article.readTime}</span>
                <span>👁 {article.views}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Footer */}
      <footer>
        <p>© 2026 Hernon</p>
      </footer>
    </div>
  );
}

export default HomePage;
