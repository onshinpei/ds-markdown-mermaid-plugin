import React from 'react';
import { DownloadIcon, DownScaleIcon, UpScaleIcon } from '../Icon';
import { IconButton, ToolTip, Button, useLocale } from 'ds-markdown';
import { RenderGraphRef } from '../../RenderGraph';

interface MermaidBlockActionsProps {
  graphRef: React.RefObject<RenderGraphRef>;
}

const modulePrefix = 'MermaidBlockActions';
const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = ({ graphRef }) => {
  const locale = useLocale();

  const zoomIn = () => {
    if (!graphRef.current) {
      return;
    }
    graphRef.current.update('1');
  };

  const zoomOut = () => {
    if (!graphRef.current) {
      return;
    }
    graphRef.current.update('2');
  };
  return (
    <div className="md-code-block-header-actions" style={{ gap: 0 }}>
      <ToolTip title="缩小" style={{ marginRight: 8 }}>
        <IconButton icon={<DownScaleIcon size={24} />} onClick={zoomOut} />
      </ToolTip>
      <ToolTip title="放大">
        <IconButton icon={<UpScaleIcon size={24} />} onClick={zoomIn} />
      </ToolTip>

      <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

      <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }}>
        {locale.mermaid.download || 'Download'}
      </Button>
    </div>
  );
};

export default MermaidBlockActions;
