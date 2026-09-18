import React, { useEffect, useRef, useState } from 'react';
import Exploded3DInspector from './Exploded3DInspector';
import DiffCompareSlider from './DiffCompareSlider';

export default function ForensicCanvasViewer({
  sourceCanvas,
  elaResult,
  viewMode,
  setViewMode,
  elaScale,
  setElaScale,
  elaThreshold,
  setElaThreshold,
  testCase
}) {
  const containerRef = useRef(null);
  const tamperBoxRef = useRef(null);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [isInverted, setIsInverted] = useState(false);

  useEffect(() => {
    if (viewMode === '3d' || viewMode === 'compare') return;
    if (!sourceCanvas || !containerRef.current) return;

    const container = containerRef.current;
    const existing = container.querySelector('canvas');
    if (existing) existing.remove();

    let displayCanvas;

    if (viewMode === 'original') {
      displayCanvas = sourceCanvas;
      if (tamperBoxRef.current) tamperBoxRef.current.style.display = 'none';
    } else if (viewMode === 'ela') {
      displayCanvas = elaResult ? elaResult.elaCanvas : sourceCanvas;
      if (tamperBoxRef.current) tamperBoxRef.current.style.display = 'none';
    } else {
      // OVERLAY MODE
      const overlayCanvas = document.createElement('canvas');
      overlayCanvas.width = sourceCanvas.width;
      overlayCanvas.height = sourceCanvas.height;
      const oCtx = overlayCanvas.getContext('2d');
      oCtx.drawImage(sourceCanvas, 0, 0);

      if (elaResult && elaResult.elaCanvas) {
        oCtx.globalAlpha = 0.52;
        oCtx.drawImage(elaResult.elaCanvas, 0, 0);
        oCtx.globalAlpha = 1.0;
      }

      displayCanvas = overlayCanvas;

      if (testCase?.data?.isTampered && testCase?.data?.tamperBox && tamperBoxRef.current) {
        const box = testCase.data.tamperBox;
        const scaleX = container.clientWidth / sourceCanvas.width;
        const scaleY = container.clientHeight / sourceCanvas.height;
        const scale = Math.min(scaleX, scaleY);

        const offsetX = (container.clientWidth - sourceCanvas.width * scale) / 2;
        const offsetY = (container.clientHeight - sourceCanvas.height * scale) / 2;

        const tb = tamperBoxRef.current;
        tb.style.display = 'block';
        tb.style.left = `${offsetX + box.x * scale}px`;
        tb.style.top = `${offsetY + box.y * scale}px`;
        tb.style.width = `${box.w * scale}px`;
        tb.style.height = `${box.h * scale}px`;
      } else if (tamperBoxRef.current) {
        tamperBoxRef.current.style.display = 'none';
      }
    }

    if (displayCanvas) {
      displayCanvas.style.transform = `scale(${zoomLevel})`;
      displayCanvas.style.filter = isInverted ? 'invert(1) hue-rotate(180deg)' : 'none';
      displayCanvas.style.transition = 'transform 0.15s ease';
      container.appendChild(displayCanvas);
    }
  }, [sourceCanvas, elaResult, viewMode, testCase, zoomLevel, isInverted]);

  return (
    <div className="gov-card-container canvas-card-gov">
      <div className="gov-card-header">
        <div className="gov-card-title">
          <span>🔍</span> DOCUMENT FORENSIC EXAMINATION VIEWPORT
        </div>
        <div className="viewport-controls">
          <button 
            className="gov-tool-btn" 
            title="Zoom In" 
            onClick={() => setZoomLevel(z => Math.min(2.5, +(z + 0.2).toFixed(1)))}
          >
            + Zoom
          </button>
          <button 
            className="gov-tool-btn" 
            title="Zoom Out" 
            onClick={() => setZoomLevel(z => Math.max(0.6, +(z - 0.2).toFixed(1)))}
          >
            - Zoom
          </button>
          <button 
            className="gov-tool-btn" 
            title="Reset Zoom" 
            onClick={() => setZoomLevel(1)}
          >
            Reset
          </button>
          <button 
            className={`gov-tool-btn ${isInverted ? 'active' : ''}`} 
            title="Invert Colors" 
            onClick={() => setIsInverted(v => !v)}
          >
            Invert
          </button>
        </div>
      </div>

      {/* Mode Selector Tabs */}
      <div className="gov-canvas-tabs">
        <button
          className={`canvas-tab-btn ${viewMode === 'original' ? 'active' : ''}`}
          onClick={() => setViewMode('original')}
        >
          Original Document
        </button>
        <button
          className={`canvas-tab-btn ${viewMode === 'ela' ? 'active' : ''}`}
          onClick={() => setViewMode('ela')}
        >
          ELA Compression Heatmap
        </button>
        <button
          className={`canvas-tab-btn ${viewMode === 'overlay' ? 'active' : ''}`}
          onClick={() => setViewMode('overlay')}
        >
          Forensic Overlay
        </button>
        <button
          className={`canvas-tab-btn ${viewMode === 'compare' ? 'active' : ''}`}
          onClick={() => setViewMode('compare')}
        >
          Difference Wipe
        </button>
        <button
          className={`canvas-tab-btn ${viewMode === '3d' ? 'active' : ''}`}
          onClick={() => setViewMode('3d')}
        >
          3D Strata Inspector
        </button>
      </div>

      {/* ELA Sensitivity Sliders */}
      {(viewMode === 'ela' || viewMode === 'overlay') && (
        <div className="gov-slider-strip">
          <div className="slider-item">
            <label>ELA Sensitivity Gain: <strong>{elaScale}x</strong></label>
            <input
              type="range"
              min="10"
              max="45"
              value={elaScale}
              onChange={(e) => setElaScale(Number(e.target.value))}
            />
          </div>
          <div className="slider-item">
            <label>Noise Floor Threshold: <strong>{elaThreshold}</strong></label>
            <input
              type="range"
              min="10"
              max="70"
              value={elaThreshold}
              onChange={(e) => setElaThreshold(Number(e.target.value))}
            />
          </div>
        </div>
      )}

      {/* Canvas Viewport Body */}
      <div className="gov-canvas-body">
        {viewMode === 'compare' ? (
          <DiffCompareSlider
            originalCanvas={sourceCanvas}
            elaCanvas={elaResult ? elaResult.elaCanvas : sourceCanvas}
          />
        ) : viewMode === '3d' ? (
          <Exploded3DInspector
            sourceCanvas={sourceCanvas}
            elaResult={elaResult}
            testCase={testCase}
          />
        ) : (
          <div className="canvas-render-container" ref={containerRef}>
            <div ref={tamperBoxRef} className="tamper-box-marker" style={{ display: 'none' }}>
              <span className="tamper-box-label">TAMPER DETECTED</span>
            </div>
          </div>
        )}
      </div>

      <div className="gov-canvas-footer">
        <div className="canvas-footer-info">
          <span>Target: <strong>{testCase?.name || 'Document'}</strong></span>
          <span>&bull;</span>
          <span>Resolution: <strong>{sourceCanvas ? `${sourceCanvas.width}x${sourceCanvas.height}px` : 'N/A'}</strong></span>
        </div>
        <div className="canvas-footer-tag">
          {viewMode === 'ela' ? 'Adaptive Error Level Analysis (Q=92%)' : viewMode === 'overlay' ? 'Dual-Layer Pixel Differencing' : 'Volatile In-RAM Buffer'}
        </div>
      </div>
    </div>
  );
}
