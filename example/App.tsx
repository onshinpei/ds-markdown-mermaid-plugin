import React, { useState } from 'react';
import MarkdownExample from './MarkdownExample';

const App: React.FC = () => {
  return (
    <div className="app">
      {/* <header className="app-header">
        <h1>ds-markdown-mermaid-plugin 演示</h1>
        <p>一个用于在React应用中渲染Mermaid图表的轻量级组件和rehype插件</p>
      </header> */}

      <main className="content">
        <div className="example active">
          <h2>React-Markdown + rehypeMermaid 示例</h2>
          <p>这个示例展示了如何在 react-markdown 中使用 rehypeMermaid 插件来渲染 Mermaid 图表。</p>

          <MarkdownExample />
        </div>
      </main>

      <footer className="app-footer">
        <p>
          <a href="https://github.com/your-username/react-mermaid" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          {' | '}
          <a href="https://mermaid.js.org/" target="_blank" rel="noopener noreferrer">
            Mermaid 文档
          </a>
        </p>
      </footer>
    </div>
  );
};

export default App;
