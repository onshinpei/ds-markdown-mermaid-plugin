import plugin from './plugin.js';
// 导入样式文件
import './style.less';
// 导出MermaidBlock组件
export { default as MermaidBlock } from './MermaidBlock.js';
// 导出rehype插件（可选使用）
export { default as rehypeMermaid } from './rehypeMermaid.js';
// 导出mermaid服务单例
export { default as MermaidService } from './mermaidService.js';
// 导出mermaid实例，方便用户直接使用
export { default as mermaid } from 'mermaid';
export default plugin;
//# sourceMappingURL=index.js.map