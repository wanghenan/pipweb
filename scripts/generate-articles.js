import fs from 'fs';
import path from 'path';
import { marked } from 'marked';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const KNOWLEDGE_BASE = '/Users/lu.gao/workspace/personal/知识库';
const OUTPUT_FILE = path.join(__dirname, '../src/articles-data.js');

// Configure marked
marked.setOptions({
  gfm: true,
  breaks: true
});

// Helper function to estimate read time (Chinese text ~300 chars per minute)
function estimateReadTime(html) {
  const text = html.replace(/<[^>]*>/g, '').replace(/\s+/g, '');
  const chineseChars = text.length;
  const minutes = Math.max(1, Math.ceil(chineseChars / 300));
  return `${minutes}分钟`;
}

// Helper function to extract description (first paragraph)
function extractDescription(markdown) {
  // Remove title
  const content = markdown.replace(/^# .+\n/, '');
  // Get first paragraph
  const match = content.match(/^.{1,200}[。！？]/);
  if (match) {
    return match[0].trim();
  }
  // Fallback: take first 150 chars
  return content.substring(0, 150).trim() + '...';
}

// Helper function to escape HTML for template literal
function escapeHtmlForTemplate(str) {
  return str
    .replace(/\\/g, '\\\\')
    .replace(/`/g, '\\`')
    .replace(/\$/g, '\\$')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r')
    .replace(/\t/g, '\\t');
}

// Process a single markdown file
function processMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const filename = path.basename(filePath, '.md');
  
  // Use filename as title (remove .md extension and clean up)
  const title = filename.replace(/-/g, ' ').replace(/\s+/g, ' ').trim();
  
  // Remove title line and convert to HTML
  const markdownBody = content.replace(/^# .+\n/, '');
  const html = marked.parse(markdownBody);
  
  // Extract date from filename or use current date
  const dateMatch = filename.match(/(\d{4}-\d{2}-\d{2})/);
  const date = dateMatch ? dateMatch[1] : '2025-01-31';
  
  // Estimate read time
  const readTime = estimateReadTime(html);
  
  // Extract description
  const description = extractDescription(markdownBody);
  
  // Determine tags based on path
  const tags = filePath.includes('AI智能体') 
    ? ['AI智能体', '技术文章'] 
    : ['微服务架构设计', '技术文章'];
  
  return {
    id: Date.now() + Math.random() * 1000,
    title,
    description,
    date,
    readTime,
    views: Math.floor(Math.random() * 5000) + 100,
    tags,
    html
  };
}

// Main function
function generateArticlesData() {
  const articles = [];
  
  // Process AI智能体 articles
  const aiDir = path.join(KNOWLEDGE_BASE, 'AI智能体');
  if (fs.existsSync(aiDir)) {
    const aiFiles = fs.readdirSync(aiDir)
      .filter(f => f.endsWith('.md'))
      .sort();
    
    for (const file of aiFiles) {
      const filePath = path.join(aiDir, file);
      try {
        const article = processMarkdownFile(filePath);
        articles.push(article);
        console.log(`Processed: ${article.title}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }
  
  // Process 微服务架构设计 articles
  const msDir = path.join(KNOWLEDGE_BASE, '微服务架构设计');
  if (fs.existsSync(msDir)) {
    const msFiles = fs.readdirSync(msDir)
      .filter(f => f.endsWith('.md'))
      .sort();
    
    for (const file of msFiles) {
      const filePath = path.join(msDir, file);
      try {
        const article = processMarkdownFile(filePath);
        articles.push(article);
        console.log(`Processed: ${article.title}`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error.message);
      }
    }
  }
  
  // Sort by date (newest first)
  articles.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  // Generate JavaScript file
  let jsContent = 'export const articlesData = [\n';
  
  for (const article of articles) {
    jsContent += '  {\n';
    jsContent += '    id: ' + Math.floor(article.id) + ',\n';
    jsContent += '    title: "' + escapeHtmlForTemplate(article.title) + '",\n';
    jsContent += '    description: "' + escapeHtmlForTemplate(article.description) + '",\n';
    jsContent += '    date: "' + article.date + '",\n';
    jsContent += '    readTime: "' + article.readTime + '",\n';
    jsContent += '    views: ' + article.views + ',\n';
    jsContent += '    tags: ' + JSON.stringify(article.tags) + ',\n';
    // Replace triple backticks with HTML entity to avoid template literal issues
    const safeHtml = article.html.replace(/```/g, '`&zwnj;`');
    jsContent += '    html: `' + escapeHtmlForTemplate(safeHtml) + '`\n';
    jsContent += '  },\n';
  }
  
  jsContent += '];\n';
  
  // Write to file
  fs.writeFileSync(OUTPUT_FILE, jsContent, 'utf-8');
  console.log(`\nGenerated ${articles.length} articles to ${OUTPUT_FILE}`);
}

generateArticlesData();
