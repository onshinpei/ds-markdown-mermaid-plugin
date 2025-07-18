import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import MermaidService from '../mermaidService';
import { MermaidProps } from '../types';
import { useConfig } from 'ds-markdown';
import { CodeBlockWrap, CodeBlockActions } from 'ds-markdown';
import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toJsxRuntime } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import uniqueID from 'lodash-es/uniqueId';
import { MermaidConfig } from 'mermaid';

const defaultConfig: MermaidConfig = {
  startOnLoad: false,
};

const MermaidBlock: React.FC<MermaidProps> = ({ code }) => {
  const [svgElement, setSvgElement] = useState<React.ReactElement | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const config = useConfig();
  const mermaidConfig = config.mermaidConfig || defaultConfig;

  // 去除useEffect依赖，避免重复初始化
  const mermaidConfigRef = useRef(mermaidConfig);
  mermaidConfigRef.current = mermaidConfig;

  // 生成唯一ID
  // 获取 mermaid 服务实例
  const mermaidService = MermaidService.getInstance();

  useEffect(() => {
    const initMermaid = async () => {
      try {
        await mermaidService.initialize({ startOnLoad: false, ...mermaidConfigRef.current } as MermaidConfig);
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Failed to initialize mermaid');
        console.error('Failed to initialize mermaid:', err);
        setError(error.message);
      }
    };

    initMermaid();
  }, []);

  const parseSvgToJsx = useCallback((svgString: string) => {
    if (!svgString) return null;
    try {
      const processor = unified().use(rehypeParse, { fragment: true, space: 'svg' });
      const hast = processor.parse(svgString);
      const jsxElement = toJsxRuntime(hast, {
        Fragment,
        jsx,
        jsxs,
        passKeys: true, // 保留所有属性
        components: {},
      });
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
      const chartId = uniqueID('mermaid-');
      try {
        await mermaidService.parse(code);
        const { svg } = await mermaidService.render(chartId, code);
        const svgElement = parseSvgToJsx(svg);
        if (!svgElement) {
          return;
        }
        setSvgElement(svgElement);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to render mermaid chart';
        setError(errorMessage);
      } finally {
        setIsLoading(false);
      }
    };
    renderChart();
  }, [code]);

  return (
    <CodeBlockWrap
      title={
        <>
          <div className="md-code-block-language">mermaid</div>
          <CodeBlockActions codeContent={code} language="mermaid" />
        </>
      }
    >
      <div className={`react-markdown-mermaid`}>
        <div className="react-markdown-mermaid__instance">{svgElement}</div>
      </div>
    </CodeBlockWrap>
  );
};

export default memo(MermaidBlock);
