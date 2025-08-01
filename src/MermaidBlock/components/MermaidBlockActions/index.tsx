import React, { useContext, useState } from 'react';
import { DownloadIcon, DownScaleIcon, FullScreenIcon, UpScaleIcon } from '../Icon';
import { IconButton, Button, useLocale } from 'ds-markdown';

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
  const { panZoomState, isComplete } = useContext(GraphContext);

  const zoomIn = () => {
    panZoomState.zoomIn();
  };

  const zoomOut = () => {
    panZoomState.zoomOut();
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
      {!isFullscreen && <FullscreenBtn code={code} />}

      <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

      <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }} disabled={!isComplete} onClick={handleDownload}>
        {locale?.mermaid?.download || 'Download'}
      </Button>
    </>
  );
};

export default MermaidBlockActions;
