window.angular.module('pmd.services.global', [])
  .factory('Global', [ '$window', function($window) {
    var current_user = $window.user;

    return {
      currentUser: function() {
        return current_user;
      },
      isSignedIn: function() {
        return !!current_user;
      }
    };
  }]);
