import React, { useState, useEffect, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { articlesData } from '../articles-data';

function ArticlesPage() {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('q') || '';
  const [selectedTag, setSelectedTag] = useState('');
  const [filteredArticles, setFilteredArticles] = useState([]);
  
  // Get all unique tags (exclude "技术文章" from filter)
  const allTags = useMemo(() => {
    const tags = new Set();
    articlesData.forEach(article => {
      article.tags.forEach(tag => {
        if (tag !== '技术文章') {
          tags.add(tag);
        }
      });
    });
    return Array.from(tags).sort();
  }, []);
  
  useEffect(() => {
    let filtered = articlesData;
    
    // Filter by search query
    if (searchQuery.trim()) {
      const lowerQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(article => 
        article.title.toLowerCase().includes(lowerQuery) ||
        article.description.toLowerCase().includes(lowerQuery) ||
        article.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
      );
    }
    
    // Filter by selected tag
    if (selectedTag) {
      filtered = filtered.filter(article => 
        article.tags.includes(selectedTag)
      );
    }
    
    setFilteredArticles(filtered);
  }, [searchQuery, selectedTag]);
  
  const displayArticles = searchQuery.trim() || selectedTag ? filteredArticles : articlesData;
  
  return (
    <div className="container">
      <header className="hero">
        <h1>文章</h1>
        <p className="subtitle">
          {searchQuery 
            ? `搜索结果: "${searchQuery}" (${displayArticles.length} 篇)`
            : selectedTag
              ? `标签筛选: ${selectedTag} (${displayArticles.length} 篇)`
              : `共 ${articlesData.length} 篇文章，关于产品思考、技术学习和生活感悟的文字沉淀`}
        </p>
        {(searchQuery || selectedTag) && (
          <div style={{ marginTop: '15px' }}>
            {(searchQuery || selectedTag) && (
              <Link to="/articles" style={{ color: '#666', textDecoration: 'none', marginRight: '15px' }}>
                ← 清除筛选
              </Link>
            )}
          </div>
        )}
      </header>
      
      {/* Tag Filter */}
      <div className="tag-filter" style={{ marginBottom: '30px' }}>
        <span style={{ marginRight: '10px', color: '#666' }}>标签筛选:</span>
        <button 
          onClick={() => setSelectedTag('')}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: selectedTag === '' ? '2px solid #333' : '1px solid #ddd',
            background: selectedTag === '' ? '#333' : '#fff',
            color: selectedTag === '' ? '#fff' : '#333',
            cursor: 'pointer',
            marginRight: '8px',
            marginBottom: '8px',
            fontSize: '0.9em'
          }}
        >
          全部
        </button>
        {allTags.map(tag => (
          <button 
            key={tag}
            onClick={() => setSelectedTag(tag === selectedTag ? '' : tag)}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: selectedTag === tag ? '2px solid #333' : '1px solid #ddd',
              background: selectedTag === tag ? '#333' : '#fff',
              color: selectedTag === tag ? '#fff' : '#333',
              cursor: 'pointer',
              marginRight: '8px',
              marginBottom: '8px',
              fontSize: '0.9em'
            }}
          >
            {tag}
          </button>
        ))}
      </div>
      
      {displayArticles.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#888' }}>没有找到相关文章</p>
      ) : (
        <section className="articles-section">
          <div className="article-list">
            {displayArticles.map(article => (
              <Link to={`/article/${article.id}`} key={article.id} className="article-item">
                <h3>{article.title}</h3>
                <p>{article.description}</p>
                <div className="article-meta">
                  <span>{article.date}</span>
                  <span>{article.readTime}</span>
                  <span>👁 {article.views}</span>
                  <div style={{ marginLeft: 'auto', display: 'flex', gap: '6px' }}>
                    {article.tags.map((tag, index) => (
                      <span 
                        key={index}
                        style={{ 
                          padding: '2px 8px', 
                          backgroundColor: '#f5f5f5', 
                          borderRadius: '12px',
                          fontSize: '0.75em',
                          color: '#888'
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}
      
      <footer>
        <p>© 2026 Hernon</p>
      </footer>
    </div>
  );
}

export default ArticlesPage;
