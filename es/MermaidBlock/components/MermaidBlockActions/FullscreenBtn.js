import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { useState } from 'react';
import { IconButton, useLocale } from 'ds-markdown';
import ToolTip from '../../../components/ToolTip.js';
import { FullScreenIcon } from '../Icon.js';
import FullscreenModal from '../FullscreenModal.js';
import GraphContext from '../../context.js';
const FullscreenBtn = ({ code }) => {
    var _a;
    const locale = useLocale();
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { isComplete } = useContext(GraphContext);
    const fullScreen = () => {
        setIsFullscreen(true);
    };
    return (_jsxs(_Fragment, { children: [_jsx(ToolTip, { title: ((_a = locale === null || locale === void 0 ? void 0 : locale.mermaid) === null || _a === void 0 ? void 0 : _a.fullScreen) || 'Full Screen', children: _jsx("span", { children: _jsx(IconButton, { icon: _jsx(FullScreenIcon, { size: 24 }), onClick: fullScreen, disabled: !isComplete }) }) }), isFullscreen && _jsx(FullscreenModal, { code: code, onClose: () => setIsFullscreen(false) })] }));
};
export default FullscreenBtn;
//# sourceMappingURL=FullscreenBtn.js.map