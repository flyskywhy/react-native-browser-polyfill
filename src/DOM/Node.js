import {EventTarget} from 'event-target-shim';

const NODE_EVENTS = [
  'load',
  'resize',
  'mousedown',
  'pointerdown',
  'mousemove',
  'pointermove',
  'touchmove',
  'mouseup',
  'pointerup',
  'ontouchend',
];

class Node extends EventTarget(...NODE_EVENTS) {
  constructor(nodeName) {
    super();

    this.style = {};
    this.className = {
      baseVal: '',
    };
    this.nodeName = nodeName;
  }

  get ownerDocument() {
    return window.document;
  }

  appendChild() {}
  insertBefore() {}
  removeChild() {}
}

export default Node;
