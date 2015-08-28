let fb = new Firebase('https://rogocode.firebaseio.com/');
let fbWords = new Firebase('https://rogocode.firebaseio.com/words');
let fbAbout = new Firebase('https://rogocode.firebaseio.com/about');

(function () {
  'use strict';

  class Api {
    constructor($firebaseObject, $firebaseArray, $firebaseAuth, $rootScope) {
      let authObj = $firebaseAuth(fb);
      let authData = authObj.$getAuth();

      if (authData) {
        console.log("Logged in as:", authData.uid);
        $rootScope.auth = authData.uid;
      } else {
        console.log("Logged out");
        $rootScope.auth = null;

      }
      let data = $firebaseObject(fb);
      let dataWords = $firebaseObject(fbWords);
      let dataArray = $firebaseArray(fb);
      let wordsArray = $firebaseArray(fb.child('words'));
      let about = $firebaseObject(fbAbout);
      this.log = (args)=>{
        typeof args !== 'string' && typeof args !== 'number' ?
          angular.forEach(args, (arg)=>{console.log(arg);}) :
          console.log(args);
      };
      this.data = data;
      this.dataWords = dataWords;
      this.dataArray = dataArray;
      this.wordsArray = wordsArray;
      this.about = about;
      this.methods = {
        logout: ()=>{
          var login = $firebaseAuth(fb);
          login.$unauth();
          $rootScope.auth = null;
        },
        login: (user, pass)=>{
          var login = $firebaseAuth(fb);
          login.$authWithPassword({
            email: user,
            password: pass
          }).then(function(authData) {
            $rootScope.auth = authData.uid;
            console.log("Logged in as:", authData.uid);
          }).catch(function(error) {
            console.error("Authentication failed:", error);
          });
        },
        add: (word)=>{
          $firebaseArray(fb.child('words')).$loaded().then((data)=>{
            var time = Date.now();
            word.name ? (word.created = time, data.$add(word)):
            this.log('Something Missing?');
          });
          this.log(word)
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
        save: (id, object)=>{
          var id = id;
          var object = object;
          var obj = $firebaseObject(fbWords).$loaded().then((words)=>{
            console.log('save words', words);
            console.debug(id, object);
            words[id] = object;
            words.$save().then(function(ref) {
              ref.key() === obj.$id; // true
              console.log('saved', ref);
            }, function(error) {
              console.log("Error:", error);
            });
          });
        },
        saveAbout: (blurb)=>{
          var object = object;
          var obj = $firebaseObject(fb).$loaded().then((data)=>{
            console.log('save about', data.about);
            data.about = blurb;
            data.$save().then(function(ref) {
              ref.key() === obj.$id; // true
              console.log('saved about', ref);
            }, function(error) {
              console.log("Error:", error);
            });
          });
        },
        remove: (wordId)=>{
          var ref = fb.child('words/'+wordId);
          var obj = $firebaseObject(ref);
          obj.$remove().then(function(ref) {
            console.log('word removed');
          }, function(error) {
            console.log("Error:", error);
          });
        }
      }
    }

    get() {
      return 'Api';
    }
  }

  /**
   * @ngdoc service
   * @name rogocode.service:Api
   *
   * @description
   *
   */
  angular
    .module('rogocode')
    .service('Api', Api);
}());
