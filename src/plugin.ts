import { createBuildInPlugin, mermaidId } from 'ds-markdown/plugins';
import rehypeMermaid from './rehypeMermaid';
import MermaidBlock from './MermaidBlock';

const plugin = createBuildInPlugin({
  id: mermaidId,
  rehypePlugin: [rehypeMermaid],
  components: {
    MermaidBlock,
  },
});

export default plugin;
