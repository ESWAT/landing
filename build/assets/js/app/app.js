(function() {
  var app;

  this.app = app = angular.module('42.landing', ['ui', 'ui.router', 'ngAnimate', 'ngSanitize']);

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
    services: {
      landing: {
        url: 'http://staging.landing.42debut.com'
      }
    }
  });

}).call(this);
