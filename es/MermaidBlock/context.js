import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useMemo, useReducer } from 'react';
import { PanZoomState } from '../panZoomState.js';
const GraphContext = createContext({
    isComplete: false,
    panZoomState: new PanZoomState(),
    svgHeight: 380,
    methods: {},
});
export default GraphContext;
var ActionType;
(function (ActionType) {
    ActionType["SET_SVG_HEIGHT"] = "setSvgHeight";
})(ActionType || (ActionType = {}));
function reducer(state, action) {
    return state;
}
export const GraphProvider = ({ isComplete, children, panZoomState, svgHeight }) => {
    const [state, dispatch] = useReducer(reducer, {});
    const contextValue = useMemo(() => ({ isComplete, panZoomState, svgHeight, ...state, methods: {} }), [isComplete, panZoomState, svgHeight, state]);
    return _jsx(GraphContext.Provider, { value: contextValue, children: children });
};
//# sourceMappingURL=context.js.map