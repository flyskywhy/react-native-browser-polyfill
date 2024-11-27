import Element from './Element';
import HTMLVideoElement from './HTMLVideoElement';
import HTMLImageElement from './HTMLImageElement';
import HTMLCanvasElement from './HTMLCanvasElement';

class Document extends Element {
  constructor() {
    super('#document');
    this.body = new Element('BODY');
    this.documentElement = new Element('HTML');
    this.readyState = 'complete';
  }

  createElement(tagName) {
    switch ((tagName || '').toLowerCase()) {
      case 'video':
        return new HTMLVideoElement(tagName);
      case 'img':
        return new HTMLImageElement(tagName);
      case 'canvas':
        const createCanvasElementsObjKeys = Object.keys(global.createCanvasElementsObj);
        if (createCanvasElements.length === 0 && createCanvasElementsObjKeys.length === 0) {
          // the reason of "begining of your APP render()" here, is that most document.createElement('canvas')
          // (as offscreen canvas) is invoked in another onscreen canvas's onCanvasCreate() and onCanvasResize() ,
          // so if not "begining of your APP render()" or just not before onscreen canvas's <GCanvasView/> ,
          // will cause `TypeError: undefined is not an object (evaluating 'canvas.width = ')` when onscreen canvas
          // set offscreen canvas.width in onscreen canvas' onCanvasCreate()
          console.warn('Need one <GCanvasView/> for each createElement at the begining of your APP render()!');
          return new HTMLCanvasElement(tagName);
          return;
        } else if (createCanvasElementsObjKeys.length) {
          if (createCanvasObjCurrent === undefined) {
            createCanvasObjCurrent = 0;
          } else {
            createCanvasObjCurrent = (createCanvasObjCurrent + 1) % createCanvasElementsObjKeys.length;
          }

          return createCanvasElementsObj[createCanvasElementsObjKeys[createCanvasObjCurrent]];
        } else {
          if (createCanvasCurrent === undefined) {
            createCanvasCurrent = 0;
          } else {
            createCanvasCurrent = (createCanvasCurrent + 1) % createCanvasElements.length;
          }

          return createCanvasElements[createCanvasCurrent];
        }
      case 'iframe':
        // Return nothing to keep firebase working.
        return null;
      default:
        return new Element(tagName);
    }
  }

  createElementNS(tagName) {
    return this.createElement(tagName);
  }

  getElementById(id) {
    return new Element('div');
  }
}

export default Document;
