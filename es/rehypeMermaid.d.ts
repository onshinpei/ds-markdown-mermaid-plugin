import type { Plugin } from 'unified';
import type { MermaidConfig } from 'mermaid';
export interface RehypeMermaidOptions {
    /** 自定义mermaid配置 */
    mermaidConfig?: MermaidConfig;
}
/**
 * Rehype插件：将markdown中的mermaid代码块转换为React组件
 */
export declare const rehypeMermaid: Plugin<[RehypeMermaidOptions?]>;
export default rehypeMermaid;
//# sourceMappingURL=rehypeMermaid.d.ts.map