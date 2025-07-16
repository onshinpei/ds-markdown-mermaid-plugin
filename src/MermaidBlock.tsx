import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MermaidService from './mermaidService';
import { MermaidProps } from './types';
import { useConfig } from 'ds-markdown';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';

const defaultConfig = {
  startOnLoad: false,
};

// 工具函数：将 SVG 属性名从 kebab-case 转为 camelCase
function toCamelCaseProps(props: Record<string, any>) {
  // 常见的 SVG 属性映射表
  const svgAttributeMap: Record<string, string> = {
    'fill-rule': 'fillRule',
    'clip-rule': 'clipRule',
    'stroke-width': 'strokeWidth',
    'stroke-linecap': 'strokeLinecap',
    'stroke-linejoin': 'strokeLinejoin',
    'stroke-miterlimit': 'strokeMiterlimit',
    'stroke-dasharray': 'strokeDasharray',
    'stroke-dashoffset': 'strokeDashoffset',
    'text-anchor': 'textAnchor',
    'text-decoration': 'textDecoration',
    'font-family': 'fontFamily',
    'font-size': 'fontSize',
    'font-weight': 'fontWeight',
    'font-style': 'fontStyle',
    'letter-spacing': 'letterSpacing',
    'word-spacing': 'wordSpacing',
    'text-rendering': 'textRendering',
    'shape-rendering': 'shapeRendering',
    'color-interpolation': 'colorInterpolation',
    'color-interpolation-filters': 'colorInterpolationFilters',
    'flood-color': 'floodColor',
    'flood-opacity': 'floodOpacity',
    'lighting-color': 'lightingColor',
    'stop-color': 'stopColor',
    'stop-opacity': 'stopOpacity',
    'marker-start': 'markerStart',
    'marker-mid': 'markerMid',
    'marker-end': 'markerEnd',
    'clip-path': 'clipPath',
    mask: 'mask',
    filter: 'filter',
    opacity: 'opacity',
    visibility: 'visibility',
    display: 'display',
    overflow: 'overflow',
    'enable-background': 'enableBackground',
    'color-profile': 'colorProfile',
    'pointer-events': 'pointerEvents',
    'dominant-baseline': 'dominantBaseline',
    'alignment-baseline': 'alignmentBaseline',
    'baseline-shift': 'baselineShift',
    'vector-effect': 'vectorEffect',
    'paint-order': 'paintOrder',
  };

  const newProps: Record<string, any> = {};
  Object.entries(props).forEach(([key, value]) => {
    // 首先检查是否在映射表中
    if (svgAttributeMap[key]) {
      newProps[svgAttributeMap[key]] = value;
    } else if (key.includes('-')) {
      // 对于其他 kebab-case 属性，使用通用转换
      const camelKey = key.replace(/-([a-z])/g, (_, char) => char.toUpperCase());
      newProps[camelKey] = value;
    } else {
      newProps[key] = value;
    }
  });
  return newProps;
}

// 优化 SVG 根元素组件
const SvgRoot: React.FC<React.SVGProps<SVGSVGElement>> = ({ children, ...props }) => <svg {...toCamelCaseProps(props)}>{children}</svg>;

// 优化路径组件（避免不必要的重绘）
const SvgPath = React.memo((props) => {
  return <path {...toCamelCaseProps(props)} />;
});

// 优化分组组件
const SvgGroup: React.FC<React.SVGProps<SVGGElement>> = ({ children, ...props }) => <g {...toCamelCaseProps(props)}>{children}</g>;

const MermaidBlock: React.FC<MermaidProps> = ({
  code,
  id,
  className,
  style,
  onLoad,
  onError,
  onRender,
  showLoading = true,
  loadingText = 'Loading diagram...',
  errorText = 'Failed to render diagram',
}) => {
  const [svgElement, setSvgElement] = useState<React.ReactElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [svgString, setSvgString] = useState<string>();

  useEffect(() => {
    console.log('render');
  }, []);

  const config = useConfig();
  const mermaidConfig = config.mermaidConfig || defaultConfig;

  // 去除useEffect依赖，避免重复初始化
  const mermaidConfigRef = useRef(mermaidConfig);
  mermaidConfigRef.current = mermaidConfig;

  const onErrorRef = useRef(onError);
  onErrorRef.current = onError;

  const onLoadRef = useRef(onLoad);
  onLoadRef.current = onLoad;

  const onRenderRef = useRef(onRender);
  onRenderRef.current = onRender;

  // 生成唯一ID
  const chartId = useMemo(() => id || `mermaid-${Math.random().toString(36).substr(2, 9)}`, [id]);

  // 获取 mermaid 服务实例
  const mermaidService = MermaidService.getInstance();

  useEffect(() => {
    const initMermaid = async () => {
      try {
        await mermaidService.initialize({ startOnLoad: false, ...mermaidConfigRef.current });
        onLoadRef.current?.();
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize mermaid');
        console.error('Failed to initialize mermaid:', err);
        setError(error.message);
        onErrorRef.current?.(error);
      }
    };

    initMermaid();
  }, []);

  const parseSvgToJsx = useCallback((svgString: string) => {
    if (!svgString) return null;

    try {
      console.log('原始SVG字符串:', svgString);
      const processor = unified().use(rehypeParse, { fragment: true, space: 'svg' });

      const hast = processor.parse(svgString);
      console.log('解析后的HAST:', hast);
      setSvgString(svgString);
      const jsxElement = toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        passKeys: true, // 保留所有属性
        components: {
          svg: SvgRoot as any,
          g: SvgGroup as any,
          path: SvgPath as any,
          rect: (props) => <rect {...toCamelCaseProps(props)} />,
          circle: (props) => <circle {...toCamelCaseProps(props)} />,
          ellipse: (props) => <ellipse {...toCamelCaseProps(props)} />,
          line: (props) => <line {...toCamelCaseProps(props)} />,
          polyline: (props) => <polyline {...toCamelCaseProps(props)} />,
          polygon: (props) => <polygon {...toCamelCaseProps(props)} />,
          text: (props) => <text {...toCamelCaseProps(props)} />,
          tspan: (props) => <tspan {...toCamelCaseProps(props)} />,
          defs: (props) => <defs {...toCamelCaseProps(props)} />,
          marker: (props) => <marker {...toCamelCaseProps(props)} />,
          clipPath: (props) => <clipPath {...toCamelCaseProps(props)} />,
          mask: (props) => <mask {...toCamelCaseProps(props)} />,
          pattern: (props) => <pattern {...toCamelCaseProps(props)} />,
          linearGradient: (props) => <linearGradient {...toCamelCaseProps(props)} />,
          radialGradient: (props) => <radialGradient {...toCamelCaseProps(props)} />,
          stop: (props) => <stop {...toCamelCaseProps(props)} />,
          use: (props) => <use {...toCamelCaseProps(props)} />,
          symbol: (props) => <symbol {...toCamelCaseProps(props)} />,
          image: (props) => <image {...toCamelCaseProps(props)} />,
          filter: (props) => <filter {...toCamelCaseProps(props)} />,
          foreignObject: (props) => <foreignObject {...toCamelCaseProps(props)} />,
          // 添加其他需要优化的 SVG 元素
        },
      });
      console.log('转换后的JSX元素:', jsxElement);
      console.log('JSX元素的props:', jsxElement?.props);
      console.log('JSX元素的children:', jsxElement?.props?.children);

      // 如果是Fragment，尝试直接返回第一个子元素（应该是SVG）
      if (jsxElement?.props?.children && Array.isArray(jsxElement.props.children)) {
        console.log('检测到Fragment，尝试返回第一个子元素');
        const firstChild = jsxElement.props.children[0];
        console.log('第一个子元素:', firstChild);
        return firstChild;
      }

      return jsxElement;
    } catch (err) {
      console.error('Failed to parse SVG to JSX:', err);
      return null;
    }
  }, []);

  useEffect(() => {
    if (!code.trim()) {
      setSvgElement(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    const renderChart = async () => {
      try {
        const { svg } = await mermaidService.render(chartId, code);
        const svgElement = parseSvgToJsx(svg);
        if (!svgElement) {
          return;
        }
        setSvgElement(svgElement);
        setIsLoading(false);
        onRenderRef.current?.();
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
        setError(errorMessage);
        setIsLoading(false);
        onErrorRef.current?.(err instanceof Error ? err : new Error(errorMessage));

        console.log('error', err);
      }
    };
    renderChart();
  }, [code, chartId]);

  // 加载状态
  // if (isLoading && showLoading) {
  //   return (
  //     <div
  //       className={`react-markdown-mermaid ${className} loading`}
  //       style={{
  //         minHeight: 300,
  //         ...style,
  //       }}
  //     >
  //       <div className="loading-spinner">
  //         <div className="spinner"></div>
  //         <span>{loadingText}</span>
  //       </div>
  //     </div>
  //   );
  // }

  // 错误状态
  // if (error) {
  //   return (
  //     <div className={`react-markdown-mermaid ${className} error`} style={style}>
  //       <div className="error-message">
  //         <span>{errorText}</span>
  //         <details>{error}</details>
  //       </div>
  //     </div>
  //   );
  // }

  // 正常渲染
  console.log('当前渲染的svgElement:', svgElement);

  return (
    <div
      className={`react-markdown-mermaid ${className}`}
      style={{
        ...style,
      }}
    >
      {/* JSX渲染方式 */}
      <div className="react-markdown-mermaid__instance" style={{ minHeight: 300, border: '1px solid red' }}>
        <h4>JSX渲染:</h4>
        {svgElement}
      </div>

      {/* 备用HTML渲染方式 */}
      <div style={{ minHeight: 300, border: '1px solid blue', marginTop: '10px' }}>
        <h4>HTML渲染:</h4>
        <div dangerouslySetInnerHTML={{ __html: svgString || '' }}></div>
      </div>
    </div>
  );
};

export default MermaidBlock;
