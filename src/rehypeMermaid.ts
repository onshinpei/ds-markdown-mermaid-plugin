import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';

export interface RehypeMermaidOptions {
  /** 自定义mermaid配置 */
  mermaidConfig?: any;
}

/**
 * Rehype插件：将markdown中的mermaid代码块转换为React组件
 */
export const rehypeMermaid: Plugin<[RehypeMermaidOptions?]> = (options = {}) => {
  return (tree) => {
    visit(tree, 'element', (node: any, index: number, parent: any) => {
      // 检查是否是mermaid代码块
      if (node.tagName === 'pre' && node.children && node.children.length > 0 && node.children[0].tagName === 'code') {
        const codeNode = node.children[0];
        const className = codeNode.properties?.className || [];

        // 检查是否包含mermaid语言标识
        if (className.some((cls: string) => cls.includes('language-mermaid'))) {
          const code = codeNode.children?.[0]?.value || '';

          // 转换为自定义组件
          node.type = 'element';
          node.tagName = 'MermaidBlock';
          node.properties = {
            code,
            mermaidConfig: options.mermaidConfig,
          };
          node.children = [];
        }
      }
    });
  };
};

export default rehypeMermaid;
