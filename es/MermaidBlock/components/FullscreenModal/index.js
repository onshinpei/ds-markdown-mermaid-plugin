import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useCallback, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { SuccessButton, useLocale } from 'ds-markdown';
import { GraphProvider } from '../../context.js';
import { PanZoomState } from '../../../panZoomState.js';
import RenderGraph from '../../RenderGraph.js';
import Loading from '../Loading.js';
import { DownloadIcon, CopyIcon } from '../Icon.js';
import MermaidBlockActions from '../MermaidBlockActions.js';
import './index.css';
const FullscreenModal = ({ code, onClose }) => {
    var _a, _b, _c, _d;
    const [height, setHeight] = useState(0);
    const contentRef = useRef(null);
    const renderGraphRef = useRef(null);
    const locale = useLocale();
    const panZoomState = useMemo(() => {
        return new PanZoomState({
            autoZoomOut: false, // 禁用自动缩放，保持原始大小
            mouseWheelZoomEnabled: true,
        });
    }, []);
    const listenResize = useCallback(() => {
        setHeight(contentRef.current.clientHeight);
    }, []);
    useLayoutEffect(() => {
        listenResize();
        window.addEventListener('resize', listenResize);
        return () => {
            window.removeEventListener('resize', listenResize);
        };
    }, []);
    // 下载图片处理函数
    const handleDownload = async () => {
        if (renderGraphRef.current) {
            return renderGraphRef.current.download();
        }
        return false;
    };
    // 复制图片处理函数
    const handleCopy = async () => {
        if (renderGraphRef.current) {
            return renderGraphRef.current.copy();
        }
        return false;
    };
    const el = (_jsx(GraphProvider, { isComplete: true, panZoomState: panZoomState, svgHeight: height, children: _jsxs("div", { className: "ds-markdown mermaid-fullscreen", children: [_jsxs("div", { className: "mermaid-fullscreen__header", children: [_jsxs("div", { className: "mermaid-fullscreen__header-center", children: [_jsx(SuccessButton, { icon: _jsx(DownloadIcon, { size: 24 }), onClick: handleDownload, executeText: ((_a = locale.mermaid) === null || _a === void 0 ? void 0 : _a.downloadedImage) || 'Downloaded', children: ((_b = locale.mermaid) === null || _b === void 0 ? void 0 : _b.downloadImage) || 'Download Image' }), _jsx(SuccessButton, { icon: _jsx(CopyIcon, { size: 24 }), onClick: handleCopy, executeText: ((_c = locale.mermaid) === null || _c === void 0 ? void 0 : _c.copiedImage) || 'Copied', children: ((_d = locale.mermaid) === null || _d === void 0 ? void 0 : _d.copyImage) || 'Copy Image' })] }), _jsx("div", { className: "mermaid-fullscreen__header-right", children: _jsx(MermaidBlockActions, { graphRef: renderGraphRef, code: code, isFullscreen: true, onExitFullscreen: onClose }) })] }), _jsx("div", { className: "mermaid-fullscreen__content", ref: contentRef, children: height > 0 ? _jsx(RenderGraph, { code: code, isComplete: true, ref: renderGraphRef }) : _jsx(Loading, {}) })] }) }));
    return createPortal(el, document.body);
};
export default FullscreenModal;
//# sourceMappingURL=index.js.map