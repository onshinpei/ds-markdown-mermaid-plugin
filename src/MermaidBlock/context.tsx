import { createContext } from 'react';
import { PanZoomState } from '../panZoomState';

const GraphContext = createContext<{
  isComplete: boolean;
  panZoomState: PanZoomState;
}>({
  isComplete: false,
  panZoomState: new PanZoomState(),
});

export default GraphContext;

export const GraphProvider: React.FC<{
  isComplete: boolean;
  children: React.ReactNode;
  panZoomState: PanZoomState;
}> = ({ isComplete, children, panZoomState }) => {
  return <GraphContext.Provider value={{ isComplete, panZoomState }}>{children}</GraphContext.Provider>;
};
