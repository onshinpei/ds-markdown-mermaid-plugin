import React, { memo, useRef, useState } from 'react';
import { MermaidProps } from '../types';
import { CodeBlockWrap, CodeBlockActions, HighlightCode } from 'ds-markdown';
import { MermaidConfig } from 'mermaid';
import RenderGraph, { RenderGraphRef } from './RenderGraph';
import RenderCode from './RenderCode';
import Segmented from './components/Segmented';
import MermaidBlockActions from './components/MermaidBlockActions';

const MermaidBlock: React.FC<MermaidProps> = ({ code }) => {
  const [activeSegmented, setActiveSegmented] = useState('mermaid');
  const renderGraphRef = useRef<RenderGraphRef>(null);
  return (
    <CodeBlockWrap
      title={
        <>
          <Segmented
            Segmented={[
              {
                label: '图表',
                value: 'mermaid',
              },
              {
                label: '代码',
                value: 'code',
              },
            ]}
            value={activeSegmented}
            onChange={(value: string) => setActiveSegmented(value)}
          />
          {activeSegmented === 'mermaid' ? <MermaidBlockActions /> : <CodeBlockActions codeContent={code} language="mermaid" />}
          {/* <div>aaass</div>
          <CodeBlockActions codeContent={code} language="mermaid" /> */}
        </>
      }
    >
      {activeSegmented === 'mermaid' ? <RenderGraph code={code} ref={renderGraphRef} /> : <RenderCode code={code} />}
    </CodeBlockWrap>
  );
};

export default memo(MermaidBlock);
