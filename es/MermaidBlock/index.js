import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useMemo, useRef, useState } from 'react';
import { CodeBlockWrap, CodeBlockActions, useLocale, Segmented } from 'ds-markdown';
import RenderGraph from './RenderGraph.js';
import RenderCode from './RenderCode.js';
import MermaidBlockActions from './components/MermaidBlockActions.js';
import { GraphProvider } from './context.js';
import { PanZoomState } from '../panZoomState.js';
const MermaidBlock = (props) => {
    const [isFullscreen, setIsFullscreen] = useState(false);
    const { code, isComplete = false } = props;
    const [activeSegmented, setActiveSegmented] = useState('mermaid');
    const renderGraphRef = useRef(null);
    const locale = useLocale();
    const panZoomState = useMemo(() => {
        return new PanZoomState({
            autoZoomOut: false, // 禁用自动缩放，保持原始大小
        });
    }, []);
    return (_jsx(GraphProvider, { isComplete: isComplete, panZoomState: panZoomState, svgHeight: 380, children: _jsxs(CodeBlockWrap, { title: _jsxs(_Fragment, { children: [_jsx(Segmented, { Segmented: [
                            {
                                label: locale.mermaid.diagram || 'Diagram',
                                value: 'mermaid',
                            },
                            {
                                label: locale.mermaid.code || 'Code',
                                value: 'code',
                            },
                        ], value: activeSegmented, onChange: (value) => setActiveSegmented(value) }), activeSegmented === 'mermaid' ? (_jsx("div", { className: "md-code-block-header-actions", style: { gap: 0 }, children: _jsx(MermaidBlockActions, { graphRef: renderGraphRef, code: code, isFullscreen: isFullscreen, onExitFullscreen: () => setIsFullscreen(false) }) })) : (_jsx(CodeBlockActions, { codeContent: code, language: "mermaid" }))] }), children: [_jsx("div", { style: { display: activeSegmented === 'mermaid' ? 'block' : 'none' }, children: _jsx(RenderGraph, { code: code, isComplete: isComplete, ref: renderGraphRef }) }), _jsx("div", { style: { display: activeSegmented === 'code' ? 'block' : 'none' }, children: _jsx(RenderCode, { code: code }) })] }) }));
};
export default memo(MermaidBlock);
//# sourceMappingURL=index.js.map