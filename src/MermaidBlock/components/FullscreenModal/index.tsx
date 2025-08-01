import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SuccessButton, useLocale } from 'ds-markdown';
import { GraphProvider } from '../../context';
import { PanZoomState } from '../../../panZoomState';
import RenderGraph, { RenderGraphRef } from '../../RenderGraph';
import Loading from '../Loading';
import { DownloadIcon, CopyIcon } from '../Icon';
import MermaidBlockActions from '../MermaidBlockActions';
import './index.css';

interface FullscreenProps {
  code: string;
  onClose?: () => void;
}

const FullscreenModal: React.FC<FullscreenProps> = ({ code, onClose }) => {
  const [height, setHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null!);
  const renderGraphRef = useRef<RenderGraphRef>(null);

  const locale = useLocale();

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
    <GraphProvider isComplete={true} panZoomState={panZoomState} svgHeight={height} isFullscreen={true}>
      <div className="ds-markdown mermaid-fullscreen">
        <div className="mermaid-fullscreen__header">
          <div className="mermaid-fullscreen__header-center">
            <SuccessButton icon={<DownloadIcon size={24} />} onClick={handleDownload} executeText={locale.mermaid?.downloadedImage || 'Downloaded'}>
              {locale.mermaid?.downloadImage || 'Download Image'}
            </SuccessButton>
            <SuccessButton icon={<CopyIcon size={24} />} onClick={handleCopy} executeText={locale.mermaid?.copiedImage || 'Copied'}>
              {locale.mermaid?.copyImage || 'Copy Image'}
            </SuccessButton>
          </div>
          <div className="mermaid-fullscreen__header-right">
            <MermaidBlockActions graphRef={renderGraphRef} code={code} isFullscreen={true} onExitFullscreen={onClose} />
          </div>
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
