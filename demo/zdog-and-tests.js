import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

// also can just move this line into your root `/index.js` , `/index.android.js` , `/index.ios.js` or `/index.native.js`.
import '@flyskywhy/react-native-browser-polyfill';

import {GCanvasView} from '@flyskywhy/react-native-gcanvas';
import {Asset} from 'expo-asset';
import * as FileSystem from 'expo-file-system';
import Zdog from 'zdog';

const tests = {
  timer: () => {
    const tag = 'test-timer';
    console.time(tag);
    console.timeEnd(tag);
    console.count(tag);
  },
  userAgent: () => {
    console.log('userAgent: ', global.userAgent);
  },
  process: () => {
    console.log('process: ', global.process);
  },
  navigator: () => {
    console.log('navigator: ', global.navigator);
  },
  performance: () => {
    console.log('performance: ', Object.keys(global.performance));
  },
  window: () => {
    console.log('location: ', window.location);
  },
  base64: async () => {
    const asset = Asset.fromModule(require('./image.png'));
    await asset.downloadAsync();
    if (Platform.OS === 'web') {
      const {localUri, width, height} = asset;
      console.log('B64: Loaded Image', {localUri, width, height});
      return;
    } else {
      console.log('B64: ASSET:', asset.localUri);
    }
    const data = (
      await FileSystem.readAsStringAsync(asset.localUri, {
        encoding: FileSystem.EncodingType.Base64,
      })
    ).trim();

    const pngPrefix = 'data:image/png;base64,';
    // console.log('B64: DATA: ', pngPrefix + data);
    const image = new global.HTMLImageElement();
    image.addEventListener('error', () => {
      console.log('B64: Error Loading Image');
    });
    image.onload = () => {
      const {src, width, height} = image;
      console.log('B64: Loaded Image', {src, width, height});
    };
    image.src = pngPrefix + data;
  },
  correctElementsCreated: () => {
    const {
      HTMLImageElement,
      ImageBitmap,
      HTMLVideoElement,
      HTMLCanvasElement,
    } = global;
    const types = [
      {type: 'img', inst: HTMLImageElement},
      {type: 'video', inst: HTMLVideoElement},
      {type: 'canvas', inst: HTMLCanvasElement},
      {type: 'img', inst: ImageBitmap},
    ];
    types.forEach((item) => {
      const element = document.createElement(item.type);
      console.log(
        'type',
        item.type,
        element instanceof item.inst,
        element instanceof Number,
      );
    });
  },
  elements: () => {
    const {
      HTMLImageElement,
      Image,
      ImageBitmap,
      HTMLVideoElement,
      Video,
      HTMLCanvasElement,
      Canvas,
    } = global;
    const elements = {
      HTMLImageElement,
      Image,
      ImageBitmap,
      HTMLVideoElement,
      Video,
      HTMLCanvasElement,
      Canvas,
    };
    console.warn(
      'Elements: ',
      Object.keys(elements).map((key) => ({[key]: !!elements[key]})),
    );
  },
  loadImage: () => {
    const image = document.createElement('img');
    image.addEventListener('error', () => {
      console.log('Error Loading Image');
    });
    image.onload = () => {
      const {src, width, height} = image;
      console.log('Loaded Image', {src, width, height});
    };
    image.src = 'https://avatars0.githubusercontent.com/u/9664363?s=40&v=4';
  },
  textDecoder: () => {
    console.log('TextDecoder: ', !!global.TextDecoder);
    const utfLabel = 'utf-8';
    const options = {fatal: true};
    const decoder = new TextDecoder(utfLabel, options);

    let data = Buffer.from('Hello');
    let buffer = '';
    buffer += decoder.decode(data, {stream: true});
    console.log('TextDecoder buffer', buffer, ' from: ', data);
  },
  context2d: () => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    console.log(context);
  },
  contextwebgl: () => {
    const canvas = document.createElement('canvas');
    const webgl = canvas.getContext('webgl');
    console.log(webgl);
  },
  domParser: () => {
    console.log('window.DOMParser: ', !!window.DOMParser);
    const parser = new window.DOMParser();

    const html = `
    <!DOCTYPE html>
    <html>
      <body>
        <div class="container" id="container-id" name="container-name">
          some text content
          <h1 class="header">Charlie Cheever</h1>
          <p id="subtitle">is my dad.</p>
          <input name="named-input" type="text" value="Ben Affleck" />
        </div>
      </body>
    </html>
    `;
    const dom = parser.parseFromString(html, 'text/html');
    const container = dom.getElementById('container-id');

    console.log('_nsMap', typeof container._nsMap);
    console.log('attributes', typeof container.attributes);
    console.log('childNodes', typeof container.childNodes);
    console.log('ownerDocument', typeof container.ownerDocument);
    console.log('nodeName', container.nodeName); // div on native; DIV on Web
    console.log('tagName', container.tagName); // div on native; DIV on Web
    console.log('namespaceURI', container.namespaceURI);
    console.log('localName', container.localName); // div on native; div on Web
    console.log('parentNode', typeof container.parentNode);
    console.log('previousSibling', typeof container.previousSibling);
    console.log('lineNumber', container.lineNumber); // 5 on native; undefined on Web
    console.log('nextSibling', typeof container.nextSibling);
    console.log('columnNumber', container.columnNumber); // 9 on native; undefined on Web
    console.log('firstChild', typeof container.firstChild);
    console.log('lastChild', typeof container.lastChild);
    // Object.keys(container) on Web is [] , so use above instead
    // Object.keys(container).forEach((key) => {
    //   const obj = container[key];
    //   console.log(`DOMParser: container.${key}: ${obj}`);
    // });
  },
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.canvas = null;

    // only useful on Android, because it's always true on iOS
    this.isGReactTextureViewReady = true;
  }

  componentDidMount() {
    window.addEventListener('resize', this.onLayout);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onLayout);
  }

  onLayout = () => {
    console.log(
      'Update Layout:',
      window.innerWidth,
      window.innerHeight,
      window.screen.orientation,
    );
  };

  runTests = () => {
    Object.keys(tests).forEach((key) => {
      try {
        console.log('Run Test: ', key);
        tests[key]();
      } catch (error) {
        console.error(`Error running ${key} test: `, error);
      }
    });
  };

  initCanvas = (canvas) => {
    if (this.canvas) {
      return;
    }

    this.canvas = canvas;
    if (Platform.OS === 'web') {
      // canvas.width not equal canvas.clientWidth, so have to assign again
      this.canvas.width = this.canvas.clientWidth;
      this.canvas.height = this.canvas.clientHeight;
    }
  };

  zdog = () => {
    if (this.canvas) {
      let illo = new Zdog.Illustration({
        element: this.canvas,
        dragRotate: true,
        onDragStart: function () {
          isSpinning = false;
        },
        onDragEnd: function () {
          isSpinning = false;
        },
        zoom: 30,
      });

      var sponge = '#F2CDAC';
      var icing = '#BF4158';
      var jam = '#F25D50';

      let cake = new Zdog.Anchor({
        addTo: illo,
        visible: true,
        rotate: {x: -Zdog.TAU / 8, y: -Zdog.TAU / 18},
      });

      let cakeTop = new Zdog.Shape({
        addTo: cake,
        path: [
          {x: 0, z: -3},
          {x: 2.2, z: -2.2},
          {x: 3, z: 0},
          {x: 2.2, z: 2.2},
          {x: 0, z: 3},
          {x: 0, z: 0},
          {x: -2.2, z: 2.2},
          {x: -3, z: 0},
          {x: -2.2, z: -2.2},
        ],
        stroke: 10 / illo.zoom,
        fill: true,
        color: icing,
        translate: {y: -0.05},
      });

      let cakeBottom = cakeTop.copy({
        translate: {y: 2},
        color: sponge,
        stroke: 4 / illo.zoom,
      });

      var sideGroup = new Zdog.Group({
        addTo: cake,
        rotate: {y: -Zdog.TAU / 18},
      });

      let insideLeft = new Zdog.Shape({
        addTo: cake,
        path: [
          {x: -2.2, y: 0.5, z: 2.2},
          {x: 0, y: 0.5, z: 0},
          {x: 0, y: 2, z: 0},
          {x: -2.2, y: 2, z: 2.2},
        ],
        stroke: 1 / illo.zoom,
        fill: true,
        color: sponge,
        backface: false,
        //color: 'red',
      });

      let insideLeftJam = new Zdog.Shape({
        addTo: cake,
        path: [
          {x: -0.25, y: 0.9, z: 0.5},
          {x: -2.2, y: 0.9, z: 2.35},
        ],
        stroke: 10 / illo.zoom,
        color: jam,
      });

      let insideLeftCream = insideLeftJam.copy({
        addTo: cake,
        color: 'white',
        translate: {y: 0.2},
      });

      let insideRight = new Zdog.Shape({
        addTo: cake,
        path: [
          {x: 0, y: 1, z: 2.95},
          {x: 0, y: 1, z: 0},
          {x: 0, y: 2, z: 0},
          {x: 0, y: 2, z: 2.95},
        ],
        stroke: 1 / illo.zoom,
        fill: true,
        color: sponge,
        backface: false,
        //color: 'red',
      });

      let insideRightJam = new Zdog.Shape({
        addTo: cake,
        path: [
          {x: -0.25, y: 0.9, z: 0.5},
          {x: 0, y: 0.9, z: 2.95},
        ],
        stroke: 10 / illo.zoom,
        color: jam,
      });

      let insideRightCream = insideRightJam.copy({
        addTo: cake,
        color: 'white',
        translate: {y: 0.2},
      });

      let side = new Zdog.Rect({
        addTo: sideGroup,
        width: 2.4,
        height: 2,
        stroke: 1 / illo.zoom,
        translate: {x: 0.15, y: 1, z: 2.85},
        color: sponge,
        fill: true,
      });

      let icingLeft = new Zdog.Ellipse({
        addTo: side,
        diameter: 1.2,
        quarters: 2,
        stroke: 4 / illo.zoom,
        color: icing,
        fill: true,
        rotate: {z: Zdog.TAU / 4},
        translate: {x: 0.6, y: -1.02},
      });

      let icingRight = icingLeft.copy({
        translate: {x: -0.6, y: -1.02},
      });

      let jamFilling = new Zdog.Shape({
        addTo: side,
        path: [
          {x: -1.15, y: -0.1, z: 0.02},
          {x: 1.2, y: -0.1, z: 0},
        ],
        stroke: 10 / illo.zoom,
        fill: true,
        color: jam,
      });

      let cream = jamFilling.copy({
        color: 'white',
        translate: {y: 0.2},
      });

      sideGroup.copyGraph({
        rotate: {y: Zdog.TAU / 2.25},
      });

      sideGroup.copyGraph({
        translate: {x: 0.1, z: -0.3},
        rotate: {y: Zdog.TAU / 3.27},
      });

      sideGroup.copyGraph({
        translate: {x: 0, z: 0},
        rotate: {y: -Zdog.TAU / 3.27},
      });
      sideGroup.copyGraph({
        translate: {x: -0.025, z: -0.05},
        rotate: {y: -Zdog.TAU / 1.24},
      });
      sideGroup.copyGraph({
        translate: {x: 0.3, z: 0.1},
        rotate: {y: Zdog.TAU / 1.8},
      });
      sideGroup.copyGraph({
        translate: {x: -0.1, z: 0.3},
        rotate: {y: Zdog.TAU / 1.24},
      });

      let ticker = 0;
      let cycleCount = 200;
      let isSpinning = true;

      function animate() {
        let progress = ticker / cycleCount;
        let tween = Zdog.easeInOut(progress % 1, 3);

        if (isSpinning) {
          illo.rotate.y = tween * -Zdog.TAU;
        }

        ticker++;

        illo.updateRenderGraph();
        requestAnimationFrame(animate);
      }
      animate();
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight onPress={this.zdog}>
          <Text style={styles.welcome}>
            Click me to render zdog and "mousemove" it
          </Text>
        </TouchableHighlight>
        {Platform.OS === 'web' ? (
          <canvas
            ref={this.initCanvas}
            style={
              {
                width: 200,
                height: 300,
              } /* canvas with react-native-web can't use width and height in styles.gcanvas */
            }
          />
        ) : (
          <GCanvasView
            onCanvasCreate={this.initCanvas}
            onIsReady={(value) => (this.isGReactTextureViewReady = value)}
            style={styles.gcanvas}
          />
        )}
        <TouchableHighlight onPress={this.runTests}>
          <Text style={styles.welcome}>
            Click me runTests react-native-browser-polyfill
          </Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  gcanvas: {
    width: 200,
    height: 300,
    // backgroundColor: '#FF000030', // TextureView doesn't support displaying a background drawable since Android API 24
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    marginVertical: 20,
  },
});
