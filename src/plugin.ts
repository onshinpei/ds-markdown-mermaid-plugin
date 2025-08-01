import { createBuildInPlugin, mermaidId } from 'ds-markdown/plugins';
import rehypeMermaid from './rehypeMermaid';
import MermaidBlock from './MermaidBlock';
import remarkMermaid from './remarkMermaid';

const plugin = createBuildInPlugin({
  id: mermaidId,
  rehypePlugin: [rehypeMermaid],
  remarkPlugin: [remarkMermaid],
  components: {
    MermaidBlock: MermaidBlock as any,
  },
});

export default plugin;
