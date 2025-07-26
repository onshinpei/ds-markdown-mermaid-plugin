import React from 'react';
import { ConfigProvider, Markdown } from 'ds-markdown';
import en from 'ds-markdown/i18n/en';
import plugin from '../src/plugin';
import 'ds-markdown/style.css';

const MarkdownExample: React.FC = () => {
  const markdownContent = `
\`\`\`mermaid
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`

\`\`\`shell
flowchart TD
    A[Christmas] -->|Get money| B(Go shopping)
    B --> C{Let me think}
    C -->|One| D[Laptop]
    C -->|Two| E[iPhone]
    C -->|Three| F[fa:fa-car Car]
\`\`\`
`;

  // 配置mermaid
  const mermaidConfig = {
    theme: 'light',
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
