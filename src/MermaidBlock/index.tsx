import React, { memo, useRef, useState } from 'react';
import { MermaidProps } from '../types';
import { CodeBlockWrap, CodeBlockActions, HighlightCode, useLocale } from 'ds-markdown';
import RenderGraph, { RenderGraphRef } from './RenderGraph';
import RenderCode from './RenderCode';
import Segmented from './components/Segmented';
import MermaidBlockActions from './components/MermaidBlockActions';

const MermaidBlock: React.FC<MermaidProps> = ({ code }) => {
  const [activeSegmented, setActiveSegmented] = useState('mermaid');
  const renderGraphRef = useRef<RenderGraphRef>(null);
  const locale = useLocale();
  return (
    <CodeBlockWrap
      title={
        <>
          <Segmented
            Segmented={[
              {
                label: locale.mermaid.diagram || 'Diagram',
                value: 'mermaid',
              },
              {
                label: locale.mermaid.code || 'Code',
                value: 'code',
              },
            ]}
            value={activeSegmented}
            onChange={(value: string) => setActiveSegmented(value)}
          />
          {/* {activeSegmented === 'mermaid' ? <MermaidBlockActions /> : <CodeBlockActions codeContent={code} language="mermaid" />} */}
          {activeSegmented === 'mermaid' ? null : <CodeBlockActions codeContent={code} language="mermaid" />}
        </>
      }
    >
      <div style={{ display: activeSegmented === 'mermaid' ? 'block' : 'none' }}>
        <RenderGraph code={code} ref={renderGraphRef} />
      </div>
      <div style={{ display: activeSegmented === 'code' ? 'block' : 'none' }}>
        <RenderCode code={code} />
      </div>
    </CodeBlockWrap>
  );
};

export default memo(MermaidBlock);
