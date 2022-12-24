import {Buffer} from 'buffer';
import {TextDecoder, TextEncoder} from 'text-encoding';
import atob from 'atob/node-atob.js';
import btoa from 'btoa';
import Element from './DOM/Element';
import Document from './DOM/Document';

import './performance';

import HTMLImageElement from './DOM/HTMLImageElement';
import HTMLCanvasElement from './DOM/HTMLCanvasElement';
import HTMLVideoElement from './DOM/HTMLVideoElement';
import CanvasRenderingContext2D from '@flyskywhy/react-native-gcanvas/packages/gcanvas/src/context/2d/RenderingContext';
import WebGLRenderingContext from '@flyskywhy/react-native-gcanvas/packages/gcanvas/src/context/webgl/RenderingContext';
import ImageData from '@canvas/image-data/index';

global.Document = global.Document || Document;
global.Element = global.Element || Element;
global.HTMLImageElement = global.HTMLImageElement || HTMLImageElement;
global.Image = global.Image || HTMLImageElement;
global.ImageBitmap = global.ImageBitmap || HTMLImageElement;
global.HTMLVideoElement = global.HTMLVideoElement || HTMLVideoElement;
global.Video = global.Video || HTMLVideoElement;
global.HTMLCanvasElement = global.HTMLCanvasElement || HTMLCanvasElement;
global.Canvas = global.Canvas || HTMLCanvasElement;
global.CanvasRenderingContext2D =
  global.CanvasRenderingContext2D || CanvasRenderingContext2D;
global.WebGLRenderingContext =
  global.WebGLRenderingContext || WebGLRenderingContext;
global.ImageData = ImageData;

// createCanvasElements and createCanvasCurrent are not members of standard global, they are
// used for document.createElement('canvas') (as offscreen canvas) works with relevant offscreenCanvas={true} component:
//            <GCanvasView
//              style={{
//                width: 1000, // 1000 should enough for offscreen canvas usage
//                height: 1000, // or Dimensions.get('window').height * 2 like https://github.com/flyskywhy/react-native-babylonjs/commit/d5df5d2
//                position: 'absolute',
//                left: 1000, // 1000 should enough to not display on screen means offscreen canvas :P
//                top: 0,
//                zIndex: -100, // -100 should enough to not bother onscreen canvas
//              }}
//              offscreenCanvas={true}
//              onCanvasCreate={(canvas) => this.setState({hasOc1: true})} // it's better to setState some as describe in https://github.com/flyskywhy/react-native-gcanvas/blob/master/README.MD
//              devicePixelRatio={1} // should not 1 < devicePixelRatio < 2 as float to avoid pixel offset flaw when GetImageData with PixelsSampler in @flyskywhy/react-native-gcanvas/core/src/support/GLUtil.cpp
//              isGestureResponsible={false} // who will need gesture with offscreen canvas?
//            />
global.createCanvasElements = [];
global.createCanvasCurrent = undefined;

window.scrollTo = window.scrollTo || (() => ({}));

window.addEventListener = (eventName, listener) => {
  window.document.addEventListener(eventName, listener);

  if (eventName.toLowerCase() === 'load') {
    setTimeout(() => {
      window.document.dispatchEvent({type: 'load'});
    }, 1);
  }
};

window.removeEventListener = (eventName, listener) =>
  window.document.removeEventListener(eventName, listener);

window.dispatchEvent = (event) => window.document.dispatchEvent(event);

window.DOMParser = window.DOMParser || require('xmldom-qsa').DOMParser;
window.atob = atob;
window.btoa = btoa;
global.Buffer = Buffer;
global.TextDecoder = global.TextDecoder || TextDecoder;
global.TextEncoder = global.TextEncoder || TextEncoder;

const agent = 'chrome';
global.userAgent = global.userAgent || agent;
global.navigator.userAgent = global.navigator.userAgent || agent;
global.navigator.product = 'ReactNative';
global.navigator.platform = global.navigator.platform || [];
global.navigator.appVersion = global.navigator.appVersion || 'OS10';
global.navigator.maxTouchPoints = global.navigator.maxTouchPoints || 5;
global.navigator.standalone = global.navigator.hasOwnProperty('standalone')
  ? global.navigator.standalone
  : true;

window.chrome = window.chrome || {
  extension: {},
};

// https://www.w3schools.com/js/js_window_location.asp
window.location = window.location || {
  href: '', //  window.location.href returns the href (URL) of the current page
  hostname: '', //window.location.hostname returns the domain name of the web host
  pathname: '', //window.location.pathname returns the path and filename of the current page
  protocol: 'https', //window.location.protocol returns the web protocol used (http: or https:)
  assign: null, //window.location.assign loads a new document
};

if (global.document) {
  global.document.readyState = 'complete';
}
