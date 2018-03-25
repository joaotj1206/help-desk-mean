app.controller("ControllerCadastreSe", function($scope, $http, $location){

	$scope.cadastrarUsuarios = function(usuario) {

		usuario.perfil = "Comum";

		$http.post("http://localhost:3000/cadastre_se", usuario)
			.then(function(res){
				res = res.data;

				if (res.success) {

					alert(res.message);
					$location.path('/login');

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

});

app.controller("ControllerLogin", function($scope, $http, $location){

	$scope.login = function(usuario) {

		$http.post("http://localhost:3000/autenticar", usuario)
			.then(function(res){
				res = res.data;

				if (res.success) {

					localStorage.setItem("user_id", res.data._id);
					localStorage.setItem("user_name", res.data.nome);
					localStorage.setItem("user_perfil", res.data.perfil);
					localStorage.setItem("user_token", res.token);

					$location.path('/home');

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

});

app.controller("ControllerLogout", function($location){

	localStorage.removeItem("user_id");
	localStorage.removeItem("user_name");
	localStorage.removeItem("user_perfil");
	localStorage.removeItem("user_token");
	$location.path('/login');

});
