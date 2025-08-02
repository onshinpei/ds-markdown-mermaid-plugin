import { MermaidConfig } from 'mermaid';
declare class MermaidService {
    private static instance;
    private isInitialized;
    private initializationPromise;
    private constructor();
    static getInstance(): MermaidService;
    /**
     * 初始化 mermaid
     * @param config mermaid 配置
     * @returns Promise<void>
     */
    initialize(config?: MermaidConfig): Promise<void>;
    private performInitialization;
    /**
     * 渲染 mermaid 图表
     * @param id 图表ID
     * @param code mermaid 代码
     * @returns Promise<{ svg: string }>
     */
    render(id: string, code: string): Promise<{
        svg: string;
    }>;
    parse(code: string): Promise<import("mermaid").ParseResult>;
    /**
     * 检查是否已初始化
     * @returns boolean
     */
    isReady(): boolean;
    /**
     * 重置服务状态（用于测试或重新初始化）
     */
    reset(): void;
    /** 检测 mermaid svgString 是否有效 */
    isValidSvgString(svgString: string): boolean;
}
export default MermaidService;
/**
 * 使用示例：
 *
 * // 获取服务实例
 * const mermaidService = MermaidService.getInstance();
 *
 * // 初始化（可选配置）
 * await mermaidService.initialize({
 *   theme: 'dark',
 *   startOnLoad: false
 * });
 *
 * // 渲染图表
 * const { svg } = await mermaidService.render('chart-id', 'graph TD; A-->B');
 *
 * // 检查是否已初始化
 * if (mermaidService.isReady()) {
 *   // 可以安全地渲染图表
 * }
 */
//# sourceMappingURL=mermaidService.d.ts.map