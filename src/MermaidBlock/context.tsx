import { createContext } from 'react';

const GraphContext = createContext<{
  isComplete: boolean;
}>({
  isComplete: false,
});

export default GraphContext;

export const GraphProvider: React.FC<{
  isComplete: boolean;
  children: React.ReactNode;
}> = ({ isComplete, children }) => {
  return <GraphContext.Provider value={{ isComplete }}>{children}</GraphContext.Provider>;
};
