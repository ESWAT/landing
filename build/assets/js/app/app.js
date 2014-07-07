(function() {
  var app;

  this.app = app = angular.module('42.landing', ['ui', 'ui.router', 'ngAnimate', 'ngSanitize', 'segmentio']);

  app.value('ui.config', {});

  app.value('isMobile', (function() {
    return typeof window.ontouchstart !== 'undefined';
  })());

  app.config(function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    return delete $httpProvider.defaults.headers.common['X-Requested-With'];
  });

  app.config(function($sceProvider) {
    return $sceProvider.enabled(false);
  });

  app.value('config', {
    segmentio: {
      key: 'wqrh71hl3d'
    },
    services: {
      landing: {
        url: 'http://landing.42debut.com'
      }
    }
  });

  app.run(function(config, segmentio) {
    var _ref;
    console.log("Host:", window.location.host);
    if ((_ref = window.location.host) === 'www.42debut.com' || _ref === '42debut.com') {
      console.log("production host; installing segmentio");
      return segmentio.load(config.segmentio.key);
    }
  });

}).call(this);
