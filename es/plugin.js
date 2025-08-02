import { createBuildInPlugin, mermaidId } from 'ds-markdown/plugins';
import rehypeMermaid from './rehypeMermaid.js';
import MermaidBlock from './MermaidBlock.js';
import remarkMermaid from './remarkMermaid.js';
const plugin = createBuildInPlugin({
    id: mermaidId,
    rehypePlugin: [rehypeMermaid],
    remarkPlugin: [remarkMermaid],
    components: {
        MermaidBlock: MermaidBlock,
    },
});
export default plugin;
//# sourceMappingURL=plugin.js.map