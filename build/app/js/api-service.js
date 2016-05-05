'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var fb = new Firebase(window.location.host !== 'rogocode.herokuapp.com' ? 'https://rogocode.firebaseio.com/' : 'https://rogocode.firebaseio.com/test'),
    fbWords = new Firebase(window.location.host !== 'rogocode.herokuapp.com' ? 'https://rogocode.firebaseio.com/words' : 'https://rogocode.firebaseio.com/test/words'),
    fbAbout = new Firebase(window.location.host !== 'rogocode.herokuapp.com' ? 'https://rogocode.firebaseio.com/about' : 'https://rogocode.firebaseio.com/test/about'),
    fbHome = new Firebase(window.location.host !== 'rogocode.herokuapp.com' ? 'https://rogocode.firebaseio.com/home' : 'https://rogocode.firebaseio.com/test/home');
console.log(window.location.host);
(function () {
  'use strict';

  var Api = (function () {
    function Api($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope, deviceDetector, $state, $timeout, $anchorScroll) {
      var _this = this;

      _classCallCheck(this, Api);

      var authObj = $firebaseAuth(fb),
          authData = authObj.$getAuth();

      if (authData) {
        console.log("Logged in as:", authData.uid);
        $rootScope.auth = authData.uid;
      } else {
        console.log("Logged out");
        $rootScope.auth = null;
      }
      var data = $firebaseObject(fb),
          dataWords = $firebaseObject(fbWords),
          dataArray = $firebaseArray(fb),
          wordsArray = $firebaseArray(fb.child('words')),
          about = $firebaseObject(fbAbout),
          home = $firebaseObject(fbHome);
      this.log = function (args) {
        typeof args !== 'string' && typeof args !== 'number' ? angular.forEach(args, function (arg) {
          console.log(arg);
        }) : console.log(args);
      };
      $rootScope.show = {};
      $rootScope.device = deviceDetector;
      $rootScope.device.os === 'ios' && $rootScope.device.browser !== 'unknown' ? $rootScope.show.appStoreLink = true : null;
      $rootScope.device.os !== 'ios' || $rootScope.device.browser !== 'unknown' ? $state.go('about') : null;
      setTimeout(function () {
        console.log($rootScope.device);
      }, 15000);
      this.data = data;
      this.dataWords = dataWords;
      this.dataArray = dataArray;
      this.wordsArray = wordsArray;
      this.about = about;
      this.home = home;
      this.methods = {
        logout: function logout() {
          var login = $firebaseAuth(fb);
          login.$unauth();
          $rootScope.auth = null;
          $state.go('about');
          $anchorScroll();
        },
        login: function login(user, pass) {
          var login = $firebaseAuth(fb);
          login.$authWithPassword({
            email: user,
            password: pass
          }).then(function (authData) {
            $rootScope.auth = authData.uid;
            console.log("Logged in as:", authData.uid);
            $state.go('admin');
            $anchorScroll();
          })['catch'](function (error) {
            console.error("Authentication failed:", error);
          });
        },
        add: function add(word) {
          $firebaseArray(fb.child('words')).$loaded().then(function (data) {
            var time = Date.now();
            word.name ? (word.created = time, data.$add(word)) : _this.log('Something Missing?');
          });
          _this.log(word);
        },
        syncToApp: function syncToApp() {
          var rogoRef = new Firebase('https://rogo.firebaseio.com');
          var rogoAuth = $firebaseAuth(rogoRef);
          rogoAuth.$authWithPassword({ email: prompt('Provide email for iOS sync'), password: prompt('Your Password to confirm iOS sync') }).then(function (authData) {
            console.log('iOS Sync Access Granted');
            var rogoFb = $firebaseObject(rogoRef).$loaded().then(function (rogoData) {
              rogoData.about = data.about;
              rogoData.words = data.words;
              rogoData.home = data.home;
              rogoData.test = data.test;
              rogoData.$save().then(function () {
                console.log('iOS Data Sync\'d');
                $rootScope.syncd = true;
                $timeout(function () {
                  $rootScope.syncd = false;
                }, 5000);
              });
            });
          });
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
            console.log('published', object.published);
            console.debug(id, object);
            words[id] = object;
            words[id].published = object.published;
            words.$save();
          });
        },
        saveAbout: function saveAbout(blurb) {
          var object = object;
          var obj = $firebaseObject(fb).$loaded().then(function (data) {
            console.log('save about', data.about);
            data.about = blurb;
            data.$save().then(function (ref) {
              console.log('saved about', ref);
            }, function (error) {
              console.log("Error:", error);
            });
          });
        },
        saveHome: function saveHome(blurb) {
          var object = object;
          var obj = $firebaseObject(fb).$loaded().then(function (data) {
            console.log('save home', data.home);
            data.home = blurb;
            data.$save().then(function (ref) {
              ref.key() === obj.$id; // true
              console.log('saved home', ref);
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
