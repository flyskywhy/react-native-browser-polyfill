if (!global.nativePerformanceNow) {
  global.nativePerformanceNow =
    global.nativePerformanceNow ||
    global.performanceNow ||
    require('fbjs/lib/performanceNow');
  global.performanceNow = global.performanceNow || global.nativePerformanceNow;
}

// Below duplicate `react-native/Libraries/Core/setUpPerformance.js`, so comment below

// if (!global.performance) {
//   global.performance = {};
// }

// if (!global.performance.now) {
//   global.performance.now = function () {
//     // TODO: Bacon: Return DOMHighResTimeStamp
//     const performanceNow = global.nativePerformanceNow || Date.now;
//     return performanceNow();
//   };
// }

if (!global.performance.timeOrigin) {
  global.performance.timeOrigin = -1;
}

if (!global.performance.timing) {
  global.performance.timing = {
    connectEnd: -1,
    connectStart: -1,
    domComplete: -1,
    domContentLoadedEventEnd: -1,
    domContentLoadedEventStart: -1,
    domInteractive: -1,
    domLoading: -1,
    domainLookupEnd: -1,
    domainLookupStart: -1,
    fetchStart: -1,
    loadEventEnd: -1,
    loadEventStart: -1,
    navigationStart: -1,
    redirectEnd: -1,
    redirectStart: -1,
    requestStart: -1,
    responseEnd: -1,
    responseStart: -1,
    secureConnectionStart: -1,
    unloadEventEnd: -1,
    unloadEventStart: -1,
  };
}

if (!global.performance.toJSON) {
  global.performance.toJSON = function () {
    return {
      timing: this.timing,
      navigation: this.navigation,
      timeOrigin: this.timeOrigin,
    };
  };
}

if (!global.performance.navigation) {
  global.performance.navigation = {
    redirectCount: -1,
    type: -1,
  };
}

if (!global.performance.memory) {
  global.performance.memory = {
    jsHeapSizeLimit: -1,
    totalJSHeapSize: -1,
    usedJSHeapSize: -1,
  };
}

// if (!global.performance.measure) {
//   global.performance.measure = function () {
//     console.warn('window.performance.measure is not implemented');
//   };
// }

// if (!global.performance.mark) {
//   global.performance.mark = function () {
//     console.warn('window.performance.mark is not implemented');
//   };
// }

// if (!global.performance.clearMeasures) {
//   global.performance.clearMeasures = function () {
//     console.warn('window.performance.clearMeasures is not implemented');
//   };
// }

// this will stuck the APP, so comment this and related above
// if (!global.performance.clearMarks) {
//   global.performance.clearMarks = function () {
//     console.warn('window.performance.clearMarks is not implemented');
//   };
// }

if (!global.performance.clearResourceTimings) {
  global.performance.clearResourceTimings = function () {
    console.warn('window.performance.clearResourceTimings is not implemented');
  };
}

if (!global.performance.setResourceTimingBufferSize) {
  global.performance.setResourceTimingBufferSize = function () {
    console.warn(
      'window.performance.setResourceTimingBufferSize is not implemented',
    );
  };
}

if (!global.performance.getEntriesByType) {
  global.performance.getEntriesByType = function () {
    console.warn('window.performance.getEntriesByType is not implemented');
  };
}

if (!global.performance.getEntriesByName) {
  global.performance.getEntriesByName = function () {
    console.warn('window.performance.getEntriesByName is not implemented');
  };
}

if (!global.performance.getEntries) {
  global.performance.getEntries = function () {
    console.warn('window.performance.getEntries is not implemented');
  };
}

export default window.performance;
