import panzoom from 'svg-pan-zoom';
export class PanZoomState {
    constructor(option) {
        var _a;
        this.isDirty = false;
        this.isPanEnabled = true;
        this.resizeObserver = new ResizeObserver(() => {
            console.log('resize');
            this.resize();
            if (!this.isDirty) {
                this.reset();
            }
        });
        this.mouseWheelZoomEnabled = (option === null || option === void 0 ? void 0 : option.mouseWheelZoomEnabled) || false;
        this.autoZoomOut = (_a = option === null || option === void 0 ? void 0 : option.autoZoomOut) !== null && _a !== void 0 ? _a : false; // 默认启用自动缩放
    }
    updateElement(diagramView, config) {
        var _a;
        const { pan, zoom } = config || {};
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.destroy();
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
                var _a, _b;
                this.pan = pan;
                this.zoom = (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.getZoom();
                this.isDirty = true;
                if (this.zoom) {
                    (_b = this.onPanZoomChange) === null || _b === void 0 ? void 0 : _b.call(this, this.pan, this.zoom);
                }
            },
            onZoom: (zoom) => {
                var _a, _b;
                this.zoom = zoom;
                this.pan = (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.getPan();
                this.isDirty = true;
                if (this.pan) {
                    (_b = this.onPanZoomChange) === null || _b === void 0 ? void 0 : _b.call(this, this.pan, this.zoom);
                }
            },
        });
        // this.resizeObserver.disconnect();
        // this.resizeObserver.observe(diagramView);
        if (pan && zoom && Number.isFinite(zoom) && Number.isFinite(pan.x) && Number.isFinite(pan.y)) {
            this.restorePanZoom(pan, zoom);
        }
        else {
            this.reset();
        }
        // we start out with both pan and zoom enabled so that the tool can auto position view refreshed
        // then set enable/disable pan based on state
        if (this.isPanEnabled) {
            this.pzoom.enablePan();
            this.pzoom.enableZoom();
        }
        else {
            this.pzoom.disableZoom();
            this.pzoom.disablePan();
        }
        if (pan === undefined && zoom === undefined) {
            this.reset();
        }
    }
    restorePanZoom(pan, zoom) {
        if (!this.pzoom) {
            console.error('PanZoomState.restorePanZoom: pzoom is not initialized');
            return;
        }
        this.pzoom.zoom(zoom);
        this.pzoom.pan(pan);
    }
    resize() {
        var _a;
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.resize();
        if (!this.isDirty) {
            this.reset();
        }
    }
    zoomIn() {
        var _a;
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.zoomIn();
    }
    zoomOut() {
        var _a;
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.zoomOut();
    }
    fit() {
        var _a;
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.fit();
    }
    reset() {
        var _a, _b;
        (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.reset();
        // 根据配置决定是否自动缩放以避免工具栏重叠
        if (this.autoZoomOut) {
            (_b = this.pzoom) === null || _b === void 0 ? void 0 : _b.zoom(0.875);
        }
        this.isDirty = false;
    }
    getSizes() {
        var _a;
        return (_a = this.pzoom) === null || _a === void 0 ? void 0 : _a.getSizes();
    }
}
//# sourceMappingURL=panZoomState.js.map