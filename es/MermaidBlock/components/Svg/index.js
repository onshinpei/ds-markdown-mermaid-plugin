import { jsx as _jsx } from "react/jsx-runtime";
import { useContext, useEffect, useRef } from 'react';
import GraphContext from '../../context.js';
const Svg = (props) => {
    const { style, ...rest } = props;
    const { isComplete, panZoomState, svgHeight } = useContext(GraphContext);
    const svgRef = useRef(null);
    useEffect(() => {
        let unmounted = false;
        if (isComplete) {
            setTimeout(() => {
                if (unmounted)
                    return;
                panZoomState.updateElement(svgRef.current);
            }, 50);
        }
        return () => {
            panZoomState.reset();
        };
    }, [isComplete]);
    return _jsx("svg", { ...rest, width: "100%", height: svgHeight, style: { ...style, maxWidth: '100%' }, ref: svgRef });
};
export default Svg;
//# sourceMappingURL=index.js.map