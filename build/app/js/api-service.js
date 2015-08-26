'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var fb = new Firebase('https://rogocode.firebaseio.com/');
var fbWords = new Firebase('https://rogocode.firebaseio.com/words');

(function () {
  'use strict';

  var Api = (function () {
    function Api($firebaseObject, $firebaseArray) {
      var _this = this;

      _classCallCheck(this, Api);

      var data = $firebaseObject(fb);
      var dataWords = $firebaseObject(fbWords);
      var dataArray = $firebaseArray(fb);
      var wordsArray = $firebaseArray(fb.child('words'));
      this.log = function (args) {
        typeof args !== 'string' && typeof args !== 'number' ? angular.forEach(args, function (arg) {
          console.log(arg);
        }) : console.log(args);
      };
      this.data = data;
      this.dataWords = dataWords;
      this.dataArray = dataArray;
      this.wordsArray = wordsArray;
      this.methods = {
        add: function add(word) {
          $firebaseArray(fb.child('words')).$loaded().then(function (data) {
            var time = Date.now();
            word.name ? (word.created = time, data.$add(word)) : _this.log('Something Missing?');
          });
          _this.log(word);
        },
        /*
                saveAll: ()=>{
                  var obj = $firebaseObject(fb).$loaded().then((words)=>{
                    words.words = this.data.words;
                    words.$save().then(function(ref) {
                      ref.key() === obj.$id; // true
                      console.log('saved', ref);
                    }, function(error) {
                      console.log("Error:", error);
                    });
                  });
                },
        */
        save: function save(id, object) {
          var id = id;
          var object = object;
          var obj = $firebaseObject(fbWords).$loaded().then(function (words) {
            console.log('save words', words);
            console.debug(id, object);
            words[id] = object;
            words.$save().then(function (ref) {
              ref.key() === obj.$id; // true
              console.log('saved', ref);
            }, function (error) {
              console.log("Error:", error);
            });
          });
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