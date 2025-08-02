import type { Point } from 'mermaid/dist/types.js';
import panzoom from 'svg-pan-zoom';
type PanZoom = typeof panzoom;

interface IOptions {
  mouseWheelZoomEnabled?: boolean;
  autoZoomOut?: boolean; // 新增：是否自动缩小以避免工具栏重叠
}

export class PanZoomState {
  private pan?: Point;
  private zoom?: number;
  private pzoom: PanZoom | undefined;
  private isDirty = false;
  private resizeObserver: ResizeObserver;
  private mouseWheelZoomEnabled: boolean;
  private autoZoomOut: boolean; // 新增：自动缩放配置

  public isPanEnabled: boolean;
  public onPanZoomChange?: (pan: Point, zoom: number) => void;

  constructor(option?: IOptions) {
    this.isPanEnabled = true;
    this.resizeObserver = new ResizeObserver(() => {
      console.log('resize');
      this.resize();
      if (!this.isDirty) {
        this.reset();
      }
    });
    this.mouseWheelZoomEnabled = option?.mouseWheelZoomEnabled || false;
    this.autoZoomOut = option?.autoZoomOut ?? false; // 默认启用自动缩放
  }

  public updateElement(diagramView: SVGElement, config?: { pan: Point; zoom: number }) {
    const { pan, zoom } = config || {};
    this.pzoom?.destroy();
    // let hammer: HammerManager | undefined;
    this.pzoom = panzoom(diagramView, {
      center: true,
      fit: true,
      panEnabled: true,
      zoomEnabled: true,
      controlIconsEnabled: false,
      dblClickZoomEnabled: true,
      preventMouseEventsDefault: true,
      mouseWheelZoomEnabled: this.mouseWheelZoomEnabled,

      maxZoom: 12,
      minZoom: 0.2,
      onPan: (pan) => {
        this.pan = pan;
        this.zoom = this.pzoom?.getZoom();
        this.isDirty = true;
        if (this.zoom) {
          this.onPanZoomChange?.(this.pan, this.zoom);
        }
      },
      onZoom: (zoom) => {
        this.zoom = zoom;
        this.pan = this.pzoom?.getPan();
        this.isDirty = true;
        if (this.pan) {
          this.onPanZoomChange?.(this.pan, this.zoom);
        }
      },
    });

    // this.resizeObserver.disconnect();
    // this.resizeObserver.observe(diagramView);

    if (pan && zoom && Number.isFinite(zoom) && Number.isFinite(pan.x) && Number.isFinite(pan.y)) {
      this.restorePanZoom(pan, zoom);
    } else {
      this.reset();
    }

    // we start out with both pan and zoom enabled so that the tool can auto position view refreshed
    // then set enable/disable pan based on state
    if (this.isPanEnabled) {
      this.pzoom.enablePan();
      this.pzoom.enableZoom();
    } else {
      this.pzoom.disableZoom();
      this.pzoom.disablePan();
    }

    if (pan === undefined && zoom === undefined) {
      this.reset();
    }
  }

  public restorePanZoom(pan: Point, zoom: number) {
    if (!this.pzoom) {
      console.error('PanZoomState.restorePanZoom: pzoom is not initialized');
      return;
    }
    this.pzoom.zoom(zoom);
    this.pzoom.pan(pan);
  }

  public resize() {
    this.pzoom?.resize();
    if (!this.isDirty) {
      this.reset();
    }
  }

  public zoomIn() {
    this.pzoom?.zoomIn();
  }

  public zoomOut() {
    this.pzoom?.zoomOut();
  }

  public fit() {
    this.pzoom?.fit();
  }

  public reset() {
    this.pzoom?.reset();
    // 根据配置决定是否自动缩放以避免工具栏重叠
    if (this.autoZoomOut) {
      this.pzoom?.zoom(0.875);
    }
    this.isDirty = false;
  }

  public getSizes() {
    return this.pzoom?.getSizes();
  }
}
