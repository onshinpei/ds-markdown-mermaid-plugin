import React from 'react';

interface RenderGraphProps {
  id?: number;
}

const modulePrefix = 'RenderGraph';
const RenderGraph: React.FC<RenderGraphProps> = (props: RenderGraphProps) => {
  return <div className={modulePrefix}></div>;
};

export default RenderGraph;
