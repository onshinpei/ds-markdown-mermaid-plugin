import { jsx as _jsx } from "react/jsx-runtime";
import { forwardRef } from 'react';
import RcTooltip from '@rc-component/tooltip';
import classNames from 'classnames';
import './index.less';
const ToolTip = forwardRef(({ title, children, position = 'top', className = '', ...rest }, ref) => {
    return (_jsx(RcTooltip, { placement: position, overlay: title, mouseLeaveDelay: 0, classNames: {
            root: classNames('ds-markdown-tooltip', className),
        }, trigger: ['hover', 'focus'], destroyOnHidden: true, showArrow: true, ref: ref, ...rest, children: children }));
});
ToolTip.displayName = 'ToolTip';
export default ToolTip;
//# sourceMappingURL=index.js.map