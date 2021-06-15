import {Dimensions} from 'react-native';

/*
 Window Resize Stub
*/

// devicePixelRatio is already set in @flyskywhy/react-native-gcanvas,
// so it's strange and wrong scale to set again in js like zdog, so we
// let devicePixelRatio be undefined here to let zdog set its own
// pixelRatio as 1, ref to `node_modules/zdog/js/illustration.js`
// window.devicePixelRatio = Dimensions.get('window').scale;

window.innerWidth = Dimensions.get('window').width;
window.clientWidth = window.innerWidth;
window.innerHeight = Dimensions.get('window').height;
window.clientHeight = window.innerHeight;
window.screen = window.screen || {};
window.screen.orientation =
  window.screen.orientation || window.clientWidth < window.clientHeight
    ? 0
    : 90;
if (!global.__RN_BROWSER_POLYFILL_RESIZE) {
  global.__RN_BROWSER_POLYFILL_RESIZE = true;
  Dimensions.addEventListener('change', () => {
    const {width, height, scale} = Dimensions.get('window');
    // window.devicePixelRatio = scale;
    window.innerWidth = width;
    window.clientWidth = width;
    window.innerHeight = height;
    window.clientHeight = height;
    window.screen.orientation = width < height ? 0 : 90;
    window.document.dispatchEvent({type: 'resize'});
  });
}
