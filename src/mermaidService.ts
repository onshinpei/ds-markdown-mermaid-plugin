import mermaid, { MermaidConfig } from 'mermaid';

class MermaidService {
  private static instance: MermaidService;
  private isInitialized = false;
  private initializationPromise: Promise<void> | null = null;

  private constructor() {}

  public static getInstance(): MermaidService {
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
  public async initialize(config?: MermaidConfig): Promise<void> {
    if (this.isInitialized) {
      return;
    }

    if (this.initializationPromise) {
      return this.initializationPromise;
    }

    this.initializationPromise = this.performInitialization(config);
    await this.initializationPromise;
  }

  private async performInitialization(config?: MermaidConfig): Promise<void> {
    try {
      if (config) {
        mermaid.initialize(config);
      } else {
        mermaid.initialize({
          startOnLoad: false,
          theme: 'default',
        });
      }
      this.isInitialized = true;
    } catch (error) {
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
  public async render(id: string, code: string): Promise<{ svg: string }> {
    // if (!this.isInitialized) {
    //   await this.initialize();
    // }
    mermaid.initialize({
      theme: 'default',
    });
    return mermaid.render(id, code);
  }

  public async parse(code: string) {
    return await mermaid.parse(code);
  }

  /**
   * 检查是否已初始化
   * @returns boolean
   */
  public isReady(): boolean {
    return this.isInitialized;
  }

  /**
   * 重置服务状态（用于测试或重新初始化）
   */
  public reset(): void {
    this.isInitialized = false;
    this.initializationPromise = null;
  }

  /** 检测 mermaid svgString 是否有效 */
  public isValidSvgString(svgString: string): boolean {
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
