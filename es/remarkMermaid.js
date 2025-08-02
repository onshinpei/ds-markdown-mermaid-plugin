import { visit } from 'unist-util-visit';
/**
 * Remark插件：检测代码块的完整性
 * 在markdown解析阶段检测代码块是否有结束标记
 */
export const remarkMermaidCompleteness = (options = {}) => {
    const { enabled = true } = options;
    return (tree, file) => {
        if (!enabled)
            return;
        // 从file对象获取原始文本
        const source = file.value || file.contents;
        visit(tree, 'code', (node, index, parent) => {
            // 检查是否是mermaid代码块
            if (node.lang === 'mermaid') {
                // 检查代码块是否完整
                const isComplete = isCodeBlockComplete(node, parent, source);
                // 在节点上添加完整性信息
                if (!node.data) {
                    node.data = {
                        hProperties: {},
                    };
                }
                if (!node.data.hProperties) {
                    node.data.hProperties = {};
                }
                node.data.hProperties['data-is-code-block-complete'] = isComplete;
            }
        });
    };
};
/**
 * 检测代码块是否完整
 * @param node 代码块节点
 * @param parent 父节点
 * @param source 原始markdown文本
 * @returns boolean 是否完整
 */
function isCodeBlockComplete(node, parent, source) {
    // 如果有原始文本和位置信息，使用位置信息获取完整代码块
    if (source && node.position) {
        const { start, end } = node.position;
        const fullCodeBlock = source.slice(start.offset, end.offset);
        // 检查是否以```结尾
        if (fullCodeBlock.trim().endsWith('```')) {
            return true;
        }
        return false;
    }
    // 备用方法：检查代码内容是否以```结尾
    const code = node.value || '';
    if (code.trim().endsWith('```')) {
        return true;
    }
    else {
        return false;
    }
}
export default remarkMermaidCompleteness;
//# sourceMappingURL=remarkMermaid.js.map