import React from 'react';
import { HighlightCode } from 'ds-markdown';

interface RenderCodeProps {
  code: string;
}

const RenderCode: React.FC<RenderCodeProps> = (props: RenderCodeProps) => {
  const { code } = props;
  return <HighlightCode code={code} language="mermaid" />;
};

export default RenderCode;
