import React, { useMemo } from 'react';
import { GraphProvider } from '../../context';
import { PanZoomState } from '../../../panZoomState';
import './index.css';
import { createPortal } from 'react-dom';
import RenderGraph from '../../RenderGraph';

interface FullscreenProps {
  code: string;
}

const FullscreenModalInner: React.FC<FullscreenProps> = ({ code }) => {
  return (
    <div className="mermaid-fullscreen">
      <div className="mermaid-fullscreen__header">aaa</div>
      <div className="mermaid-fullscreen__content">
        <RenderGraph code={code} isComplete={true} />
      </div>
    </div>
  );
};

const FullscreenModal: React.FC<FullscreenProps> = (props: FullscreenProps) => {
  const panZoomState = useMemo(() => {
    return new PanZoomState();
  }, []);
  const el = (
    <GraphProvider isComplete={true} panZoomState={panZoomState} svgHeight={800}>
      <FullscreenModalInner code={props.code} />
    </GraphProvider>
  );
  return createPortal(el, document.body);
};

export default FullscreenModal;
