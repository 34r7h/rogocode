'use strict';

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
  angular.module('rogocode').directive('admin', admin);

  function admin(Api, $rootScope) {
    return {
      restrict: 'EA',
      scope: {},
      templateUrl: 'components/admin/admin-directive.tpl.html',
      replace: false,
      controllerAs: 'admin',
      controller: function controller() {
        var vm = this;
        vm.name = 'admin';
        vm.add = Api.methods.add;
        vm.remove = Api.methods.remove;
        vm.words = Api.data;
        vm.wordsArray = Api.wordsArray;
        vm.save = Api.methods.save;
        vm.saveAbout = Api.methods.saveAbout;
        vm.saveHome = Api.methods.saveAbout;
        vm.about = Api.about;
        vm.home = Api.home;
        vm.alphabet = [];
        var reg = 'abcdefghijklmnopqrstuvwxyz';
        angular.forEach(reg, function (letter) {
          vm.alphabet.push(letter);
        });
        /*
                $rootScope.action = {
                  name: 'Save All Changes',
                  action: Api.methods.saveAll
                }
        */
      },
      link: function link(scope, element, attrs) {
        /* jshint unused:false */
        /* eslint "no-unused-vars": [2, {"args": "none"}] */
      }
    };
  }
})();
//# sourceMappingURL=admin-directive.js.map
