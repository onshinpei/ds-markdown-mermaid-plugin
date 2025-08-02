import React from 'react';
import { TooltipRef } from '@rc-component/tooltip';
import { TooltipProps } from '@rc-component/tooltip/lib/Tooltip';
import './index.less';
export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';
interface ToolTipProps extends Omit<TooltipProps, 'overlay'> {
    title: React.ReactNode;
    children: React.ReactElement;
    position?: TooltipPosition;
    className?: string;
}
declare const ToolTip: React.ForwardRefExoticComponent<ToolTipProps & React.RefAttributes<TooltipRef>>;
export default ToolTip;
//# sourceMappingURL=index.d.ts.map