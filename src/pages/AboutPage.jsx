import React from 'react';

function AboutPage() {
  return (
    <div className="container">
      <header className="hero">
        <h1>关于我</h1>
        <p className="subtitle">技术管理&解决方案</p>
      </header>
      
      <section className="info-section">
        <div className="info-card">
          <div className="info-item">
            <h3>核心理念</h3>
            <p>精确表达需求、量化交付标准、主导核心判断，将 AI 从工具进化为深度合作伙伴。</p>
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
      
      <section className="creations-section">
        <h2>联系我</h2>
        <p className="section-intro">可以通过以下方式与我交流</p>
        
        <div className="buttons-grid" style={{ justifyContent: 'flex-start' }}>
          <a 
            href="mailto:976062158@qq.com" 
            className="btn-link primary"
          >
            邮件联系
          </a>
          <a 
            href="https://github.com/wanghenan" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link csdn"
          >
            GitHub
          </a>
          <a 
            href="https://blog.csdn.net/qq_33618717?type=blog" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-link csdn"
          >
            CSDN博客
          </a>
        </div>
      </section>
      
      <footer>
        <p>© 2026 Hernon</p>
      </footer>
    </div>
  );
}

export default AboutPage;
