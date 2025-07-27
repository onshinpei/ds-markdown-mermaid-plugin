import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { MermaidConfig } from 'mermaid';

export interface RehypeMermaidOptions {
  /** 自定义mermaid配置 */
  mermaidConfig?: MermaidConfig;
}

/**
 * 清理代码内容，移除可能的结束标记
 * @param code 原始代码
 * @returns 清理后的代码
 */
function cleanMermaidCode(code: string): string {
  // 移除可能的结束```标记
  return code
    .trim()
    .replace(/```\s*$/, '')
    .trim();
}

/**
 * Rehype插件：将markdown中的mermaid代码块转换为React组件
 */
export const rehypeMermaid: Plugin<[RehypeMermaidOptions?]> = (options = {}) => {
  return (tree) => {
    visit(tree, 'element', (node, index: number, parent: any) => {
      // 检查是否是mermaid代码块
      if (node.tagName === 'pre' && node.children && node.children.length > 0 && node.children[0].tagName === 'code') {
        const codeNode = node.children[0];
        const className = codeNode.properties?.className || [];
        // 检查是否包含mermaid语言标识
        if (className.some((cls: string) => cls.includes('language-mermaid'))) {
          const rawCode = codeNode.children?.[0]?.value || '';

          // 从remark插件传递的数据中获取完整性信息
          // 如果remark插件没有设置，则默认为true（向后兼容）
          const isComplete = (codeNode as any)?.properties?.['data-is-code-block-complete'] ?? false;
          // 清理代码内容
          const code = cleanMermaidCode(rawCode);

          // 转换为自定义组件
          node.type = 'element';
          node.tagName = 'MermaidBlock';
          node.properties = {
            code,
            isComplete, // 传递完整性标志
            mermaidConfig: options.mermaidConfig,
          };
          node.children = [];
        }
      }
    });
  };
};

export default rehypeMermaid;
