'use strict';

(function () {
  'use strict';

  /**
   * @ngdoc directive
   * @name rogocode.directive:search
   * @restrict EA
   * @element
   *
   * @description
   *
   * @example
     <example module="rogocode">
       <file name="index.html">
        <search></search>
       </file>
     </example>
   *
   */
  angular.module('rogocode').directive('search', search);

  function search(Api) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'components/search/search-directive.tpl.html',
      replace: false,
      controllerAs: 'search',
      controller: function controller() {
        var vm = this;
        vm.name = 'search';
        Api.log(vm);
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=../../components/search/search-directive.js.map