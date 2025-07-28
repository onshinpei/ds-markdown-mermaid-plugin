import { createContext, useCallback, useMemo, useReducer } from 'react';
import { PanZoomState } from '../panZoomState';

interface IGraphContext {
  isComplete: boolean;
  panZoomState: PanZoomState;
  svgHeight: number;
}

interface IMutableGraphContext {}

interface IGraphMethods {}

const GraphContext = createContext<
  IGraphContext &
    IMutableGraphContext & {
      methods: IGraphMethods;
    }
>({
  isComplete: false,
  panZoomState: new PanZoomState(),
  svgHeight: 380,
  methods: {},
});

export default GraphContext;

enum ActionType {
  SET_SVG_HEIGHT = 'setSvgHeight',
}

function reducer(state: IMutableGraphContext, action: any) {
  return state;
}

export const GraphProvider: React.FC<{
  isComplete: boolean;
  children: React.ReactNode;
  panZoomState: PanZoomState;
  svgHeight: number;
}> = ({ isComplete, children, panZoomState, svgHeight }) => {
  const [state, dispatch] = useReducer(reducer, {});

  const setSvgHeight = useCallback((height: number) => {
    dispatch({ type: ActionType.SET_SVG_HEIGHT, payload: height });
  }, []);

  const contextValue = useMemo(() => ({ isComplete, panZoomState, svgHeight, ...state, methods: {} }), [isComplete, panZoomState, svgHeight, state]);
  return <GraphContext.Provider value={contextValue}>{children}</GraphContext.Provider>;
};
