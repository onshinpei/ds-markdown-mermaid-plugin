import React from 'react';
import { ConfigProvider, Markdown } from 'ds-markdown';
import plugin from '../src/plugin';
import 'ds-markdown/style.css';

const MarkdownExample: React.FC = () => {
  const markdownContent = `
## 流程图示例

\`\`\`mermaid
graph TD
    A[开始] --> B{判断条件}
    B -->|是| C[处理A]
    B -->|否| D[处理B]
    C --> E[结束]
    D --> E
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
          <Markdown interval={30} plugins={[plugin]} timerType="setTimeout">
            {markdownContent}
          </Markdown>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default MarkdownExample;
