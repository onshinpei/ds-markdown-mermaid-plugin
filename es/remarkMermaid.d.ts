import type { RemarkMermaidCompletenessOptions } from './types';
/**
 * Remark插件：检测代码块的完整性
 * 在markdown解析阶段检测代码块是否有结束标记
 */
export declare const remarkMermaidCompleteness: (options?: RemarkMermaidCompletenessOptions) => (tree: any, file: any) => void;
export default remarkMermaidCompleteness;
//# sourceMappingURL=remarkMermaid.d.ts.map