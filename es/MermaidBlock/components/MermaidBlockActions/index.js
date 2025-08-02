import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useContext } from 'react';
import { CloseIcon, DownloadIcon, DownScaleIcon, FitIcon, UpScaleIcon } from '../Icon.js';
import { IconButton, Button, useLocale } from 'ds-markdown';
import GraphContext from '../../context.js';
import ToolTip from '../../../components/ToolTip.js';
import FullscreenBtn from './FullscreenBtn.js';
const MermaidBlockActions = ({ code, graphRef, onExitFullscreen, isFullscreen }) => {
    var _a, _b, _c, _d;
    const locale = useLocale();
    const { panZoomState, isComplete } = useContext(GraphContext);
    const zoomIn = () => {
        panZoomState.zoomIn();
    };
    const zoomOut = () => {
        panZoomState.zoomOut();
    };
    const fit = () => {
        panZoomState.fit();
    };
    // 下载图片处理函数
    const handleDownload = async () => {
        if (graphRef.current) {
            try {
                await graphRef.current.download();
            }
            catch (error) {
                console.error('Download failed:', error);
            }
        }
    };
    return (_jsxs(_Fragment, { children: [_jsx(ToolTip, { title: ((_a = locale === null || locale === void 0 ? void 0 : locale.mermaid) === null || _a === void 0 ? void 0 : _a.zoomOut) || 'Zoom Out', children: _jsx("span", { children: _jsx(IconButton, { icon: _jsx(DownScaleIcon, { size: 24 }), onClick: zoomOut, disabled: !isComplete }) }) }), _jsx("div", { style: { width: 8 } }), _jsx(ToolTip, { title: ((_b = locale === null || locale === void 0 ? void 0 : locale.mermaid) === null || _b === void 0 ? void 0 : _b.zoomIn) || 'Zoom In', children: _jsx("span", { children: _jsx(IconButton, { icon: _jsx(UpScaleIcon, { size: 24 }), onClick: zoomIn, disabled: !isComplete }) }) }), _jsx("div", { style: { width: 8 } }), _jsx(ToolTip, { title: ((_c = locale === null || locale === void 0 ? void 0 : locale.mermaid) === null || _c === void 0 ? void 0 : _c.fitInView) || 'Fit in view', children: _jsx("span", { children: _jsx(IconButton, { icon: _jsx(FitIcon, { size: 24 }), onClick: fit, disabled: !isComplete }) }) }), _jsx("div", { style: { width: 8 } }), !isFullscreen && _jsx(FullscreenBtn, { code: code }), _jsx("div", { className: "md-code-block-header-actions-divider", style: { width: 1, height: 14, backgroundColor: 'var(--dsr-border-1)', marginLeft: 12, marginRight: 12 } }), isFullscreen ? (_jsx(_Fragment, { children: _jsx(IconButton, { icon: _jsx(CloseIcon, { size: 24 }), onClick: onExitFullscreen }) })) : (_jsx(Button, { icon: _jsx(DownloadIcon, { size: 24 }), style: { fontSize: 13, padding: '0 4px' }, disabled: !isComplete, onClick: handleDownload, children: ((_d = locale === null || locale === void 0 ? void 0 : locale.mermaid) === null || _d === void 0 ? void 0 : _d.download) || 'Download' }))] }));
};
export default MermaidBlockActions;
//# sourceMappingURL=index.js.map