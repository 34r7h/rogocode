'use strict';

(function () {
  'use strict';

  angular.module('rogocode').config(config);

  function config($urlRouterProvider, $stateProvider) {
    $stateProvider.state('search', {
      url: '/search',
      template: '<search></search>'
    }).state('about', {
      url: '/about',
      template: '<about></about>'
    }).state('list', {
      url: '/list',
      template: '<list></list>'
    }).state('admin', {
      url: '/admin',
      template: '<admin></admin>'
    });
    $urlRouterProvider.otherwise('/home');
  }
})();
//# sourceMappingURL=app-routes.js.map