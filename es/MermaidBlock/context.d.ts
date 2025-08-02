import { PanZoomState } from '../panZoomState';
interface IGraphContext {
    isComplete: boolean;
    panZoomState: PanZoomState;
    svgHeight: number;
}
interface IMutableGraphContext {
}
interface IGraphMethods {
}
declare const GraphContext: import("react").Context<IGraphContext & IMutableGraphContext & {
    methods: IGraphMethods;
}>;
export default GraphContext;
export declare const GraphProvider: React.FC<{
    isComplete: boolean;
    children: React.ReactNode;
    panZoomState: PanZoomState;
    svgHeight: number;
}>;
//# sourceMappingURL=context.d.ts.map