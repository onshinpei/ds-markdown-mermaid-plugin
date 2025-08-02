import { visit } from 'unist-util-visit';
/**
 * 清理代码内容，移除可能的结束标记
 * @param code 原始代码
 * @returns 清理后的代码
 */
function cleanMermaidCode(code) {
    // 移除可能的结束```标记
    return code
        .trim()
        .replace(/```\s*$/, '')
        .trim();
}
/**
 * Rehype插件：将markdown中的mermaid代码块转换为React组件
 */
export const rehypeMermaid = (options = {}) => {
    return (tree) => {
        visit(tree, 'element', (node, index, parent) => {
            var _a, _b, _c, _d, _e;
            // 检查是否是mermaid代码块
            if (node.tagName === 'pre' && node.children && node.children.length > 0 && node.children[0].tagName === 'code') {
                const codeNode = node.children[0];
                const className = ((_a = codeNode.properties) === null || _a === void 0 ? void 0 : _a.className) || [];
                // 检查是否包含mermaid语言标识
                if (className.some((cls) => cls.includes('language-mermaid'))) {
                    const rawCode = ((_c = (_b = codeNode.children) === null || _b === void 0 ? void 0 : _b[0]) === null || _c === void 0 ? void 0 : _c.value) || '';
                    // 从remark插件传递的数据中获取完整性信息
                    // 如果remark插件没有设置，则默认为true（向后兼容）
                    const isComplete = (_e = (_d = codeNode === null || codeNode === void 0 ? void 0 : codeNode.properties) === null || _d === void 0 ? void 0 : _d['data-is-code-block-complete']) !== null && _e !== void 0 ? _e : false;
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
//# sourceMappingURL=rehypeMermaid.js.map