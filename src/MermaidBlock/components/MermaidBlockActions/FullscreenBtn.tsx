import React, { useContext } from 'react';
import { useState } from 'react';
import { IconButton, useLocale } from 'ds-markdown';
import ToolTip from '../../../components/ToolTip';
import { FullScreenIcon } from '../Icon';
import FullscreenModal from '../FullscreenModal';
import GraphContext from '../../context';

interface FullscreenBtnProps {
  code: string;
}

const FullscreenBtn: React.FC<FullscreenBtnProps> = ({ code }) => {
  const locale = useLocale();
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { isComplete } = useContext(GraphContext);

  const fullScreen = () => {
    setIsFullscreen(true);
  };

  return (
    <>
      <ToolTip title={locale?.mermaid?.fullScreen || 'Full Screen'}>
        <span>
          <IconButton icon={<FullScreenIcon size={24} />} onClick={fullScreen} disabled={!isComplete} />
        </span>
      </ToolTip>
      {isFullscreen && <FullscreenModal code={code} onClose={() => setIsFullscreen(false)} />}
    </>
  );
};

export default FullscreenBtn;
