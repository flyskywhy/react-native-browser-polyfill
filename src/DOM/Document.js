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
        return new HTMLCanvasElement(tagName);
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
