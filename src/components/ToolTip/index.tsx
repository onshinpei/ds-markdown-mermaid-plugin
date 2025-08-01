import React, { forwardRef } from 'react';
import RcTooltip, { TooltipRef } from '@rc-component/tooltip';
import classNames from 'classnames';
import { TooltipProps } from '@rc-component/tooltip/lib/Tooltip';
import './index.less';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

interface ToolTipProps extends Omit<TooltipProps, 'overlay'> {
  title: React.ReactNode;
  children: React.ReactElement;
  position?: TooltipPosition;
  className?: string;
}

const ToolTip = forwardRef<TooltipRef, ToolTipProps>(({ title, children, position = 'top', className = '', ...rest }, ref) => {
  return (
    <RcTooltip
      placement={position}
      overlay={title}
      mouseLeaveDelay={0}
      classNames={{
        root: classNames('ds-markdown-tooltip', className),
      }}
      trigger={['hover', 'focus']}
      destroyOnHidden={true}
      showArrow={true}
      ref={ref}
      {...rest}
    >
      {children}
    </RcTooltip>
  );
});

ToolTip.displayName = 'ToolTip';

export default ToolTip;
