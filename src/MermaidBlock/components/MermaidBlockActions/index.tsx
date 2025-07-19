import React from 'react';
import { DownScaleIcon, UpScaleIcon } from '../Icon';
import { IconButton, ToolTip } from 'ds-markdown';

interface MermaidBlockActionsProps {
  id?: number;
}

const modulePrefix = 'MermaidBlockActions';
const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = (props: MermaidBlockActionsProps) => {
  return (
    <div className="md-code-block-header-actions" style={{ gap: 0 }}>
      <ToolTip title="缩小">
        <IconButton style={{ marginRight: 4 }} icon={<DownScaleIcon size={24} />} />
      </ToolTip>
      <ToolTip title="放大">
        <IconButton icon={<UpScaleIcon size={24} />} />
      </ToolTip>
    </div>
  );
};

export default MermaidBlockActions;
