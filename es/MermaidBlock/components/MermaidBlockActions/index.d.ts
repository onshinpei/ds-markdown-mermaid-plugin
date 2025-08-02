import React from 'react';
import { RenderGraphRef } from '../../RenderGraph';
interface MermaidBlockActionsProps {
    graphRef: React.RefObject<RenderGraphRef>;
    code: string;
    onExitFullscreen?: () => void;
    isFullscreen?: boolean;
}
declare const MermaidBlockActions: React.FC<MermaidBlockActionsProps>;
export default MermaidBlockActions;
//# sourceMappingURL=index.d.ts.map