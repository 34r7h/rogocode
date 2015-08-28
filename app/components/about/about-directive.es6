(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name rogocode.directive:about
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="rogocode">
       <file name="index.html">
        <about></about>
       </file>
     </example>
   *
   */
  angular
    .module('rogocode')
    .directive('about', about);

  function about(Api) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'components/about/about-directive.tpl.html',
      replace: false,
      controllerAs: 'about',
      controller() {
        let vm = this;
        vm.name = 'about';
        vm.about = Api.about;
        vm.login = Api.methods.login;
        vm.logout = Api.methods.logout;
      },
      link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
