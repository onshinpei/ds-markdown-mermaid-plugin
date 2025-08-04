import React from 'react';
import { ConfigProvider, Markdown } from 'ds-markdown';
import en from 'ds-markdown/i18n/en';
// import plugin from '../src/plugin';
import plugin from 'ds-markdown-mermaid-plugin';
import 'ds-markdown/style.css';

import markdownContent from './markdown.md?raw';

const MarkdownExample: React.FC = () => {
  // 配置mermaid
  const mermaidConfig = {
    theme: 'light',
    // headerActions: false,
  };

  return (
    <ConfigProvider mermaidConfig={mermaidConfig} locale={en}>
      <div className="markdown-example">
        <div className="markdown-container">
          <Markdown interval={16} plugins={[plugin]} timerType="setTimeout" disableTyping={false} theme="light">
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MarkdownExample;
