import React from 'react';
import { ConfigProvider, Markdown } from 'ds-markdown';
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
`;

  // 配置mermaid
  const mermaidConfig = {
    theme: 'default',
    flowchart: {
      useMaxWidth: true,
      htmlLabels: true,
    },
    sequence: {
      useMaxWidth: true,
      diagramMarginX: 50,
      diagramMarginY: 10,
    },
    gantt: {
      useMaxWidth: true,
    },
  };

  return (
    <ConfigProvider mermaidConfig={mermaidConfig}>
      <div className="markdown-example">
        <div className="markdown-container">
          <Markdown interval={100} plugins={[plugin]} timerType="setTimeout" disableTyping={false}>
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MarkdownExample;
