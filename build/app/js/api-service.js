'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var fb = new Firebase('https://rogocode.firebaseio.com/');

(function () {
  'use strict';

  var Api = (function () {
    function Api($firebaseObject, $firebaseArray) {
      var _this = this;

      _classCallCheck(this, Api);

      var data = $firebaseObject(fb);
      this.log = function (args) {
        angular.forEach(args, function (arg) {
          console.log(arg);
        });
      };
      this.data = data;
      this.methods = {
        add: function add(word) {
          $firebaseArray(fb.child('words')).$loaded().then(function (data) {
            var time = Date.now();
            word.name ? (word.created = time, data.$add(word)) : _this.log('Something Missing?');
          });
          _this.log(word);
        },
        remove: function remove(wordId) {
          var ref = fb.child('words/' + wordId);
          var obj = $firebaseObject(ref);
          obj.$remove().then(function (ref) {
            console.log('word removed');
          }, function (error) {
            console.log("Error:", error);
          });
        }
      };
    }

    /**
     * @ngdoc service
     * @name rogocode.service:Api
     *
     * @description
     *
     */

    _createClass(Api, [{
      key: 'get',
      value: function get() {
        return 'Api';
      }
    }]);

    return Api;
  })();

  angular.module('rogocode').service('Api', Api);
})();
//# sourceMappingURL=api-service.js.map