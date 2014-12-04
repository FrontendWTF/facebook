angular.module('facebook', [
]).provider('Facebook', function () {
  var lang = 'en_US';
  var config = {
    version: 'v2.2'
  };

  var provider = {
    lang: function (language) {
      if (language) {
        lang = language;

        return provider;
      } else {
        return lang;
      }
    },
    config: function (extraConfig) {
      if (extraConfig) {
        config = angular.extend(config, extraConfig);

        return provider;
      } else {
        return config;
      }
    },
    $get: function (
      $q,
      $window,
      $interval
    ) {
      var deferred = $q.defer();

      window.fbAsyncInit = function () {
        var promise = $interval(function () {
          if ($window.FB) {
            $window.FB.init(config);
            deferred.resolve($window.FB);
            $interval.cancel(promise);
          }
        }, 100);
      }

      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = '//connect.facebook.net/' + provider.lang + '/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }($window.document, 'script', 'facebook-jssdk'));

      return {
        promise: deferred.promise
      };
    }
  };

  return provider;
});
