import React from 'react';
import { DownloadIcon, DownScaleIcon, UpScaleIcon } from '../Icon';
import { IconButton, ToolTip, Button } from 'ds-markdown';

interface MermaidBlockActionsProps {
  id?: number;
}

const modulePrefix = 'MermaidBlockActions';
const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = (props: MermaidBlockActionsProps) => {
  return (
    <div className="md-code-block-header-actions" style={{ gap: 0 }}>
      <ToolTip title="缩小" style={{ marginRight: 8 }}>
        <IconButton icon={<DownScaleIcon size={24} />} />
      </ToolTip>
      <ToolTip title="放大">
        <IconButton icon={<UpScaleIcon size={24} />} />
      </ToolTip>

      <div className="md-code-block-header-actions-divider" style={{ width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 }} />

      <Button icon={<DownloadIcon size={24} />} style={{ fontSize: 13, padding: '0 4px' }}>
        下载
      </Button>
    </div>
  );
};

export default MermaidBlockActions;
