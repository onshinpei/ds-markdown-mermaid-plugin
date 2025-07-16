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

// 优化 SVG 根元素组件
const SvgRoot: React.FC<React.SVGProps<SVGSVGElement>> = ({ children, ...props }) => <svg {...props}>{children}</svg>;

// 优化路径组件（避免不必要的重绘）
const SvgPath = React.memo((props) => {
  // 添加路径变化检测
  return <path {...props} />;
});

// 优化分组组件
const SvgGroup: React.FC<React.SVGProps<SVGGElement>> = ({ children, ...props }) => <g {...props}>{children}</g>;

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
      const processor = unified().use(rehypeParse, { fragment: true, space: 'svg' });

      const hast = processor.parse(svgString);

      return toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        elementAttributeNameCase: 'html', // 保持原始属性名
        passKeys: true, // 保留所有属性
        components: {
          // 特殊处理 SVG 元素
          svg: SvgRoot,
          path: SvgPath,
          g: SvgGroup,
          // 添加其他需要优化的 SVG 元素
        },
      });
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
        debugger;
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
  return (
    <div
      className={`react-markdown-mermaid ${className}`}
      style={{
        minHeight: 300,
        ...style,
      }}
    >
      <div className="react-markdown-mermaid__instance">{svgElement}</div>
    </div>
  );
};

export default MermaidBlock;
