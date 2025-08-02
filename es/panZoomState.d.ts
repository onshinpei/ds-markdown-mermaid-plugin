import type { Point } from 'mermaid/dist/types.js';
interface IOptions {
    mouseWheelZoomEnabled?: boolean;
    autoZoomOut?: boolean;
}
export declare class PanZoomState {
    private pan?;
    private zoom?;
    private pzoom;
    private isDirty;
    private resizeObserver;
    private mouseWheelZoomEnabled;
    private autoZoomOut;
    isPanEnabled: boolean;
    onPanZoomChange?: (pan: Point, zoom: number) => void;
    constructor(option?: IOptions);
    updateElement(diagramView: SVGElement, config?: {
        pan: Point;
        zoom: number;
    }): void;
    restorePanZoom(pan: Point, zoom: number): void;
    resize(): void;
    zoomIn(): void;
    zoomOut(): void;
    fit(): void;
    reset(): void;
    getSizes(): SvgPanZoom.Sizes | undefined;
}
export {};
//# sourceMappingURL=panZoomState.d.ts.map