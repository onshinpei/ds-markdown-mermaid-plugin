import React, { useContext, useState } from 'react';
import { CloseIcon, DownloadIcon, DownScaleIcon, FitIcon, FullScreenIcon, UpScaleIcon } from '../Icon';
import { IconButton, Button, useLocale, useConfig } from 'ds-markdown';

import { RenderGraphRef } from '../../RenderGraph';
import GraphContext, { GraphProvider } from '../../context';
import FullscreenModal from '../FullscreenModal';
import ToolTip from '../../../components/ToolTip';
import FullscreenBtn from './FullscreenBtn';

interface MermaidBlockActionsProps {
  graphRef: React.RefObject<RenderGraphRef>;
  code: string;
  onExitFullscreen?: () => void;
  isFullscreen?: boolean;
}

const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = ({ code, graphRef, onExitFullscreen, isFullscreen }) => {
  const locale = useLocale();
  const config = useConfig();

  const showMermaidActions = config.mermaidConfig?.headerActions;
  const { panZoomState, isComplete } = useContext(GraphContext);

  const zoomIn = () => {
    panZoomState.zoomIn();
  };

  const zoomOut = () => {
    panZoomState.zoomOut();
  };

  const fit = () => {
    panZoomState.fit();
  };

  // 下载图片处理函数
  const handleDownload = async () => {
    if (graphRef.current) {
      try {
        await graphRef.current.download();
      } catch (error) {
        console.error('Download failed:', error);
      }
    }
  };

  if (showMermaidActions === false) {
    return null;
  }

  if (typeof showMermaidActions === 'function') {
    return showMermaidActions({
      graphSvg: graphRef.current?.getSvg() as SVGElement,
    });
  }

  return (
    <>
      <ToolTip title={locale?.mermaid?.zoomOut || 'Zoom Out'}>
        <span>
          <IconButton icon={<DownScaleIcon size={24} />} onClick={zoomOut} disabled={!isComplete} />
        </span>
      </ToolTip>
      <div style={{ width: 8 }} />
      <ToolTip title={locale?.mermaid?.zoomIn || 'Zoom In'}>
        <span>
          <IconButton icon={<UpScaleIcon size={24} />} onClick={zoomIn} disabled={!isComplete} />
        </span>
      </ToolTip>
      <div style={{ width: 8 }} />
      <ToolTip title={locale?.mermaid?.fitInView || 'Fit in view'}>
        <span>
          <IconButton icon={<FitIcon size={24} />} onClick={fit} disabled={!isComplete} />
        </span>
      </ToolTip>
      <div style={{ width: 8 }} />
      {!isFullscreen && <FullscreenBtn code={code} />}

      <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

      {isFullscreen ? (
        <>
          <IconButton icon={<CloseIcon size={24} />} onClick={onExitFullscreen} />
        </>
      ) : (
        <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }} disabled={!isComplete} onClick={handleDownload}>
          {locale?.mermaid?.download || 'Download'}
        </Button>
      )}
    </>
  );
};

export default MermaidBlockActions;
