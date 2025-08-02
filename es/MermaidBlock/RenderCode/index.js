import { jsx as _jsx } from "react/jsx-runtime";
import { HighlightCode } from 'ds-markdown';
const RenderCode = (props) => {
    const { code } = props;
    return _jsx(HighlightCode, { code: code, language: "mermaid" });
};
export default RenderCode;
//# sourceMappingURL=index.js.map