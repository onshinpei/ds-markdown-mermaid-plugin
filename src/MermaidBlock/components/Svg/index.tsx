import { ExtraProps } from 'hast-util-to-jsx-runtime';
import { useContext, useEffect, useLayoutEffect, useRef, useState } from 'react';
import panzoom from 'svg-pan-zoom';
import GraphContext from '../../context';

type SvgProps = React.SVGProps<SVGSVGElement> & ExtraProps;

type SvgPanZoomInstance = ReturnType<typeof panzoom>;

const Svg: React.FC<SvgProps> = (props) => {
  const { style, ...rest } = props;

  const { isComplete } = useContext(GraphContext);

  const svgRef = useRef<SVGSVGElement>(null!);

  useEffect(() => {
    let unmounted = false;
    let instance: SvgPanZoomInstance | undefined;
    if (isComplete) {
      setTimeout(() => {
        if (unmounted) return;
        instance = panzoom(svgRef.current, {
          center: true,
          controlIconsEnabled: false,
          fit: true,
          maxZoom: 12,
          minZoom: 0.2,
        });
      }, 50);
    }
    return () => {
      unmounted = true;
      if (instance) {
        instance.destroy();
      }
    };
  }, [isComplete]);

  return <svg {...rest} width="100%" height="300" style={{ ...style, maxWidth: '100%' }} ref={svgRef} />;
};

export default Svg;
