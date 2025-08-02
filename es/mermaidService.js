import mermaid from 'mermaid';
class MermaidService {
    constructor() {
        this.isInitialized = false;
        this.initializationPromise = null;
    }
    static getInstance() {
        if (!MermaidService.instance) {
            MermaidService.instance = new MermaidService();
        }
        return MermaidService.instance;
    }
    /**
     * 初始化 mermaid
     * @param config mermaid 配置
     * @returns Promise<void>
     */
    async initialize(config) {
        if (this.isInitialized) {
            return;
        }
        if (this.initializationPromise) {
            return this.initializationPromise;
        }
        this.initializationPromise = this.performInitialization(config);
        await this.initializationPromise;
    }
    async performInitialization(config) {
        try {
            if (config) {
                mermaid.initialize(config);
            }
            else {
                mermaid.initialize({
                    startOnLoad: false,
                    theme: 'default',
                });
            }
            this.isInitialized = true;
        }
        catch (error) {
            this.initializationPromise = null;
            throw error;
        }
    }
    /**
     * 渲染 mermaid 图表
     * @param id 图表ID
     * @param code mermaid 代码
     * @returns Promise<{ svg: string }>
     */
    async render(id, code) {
        await this.initialize();
        return mermaid.render(id, code);
    }
    async parse(code) {
        return await mermaid.parse(code);
    }
    /**
     * 检查是否已初始化
     * @returns boolean
     */
    isReady() {
        return this.isInitialized;
    }
    /**
     * 重置服务状态（用于测试或重新初始化）
     */
    reset() {
        this.isInitialized = false;
        this.initializationPromise = null;
    }
    /** 检测 mermaid svgString 是否有效 */
    isValidSvgString(svgString) {
        return svgString.includes('svg');
    }
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
//# sourceMappingURL=mermaidService.js.map