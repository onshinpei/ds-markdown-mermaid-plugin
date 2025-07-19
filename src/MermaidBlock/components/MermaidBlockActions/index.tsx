import React from 'react';
import { DownScaleIcon, UpScaleIcon } from '../Icon';
import IconButton from '../IconButton';

interface MermaidBlockActionsProps {
  id?: number;
}

const modulePrefix = 'MermaidBlockActions';
const MermaidBlockActions: React.FC<MermaidBlockActionsProps> = (props: MermaidBlockActionsProps) => {
  return (
    <div className="md-code-block-header-actions">
      <IconButton style={{ marginRight: 4 }} icon={<DownScaleIcon size={24} />} />
      <IconButton icon={<UpScaleIcon size={24} />} />
    </div>
  );
};

export default MermaidBlockActions;
