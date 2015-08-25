(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name rogocode.directive:admin
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="rogocode">
       <file name="index.html">
        <admin></admin>
       </file>
     </example>
   *
   */
  angular
    .module('rogocode')
    .directive('admin', admin);

  function admin(Api) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'components/admin/admin-directive.tpl.html',
      replace: false,
      controllerAs: 'admin',
      controller() {
        console.log('Api', Api);
        console.log('Api.data', Api.data);
        let vm = this;
        vm.name = 'admin';
        vm.add = Api.methods.add;
        vm.remove = Api.methods.remove;
        vm.words = Api.data;

      },
      link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
}());
