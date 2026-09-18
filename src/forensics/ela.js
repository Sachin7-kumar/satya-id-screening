/**
 * SATYA-ID: Real-Time Error Level Analysis (ELA) & Compression Forensic Engine
 * Uses HTML5 Canvas to re-compress images at defined JPEG qualities, calculates
 * per-pixel Euclidean difference tensors, and renders false-color forensic heatmaps.
 */

export const ELAEngine = {
  /**
   * Performs Error Level Analysis on an image element or canvas
   * @param {HTMLImageElement|HTMLCanvasElement} sourceImage
   * @param {Object} options - { quality: 0.92, scale: 24, heatmap: true, threshold: 45 }
   * @returns {Promise<Object>}
   */
  async analyze(sourceImage, options = {}) {
    const quality = options.quality !== undefined ? options.quality : 0.92;
    const scale = options.scale !== undefined ? options.scale : 25;
    const heatmap = options.heatmap !== undefined ? options.heatmap : true;
    const threshold = options.threshold !== undefined ? options.threshold : 40;

    const width = sourceImage.naturalWidth || sourceImage.width || 800;
    const height = sourceImage.naturalHeight || sourceImage.height || 500;

    // 1. Offscreen source canvas
    const origCanvas = document.createElement('canvas');
    origCanvas.width = width;
    origCanvas.height = height;
    const origCtx = origCanvas.getContext('2d', { willReadFrequently: true });
    origCtx.drawImage(sourceImage, 0, 0, width, height);
    const origData = origCtx.getImageData(0, 0, width, height);

    // 2. Re-compress to JPEG at selected quality
    const jpegDataUrl = origCanvas.toDataURL('image/jpeg', quality);

    // 3. Load recompressed image into a second canvas
    const compImage = await this._loadImage(jpegDataUrl);
    const compCanvas = document.createElement('canvas');
    compCanvas.width = width;
    compCanvas.height = height;
    const compCtx = compCanvas.getContext('2d', { willReadFrequently: true });
    compCtx.drawImage(compImage, 0, 0, width, height);
    const compData = compCtx.getImageData(0, 0, width, height);

    // 4. Difference & Heatmap Generation
    const outputCanvas = document.createElement('canvas');
    outputCanvas.width = width;
    outputCanvas.height = height;
    const outCtx = outputCanvas.getContext('2d');
    const outData = outCtx.createImageData(width, height);

    const origPixels = origData.data;
    const compPixels = compData.data;
    const outPixels = outData.data;

    let totalDiff = 0;
    let maxDiff = 0;
    let highErrorPixelCount = 0;

    // Grid counters to locate anomaly hotspots
    const gridCols = 16;
    const gridRows = 10;
    const grid = Array.from({ length: gridRows }, () => new Float32Array(gridCols));
    const cellW = width / gridCols;
    const cellH = height / gridRows;

    const len = origPixels.length;
    for (let i = 0; i < len; i += 4) {
      const dr = Math.abs(origPixels[i] - compPixels[i]);
      const dg = Math.abs(origPixels[i + 1] - compPixels[i + 1]);
      const db = Math.abs(origPixels[i + 2] - compPixels[i + 2]);

      const diffAvg = (dr + dg + db) / 3.0;
      totalDiff += diffAvg;
      if (diffAvg > maxDiff) maxDiff = diffAvg;

      // Scaled error intensity
      const amplified = Math.min(255, diffAvg * scale);

      if (amplified > threshold) {
        highErrorPixelCount++;
        const pixelIdx = i / 4;
        const px = pixelIdx % width;
        const py = Math.floor(pixelIdx / width);
        const gx = Math.min(gridCols - 1, Math.floor(px / cellW));
        const gy = Math.min(gridRows - 1, Math.floor(py / cellH));
        grid[gy][gx] += 1;
      }

      if (heatmap) {
        // False-Color Thermal Mapping:
        // Low: Deep Navy/Black -> Cyan -> Green -> Yellow -> Bright Red/Magenta (Tamper Spike)
        const rgb = this._errorToHeatmapRGB(amplified);
        outPixels[i] = rgb.r;
        outPixels[i + 1] = rgb.g;
        outPixels[i + 2] = rgb.b;
        outPixels[i + 3] = 255;
      } else {
        // Monochromatic ELA
        outPixels[i] = amplified;
        outPixels[i + 1] = amplified;
        outPixels[i + 2] = amplified;
        outPixels[i + 3] = 255;
      }
    }

    outCtx.putImageData(outData, 0, 0);

    const totalPixels = width * height;
    const meanError = totalDiff / totalPixels;
    const anomalyRatio = (highErrorPixelCount / totalPixels) * 100;

    // Detect high density clusters (suspected tamper bounding boxes)
    const anomalyRegions = this._findHotspotRegions(grid, cellW, cellH, gridCols, gridRows);

    return {
      elaCanvas: outputCanvas,
      meanError: meanError.toFixed(2),
      maxError: maxDiff.toFixed(1),
      anomalyRatio: anomalyRatio.toFixed(2),
      anomalyRegions,
      isSuspicious: anomalyRatio > 2.8 || anomalyRegions.length > 0,
      verdict: anomalyRatio > 4.5
        ? 'HIGH_PROBABILITY_TAMPERING'
        : (anomalyRatio > 2.2 ? 'SUSPECT_RECOMPRESSION' : 'PRISTINE_COMPRESSION')
    };
  },

  _loadImage(src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = (e) => reject(e);
      img.src = src;
    });
  },

  /**
   * False-color mapping function for thermal forensic heatmaps
   */
  _errorToHeatmapRGB(val) {
    const norm = Math.min(1.0, val / 255.0);
    let r = 0, g = 0, b = 0;

    if (norm < 0.15) {
      // Background: Deep Slate / Navy
      r = Math.floor(norm * 40);
      g = Math.floor(norm * 60);
      b = Math.floor(norm * 180);
    } else if (norm < 0.4) {
      // Moderate: Cyan / Green
      const t = (norm - 0.15) / 0.25;
      r = 0;
      g = Math.floor(180 * t);
      b = Math.floor(220 * (1 - t * 0.5));
    } else if (norm < 0.7) {
      // Elevated: Yellow / Orange
      const t = (norm - 0.4) / 0.3;
      r = Math.floor(255 * t);
      g = 220;
      b = 0;
    } else {
      // Critical anomaly: Blazing Red / Hot Magenta
      const t = (norm - 0.7) / 0.3;
      r = 255;
      g = Math.floor(220 * (1 - t));
      b = Math.floor(180 * t);
    }
    return { r, g, b };
  },

  /**
   * Cluster high anomaly grid cells into rectangular bounding boxes
   */
  _findHotspotRegions(grid, cellW, cellH, cols, rows) {
    const hotspots = [];
    const threshold = (cellW * cellH) * 0.18; // >18% pixels in cell are anomalous

    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c] > threshold) {
          hotspots.push({
            x: Math.round(c * cellW),
            y: Math.round(r * cellH),
            width: Math.round(cellW * 1.5),
            height: Math.round(cellH * 1.2),
            density: (grid[r][c] / (cellW * cellH)).toFixed(2)
          });
        }
      }
    }
    return hotspots;
  }
};
