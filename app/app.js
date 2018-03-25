var app = angular.module("app", ["ngRoute"]);

app.factory('AuthInterceptor', function($location, $q){

	return {
	    request: function(config) {

	      config.headers = config.headers || {};

	      var token = localStorage.getItem("user_token");

	      if (token) {
	        config.headers['Authorization'] = 'Bearer ' + token;
	      }

	      return config;
	    },

	    responseError: function(response) {
	      if (response.status === 401 || response.status === 403) {
	        $location.path('/login');
	      }

	      return $q.reject(response);
	    }
	}

}).config(function($httpProvider) {

	$httpProvider.interceptors.push('AuthInterceptor');

});
