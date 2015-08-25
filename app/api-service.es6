let fb = new Firebase('https://rogocode.firebaseio.com/');

(function () {
  'use strict';

  class Api {
    constructor($firebaseObject, $firebaseArray) {
      let data = $firebaseObject(fb);
      this.log = (args)=>{
        angular.forEach(args, (arg)=>{
            console.log(arg)
          }
        );
      };
      this.data = data;
      this.methods = {
        add: (word)=>{
          $firebaseArray(fb.child('words')).$loaded().then((data)=>{
            var time = Date.now();
            word.name ? (word.created = time, data.$add(word)):
            this.log('Something Missing?');
          });
          this.log(word)
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
