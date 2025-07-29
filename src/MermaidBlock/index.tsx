import React, { memo, useMemo, useRef, useState } from 'react';
import { MermaidProps } from '../types';
import { CodeBlockWrap, CodeBlockActions, HighlightCode, useLocale, Segmented } from 'ds-markdown';
import RenderGraph, { RenderGraphRef } from './RenderGraph';
import RenderCode from './RenderCode';
import MermaidBlockActions from './components/MermaidBlockActions';
import { GraphProvider } from './context';
import { PanZoomState } from '../panZoomState';

const MermaidBlock: React.FC<MermaidProps> = (props) => {
  const { code, isComplete = false } = props;
  const [activeSegmented, setActiveSegmented] = useState('mermaid');
  const renderGraphRef = useRef<RenderGraphRef>(null);
  const locale = useLocale();
  const panZoomState = useMemo(() => {
    return new PanZoomState({
      autoZoomOut: false, // 禁用自动缩放，保持原始大小
    });
  }, []);
  return (
    <GraphProvider isComplete={isComplete} panZoomState={panZoomState} svgHeight={380}>
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
            {activeSegmented === 'mermaid' ? (
              <div className="md-code-block-header-actions" style={{ gap: 0 }}>
                <MermaidBlockActions graphRef={renderGraphRef} code={code} />{' '}
              </div>
            ) : (
              <CodeBlockActions codeContent={code} language="mermaid" />
            )}
          </>
        }
      >
        <div style={{ display: activeSegmented === 'mermaid' ? 'block' : 'none' }}>
          <RenderGraph code={code} isComplete={isComplete} ref={renderGraphRef} />
        </div>
        <div style={{ display: activeSegmented === 'code' ? 'block' : 'none' }}>
          <RenderCode code={code} />
        </div>
      </CodeBlockWrap>
    </GraphProvider>
  );
};

export default memo(MermaidBlock);
