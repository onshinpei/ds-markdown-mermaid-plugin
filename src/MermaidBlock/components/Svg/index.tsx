import { ExtraProps } from 'hast-util-to-jsx-runtime';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import GraphContext from '../../context';

type SvgProps = React.SVGProps<SVGSVGElement> & ExtraProps;

const Svg: React.FC<SvgProps> = (props) => {
  const { style, ...rest } = props;

  const { isComplete, panZoomState, svgHeight } = useContext(GraphContext);

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    let unmounted = false;
    if (isComplete) {
      setTimeout(() => {
        if (unmounted) return;
        panZoomState.updateElement(svgRef.current);
      }, 50);
    }
    return () => {
      panZoomState.reset();
    };
  }, [isComplete]);

  return <svg {...rest} width="100%" height={svgHeight} style={{ ...style, maxWidth: '100%' }} ref={svgRef} />;
};

export default Svg;
