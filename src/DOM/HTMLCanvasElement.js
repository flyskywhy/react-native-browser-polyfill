import Element from './Element';

class HTMLCanvasElement extends Element {
  // Please use document.createElement('canvas') in Document.js which does
  // not use HTMLCanvasElement.js here if use createCanvasElements in windows.js
  getContext(contextType) {
    return {
      fillText: (text, x, y, maxWidth) => ({}),
      measureText: (text) => ({
        width: (text || '').split('').length * 6,
        height: 24,
      }),
      fillRect: () => ({}),
      drawImage: () => ({}),
      getImageData: () => ({data: new Uint8ClampedArray([255, 0, 0, 0])}),
      getContextAttributes: () => ({
        stencil: true,
      }),
      getExtension: () => ({
        loseContext: () => {},
      }),
      putImageData: () => ({}),
      createImageData: () => ({}),
    };
  }

  toDataURL() {
    return '';
  }
}

export default HTMLCanvasElement;
