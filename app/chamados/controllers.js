app.controller("ControllerListarChamado", function($scope, $http){

	$scope.listarChamados = function() {

		var perfil = localStorage.getItem("user_perfil");
		var url = "";
		if (perfil == "Administrador") {
			url = "http://localhost:3000/chamados";
		} else {
			url = "http://localhost:3000/chamados/" + localStorage.getItem("user_id");
		}

		$http.get(url)
			.then(function(res) {
				res = res.data;

				if (res.success) {

					$scope.chamados = res.data;
					console.log(res.data);

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

	$scope.removerChamado = function(chamado) {

		var confirma = confirm("Remover o chamado " + chamado.titulo + "?");

		if (!confirma) return false;

		$http.delete("http://localhost:3000/chamados/" + chamado._id)
			.then(function(res){
				res = res.data;

				if (res.success) {

					alert(res.message);
					$scope.listarChamados();

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

	$scope.cancelarChamado = function(chamado) {

		var confirma = confirm("Cancelar o chamado " + chamado.titulo + "?");

		if (!confirma) return false;

		chamado.status = "Cancelado";

		$http.put("http://localhost:3000/chamados/" + chamado._id, chamado)
			.then(function(res){
				res = res.data;

				if (res.success) {

					alert(res.message);
					$scope.listarChamados();

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

	$scope.isAdministrador = function() {

		var perfil = localStorage.getItem("user_perfil");
		var admin = false;
		if (perfil == "Administrador") {
			admin = true;
		}
		return admin;

	}

	$scope.permiteEditarCancelar = function(chamado) {

		
		if (localStorage.getItem("user_id") == chamado.usuario && chamado.status == "Aberto") {
			return true;
		} else {
			return false;
		}
	}

	$scope.permiteAtribuir = function(status) {

		if (localStorage.getItem("user_perfil") == "Administrador" && status != "Finalizado") {
			return true;
		} else {
			return false;
		}
	}

	$scope.permiteFinalizar = function(status) {

		if (localStorage.getItem("user_perfil") == "Administrador" && status == "Em Andamento") {
			return true;
		} else {
			return false;
		}
	}

	$scope.permiteApagar = function(status) {

		if (status != "Cancelado" && status != "Finalizado") {
			return true;
		} else {
			return false;
		}
	}	

	$scope.listarChamados();

});

app.controller("ControllerCadastrarChamado", function($scope, $http, $location){

	$scope.cadastrarChamados = function(chamado) {

		chamado.usuario = localStorage.getItem("user_id");
		chamado.status = "Aberto";

		$http.post("http://localhost:3000/chamados", chamado)
			.then(function(res){
				res = res.data;

				if (res.success) {

					alert(res.message);
					$location.path('/chamados/listar');

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

});

app.controller("ControllerEditarChamado", function($scope, $http, $location, $routeParams){

	$scope.obterChamado = function() {

		$http.get("http://localhost:3000/usuarios/listarPorPerfil/" + "Administrador")
            .then(function (res) {
                res = res.data;

                if (res.success) {
                    
                    $scope.usuarios = res.data;                    

                } else {
                    alert(res.message);
                }
            })
            .catch(function (error) {
                console.log(error);
            });

		$http.get("http://localhost:3000/chamados/buscar/" + $routeParams.id)
			.then(function(res){

				res = res.data;				

				if (res.success) {

					$scope.chamado = res.data;

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});


	}

	$scope.atualizarChamado = function(chamado) {

		if (chamado.idUsuarioResponsavel) {

			$scope.usuarios.forEach(usuario => {
            if (usuario._id == chamado.idUsuarioResponsavel) {
                chamado.usuarioResponsavel = usuario.nome;
                return;
            }
        });

		}

		$http.put("http://localhost:3000/chamados/" + $routeParams.id, chamado)
			.then(function(res){
				res = res.data;

				if (res.success) {

					alert(res.message);
					$location.path('/chamados/listar');

				} else {
					alert(res.message);
				}

			})
			.catch(function(error){
				console.log(error.message);
			});

	}

	$scope.isAdministrador = function() {

		var perfil = localStorage.getItem("user_perfil");
		var admin = false;
		if (perfil == "Administrador") {
			admin = true;
		}
		return admin;

	}

	$scope.isNotAdministrador = function() {

		var perfil = localStorage.getItem("user_perfil");
		var admin = true;
		if (perfil == "Administrador") {
			admin = false;
		}
		return admin;

	}

	$scope.obterChamado();

});