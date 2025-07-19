import React, { memo } from 'react';
import { MermaidProps } from '../types';
import { CodeBlockWrap, CodeBlockActions } from 'ds-markdown';
import { MermaidConfig } from 'mermaid';
import RenderGraph from './RenderGraph';
import tabs from './components/Tabs';

const MermaidBlock: React.FC<MermaidProps> = ({ code }) => {
  return (
    <CodeBlockWrap
      title={
        <>
          <Tabs
            items={[
              {
                label: '图表',
                value: 'mermaid',
              },
              {
                label: '代码',
                value: 'code',
              },
            ]}
          />
          {/* <div>aaass</div>
          <CodeBlockActions codeContent={code} language="mermaid" /> */}
        </>
      }
    >
      <RenderGraph code={code} />
    </CodeBlockWrap>
  );
};

export default memo(MermaidBlock);
