import React, { useContext, useState } from 'react';
import { DownloadIcon, DownScaleIcon, FullScreenIcon, UpScaleIcon } from '../Icon';
import { IconButton, ToolTip, Button, useLocale } from 'ds-markdown';
import { RenderGraphRef } from '../../RenderGraph';
import GraphContext, { GraphProvider } from '../../context';
import FullscreenModal from '../FullscreenModal';

interface MermaidBlockActionsProps {
  graphRef: React.RefObject<RenderGraphRef>;
  code: string;
}

const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = ({ code }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const locale = useLocale();
  const { panZoomState, isComplete } = useContext(GraphContext);

  const zoomIn = () => {
    panZoomState.zoomIn();
  };

  const zoomOut = () => {
    panZoomState.zoomOut();
  };

  const fullScreen = () => {
    setIsFullscreen(true);
  };

  return (
    <>
      <div className="md-code-block-header-actions" style={{ gap: 0 }}>
        <ToolTip title={locale?.mermaid?.zoomOut || 'Zoom Out'} style={{ marginRight: 8 }}>
          <IconButton icon={<DownScaleIcon size={24} />} onClick={zoomOut} disabled={!isComplete} />
        </ToolTip>
        <ToolTip title={locale?.mermaid?.zoomIn || 'Zoom In'} style={{ marginRight: 8 }}>
          <IconButton icon={<UpScaleIcon size={24} />} onClick={zoomIn} disabled={!isComplete} />
        </ToolTip>
        <ToolTip title={locale?.mermaid?.fullScreen || 'Full Screen'}>
          <IconButton icon={<FullScreenIcon size={24} />} onClick={fullScreen} disabled={!isComplete} />
        </ToolTip>

        <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

        <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }} disabled={!isComplete}>
          {locale.mermaid.download || 'Download'}
        </Button>
      </div>
      {isFullscreen && <FullscreenModal code={code} />}
    </>
  );
};

export default MermaidBlockActions;
