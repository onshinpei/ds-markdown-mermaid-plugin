import type { MermaidConfig } from 'mermaid';

export interface MermaidProps {
  /** Mermaid图表代码 */
  code: string;
  /** Mermaid配置选项 */
  mermaidConfig?: MermaidConfig;
  /** 图表ID，如果不提供会自动生成 */
  id?: string;
  /** 自定义CSS类名 */
  className?: string;
  /** 自定义样式 */
  style?: React.CSSProperties;
  /** 加载状态回调 */
  onLoad?: () => void;
  /** 错误回调 */
  onError?: (error: Error) => void;
  /** 渲染完成回调 */
  onRender?: () => void;
  /** 是否显示加载状态 */
  showLoading?: boolean;
  /** 加载状态文本 */
  loadingText?: string;
  /** 错误状态文本 */
  errorText?: string;
}

export interface MermaidState {
  isLoading: boolean;
  hasError: boolean;
  error?: Error;
}
