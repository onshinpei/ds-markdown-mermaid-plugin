import { jsx as _jsx } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useImperativeHandle, forwardRef, useRef, useState, useContext } from 'react';
import MermaidService from '../../mermaidService.js';
import { useConfig } from 'ds-markdown';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import { getMermaidId } from './util.js';
import Svg from '../components/Svg.js';
import GraphContext from '../context.js';
import { svgToPngAndCopy, downloadPng } from '../utils/svgUtil.js';
const defaultConfig = {
    startOnLoad: false,
};
const RenderGraphInner = forwardRef(({ code }, ref) => {
    const [svgElement, setSvgElement] = useState(null);
    const [error, setError] = useState(null);
    const config = useConfig();
    const mermaidConfig = config.mermaidConfig || defaultConfig;
    const { svgHeight, panZoomState } = useContext(GraphContext);
    const svgIdRef = useRef('');
    // 去除useEffect依赖，避免重复初始化
    const mermaidConfigRef = useRef(mermaidConfig);
    mermaidConfigRef.current = mermaidConfig;
    // 获取 mermaid 服务实例
    const mermaidService = MermaidService.getInstance();
    useEffect(() => {
        const initMermaid = async () => {
            try {
                await mermaidService.initialize({ startOnLoad: false, ...mermaidConfigRef.current });
            }
            catch (err) {
                const error = err instanceof Error ? err : new Error('Failed to initialize mermaid');
                console.error('Failed to initialize mermaid:', err);
                setError(error.message);
            }
        };
        initMermaid();
    }, [mermaidConfig.theme]);
    const parseSvgToJsx = useCallback((svgString) => {
        if (!svgString)
            return null;
        try {
            const processor = unified().use(rehypeParse, { fragment: true, space: 'svg' });
            const hast = processor.parse(svgString);
            const jsxElement = toJsxRuntime(hast, {
                Fragment,
                jsx,
                jsxs,
                passKeys: true, // 保留所有属性
                components: {
                    svg: Svg,
                },
            });
            return jsxElement;
        }
        catch (err) {
            console.error('Failed to parse SVG to JSX:', err);
            return null;
        }
    }, []);
    useEffect(() => {
        if (!code.trim()) {
            setSvgElement(null);
            return;
        }
        setError(null);
        const renderChart = async () => {
            // 生成唯一ID
            const viewID = getMermaidId();
            try {
                await mermaidService.parse(code);
                const { svg } = await mermaidService.render(viewID, code);
                const svgElement = parseSvgToJsx(svg);
                if (!svgElement) {
                    return;
                }
                setSvgElement(svgElement);
                svgIdRef.current = `#${viewID}`;
            }
            catch (err) {
                const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
                setError(errorMessage);
            }
        };
        renderChart();
    }, [code]);
    useImperativeHandle(ref, () => ({
        download: async () => {
            const sizes = panZoomState.getSizes();
            return downloadPng({ id: svgIdRef.current, width: (sizes === null || sizes === void 0 ? void 0 : sizes.width) || 0, height: (sizes === null || sizes === void 0 ? void 0 : sizes.height) || 0 });
        },
        copy: async () => {
            const sizes = panZoomState.getSizes();
            return svgToPngAndCopy({ id: svgIdRef.current, width: (sizes === null || sizes === void 0 ? void 0 : sizes.width) || 0, height: (sizes === null || sizes === void 0 ? void 0 : sizes.height) || 0 });
        },
    }));
    return (_jsx("div", { className: `react-markdown-mermaid`, children: _jsx("div", { className: "react-markdown-mermaid__instance", style: {
                height: svgHeight,
            }, children: svgElement }) }));
});
const RenderGraph = memo(RenderGraphInner);
export default RenderGraph;
//# sourceMappingURL=index.js.map