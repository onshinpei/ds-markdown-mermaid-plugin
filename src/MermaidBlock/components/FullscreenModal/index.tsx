import React, { useCallback, useEffect, useLayoutEffect, useMemo, useState } from 'react';
import { GraphProvider } from '../../context';
import { PanZoomState } from '../../../panZoomState';

import { createPortal } from 'react-dom';
import RenderGraph from '../../RenderGraph';
import Loading from '../Loading';
import './index.css';

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
  const [height, setHeight] = useState(0);

  const panZoomState = useMemo(() => {
    return new PanZoomState({
      autoZoomOut: false, // 禁用自动缩放，保持原始大小
    });
  }, []);

  const listenResize = useCallback(() => {
    setHeight(document.body.clientHeight);
  }, []);

  useLayoutEffect(() => {
    listenResize();
    window.addEventListener('resize', listenResize);
    return () => {
      window.removeEventListener('resize', listenResize);
    };
  }, []);

  if (height === 0) {
    return createPortal(
      <div className="mermaid-fullscreen">
        <Loading />
      </div>,
      document.body,
    );
  }

  const el = (
    <GraphProvider isComplete={true} panZoomState={panZoomState} svgHeight={height}>
      <FullscreenModalInner code={props.code} />
    </GraphProvider>
  );
  return createPortal(el, document.body);
};

export default FullscreenModal;
