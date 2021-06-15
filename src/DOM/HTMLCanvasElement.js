import Element from './Element';

class HTMLCanvasElement extends Element {
  // TODO: with @flyskywhy/react-native-gcanvas/packages/gcanvas/src/env/off-screen-canvas.js
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
