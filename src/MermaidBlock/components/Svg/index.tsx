import { ExtraProps } from 'hast-util-to-jsx-runtime';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import panzoom from 'svg-pan-zoom';

type SvgProps = React.SVGProps<SVGSVGElement> & ExtraProps;

type SvgPanZoomInstance = ReturnType<typeof panzoom>;

const Svg: React.FC<SvgProps> = (props) => {
  const { style, ...rest } = props;

  console.log(props);

  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    let instance: SvgPanZoomInstance | undefined;
    if (svgRef.current) {
      setTimeout(() => {
        instance = panzoom(svgRef.current, {
          center: true,
          controlIconsEnabled: false,
          fit: true,
          maxZoom: 12,
          minZoom: 0.2,
        });
      }, 5000);
    }
    return () => {
      if (instance) {
        instance.destroy();
      }
    };
  }, []);

  return <svg {...rest} width="100%" height="300" style={{ ...style, maxWidth: '100%' }} ref={svgRef} />;
};

export default Svg;
