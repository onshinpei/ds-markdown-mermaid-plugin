import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { GraphProvider } from '../../context';
import { PanZoomState } from '../../../panZoomState';
import { createPortal } from 'react-dom';
import RenderGraph, { RenderGraphRef } from '../../RenderGraph';
import Loading from '../Loading';
import { Button } from 'ds-markdown';
import { DownloadIcon, CopyIcon } from '../Icon';
import SuccessButton from '../SuccessButton';

import './index.css';

interface FullscreenProps {
  code: string;
  onClose?: () => void;
}

const FullscreenModal: React.FC<FullscreenProps> = ({ code, onClose }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null!);
  const renderGraphRef = useRef<RenderGraphRef>(null);

  const panZoomState = useMemo(() => {
    return new PanZoomState({
      autoZoomOut: false, // 禁用自动缩放，保持原始大小
      mouseWheelZoomEnabled: true,
    });
  }, []);

  const listenResize = useCallback(() => {
    setHeight(contentRef.current.clientHeight);
  }, []);

  useLayoutEffect(() => {
    listenResize();
    window.addEventListener('resize', listenResize);
    return () => {
      window.removeEventListener('resize', listenResize);
    };
  }, []);

  // 下载图片处理函数
  const handleDownload = async () => {
    if (renderGraphRef.current) {
      return renderGraphRef.current.download();
    }
  };

  // 复制图片处理函数
  const handleCopy = async () => {
    if (renderGraphRef.current) {
      return renderGraphRef.current.copy();
    }
  };

  const el = (
    <GraphProvider isComplete={true} panZoomState={panZoomState} svgHeight={height}>
      <div className="ds-markdown mermaid-fullscreen">
        <div className="mermaid-fullscreen__header">
          <div className="mermaid-fullscreen__header-center">
            <SuccessButton icon={<DownloadIcon size={24} />} onClick={handleDownload} executeText="已下载">
              下载图片
            </SuccessButton>
            <SuccessButton icon={<CopyIcon size={24} />} onClick={handleCopy} executeText="已复制">
              复制图片
            </SuccessButton>
          </div>
          <div className="mermaid-fullscreen__header-right"></div>
        </div>
        <div className="mermaid-fullscreen__content" ref={contentRef}>
          {height > 0 ? <RenderGraph code={code} isComplete={true} ref={renderGraphRef} /> : <Loading />}
        </div>
      </div>
    </GraphProvider>
  );
  return createPortal(el, document.body);
};

export default FullscreenModal;
