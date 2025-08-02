import React from 'react';
interface RenderGraphProps {
    code: string;
    isComplete?: boolean;
}
export interface RenderGraphRef {
    download: () => Promise<boolean>;
    copy: () => Promise<boolean>;
}
declare const RenderGraph: React.MemoExoticComponent<React.ForwardRefExoticComponent<RenderGraphProps & React.RefAttributes<RenderGraphRef>>>;
export default RenderGraph;
//# sourceMappingURL=index.d.ts.map