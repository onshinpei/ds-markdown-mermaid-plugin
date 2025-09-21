import { unified } from 'unified';
import rehypeParse from 'rehype-parse';
import { toJsxRuntime, Components, ExtraProps } from 'hast-util-to-jsx-runtime';
import { Fragment, jsx, jsxs } from 'react/jsx-runtime';
import Svg from '../components/Svg';

let _mermaidId = 0;

const getMermaidId = () => {
  return `mermaid-${_mermaidId++}`;
};

const parseSvgToJsx = (svgString: string) => {
  if (!svgString) return null;
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
      } as Components,
    });
    return jsxElement;
  } catch (err) {
    console.error('Failed to parse SVG to JSX:', err);
    return null;
  }
};

export { getMermaidId, parseSvgToJsx };
