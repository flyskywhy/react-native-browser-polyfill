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
      putImageData: () => ({}),
      createImageData: () => ({}),

      // even OpenGL ES not support getContextAttributes as described in
      // https://github.com/flyskywhy/react-native-gcanvas/blob/2.3.33/core/src/gcanvas/GWebglContext.cpp#L1251
      // and functions above are for 'canvas' below are for 'webgl',
      // still define getContextAttributes here for running well with
      // https://github.com/flyskywhy/snakeRN/tree/v3.1.1
      getContextAttributes: () => ({
        stencil: true,
      }),

      getExtension: () => ({
        loseContext: () => {},
      }),
    };
  }

  toDataURL() {
    return '';
  }
}

export default HTMLCanvasElement;
