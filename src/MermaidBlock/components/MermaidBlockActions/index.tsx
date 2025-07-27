import React, { useContext } from 'react';
import { DownloadIcon, DownScaleIcon, FullScreenIcon, UpScaleIcon } from '../Icon';
import { IconButton, ToolTip, Button, useLocale } from 'ds-markdown';
import { RenderGraphRef } from '../../RenderGraph';
import GraphContext from '../../context';

interface MermaidBlockActionsProps {
  graphRef: React.RefObject<RenderGraphRef>;
}

const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = ({ graphRef }) => {
  const locale = useLocale();
  const { panZoomState } = useContext(GraphContext);

  const zoomIn = () => {
    panZoomState.zoomIn();
  };

  const zoomOut = () => {
    panZoomState.zoomOut();
  };

  const fullScreen = () => {
    console.log('fullScreen');
  };

  return (
    <div className="md-code-block-header-actions" style={{ gap: 0 }}>
      <ToolTip title="缩小" style={{ marginRight: 8 }}>
        <IconButton icon={<DownScaleIcon size={24} />} onClick={zoomOut} />
      </ToolTip>
      <ToolTip title="放大" style={{ marginRight: 8 }}>
        <IconButton icon={<UpScaleIcon size={24} />} onClick={zoomIn} />
      </ToolTip>
      <ToolTip title="全屏">
        <IconButton icon={<FullScreenIcon size={24} />} onClick={fullScreen} />
      </ToolTip>

      <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

      <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }}>
        {locale.mermaid.download || 'Download'}
      </Button>
    </div>
  );
};

export default MermaidBlockActions;
