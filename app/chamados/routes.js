app.config(function($routeProvider) {

	$routeProvider.when("/chamados/listar", {

		templateUrl: "chamados/listar.html",
		controller: "ControllerListarChamado"
	});

	$routeProvider.when("/chamados/cadastrar", {
		templateUrl: "chamados/cadastrar.html",
		controller: "ControllerCadastrarChamado"
	});

	$routeProvider.when("/chamados/editar/:id", {
		templateUrl: "chamados/editar.html",
		controller: "ControllerEditarChamado"
	});

	$routeProvider.when("/chamados/atribuir/:id", {
		templateUrl: "chamados/atribuir.html",
		controller: "ControllerEditarChamado"
	});

	$routeProvider.when("/chamados/finalizar/:id", {
		templateUrl: "chamados/finalizar.html",
		controller: "ControllerEditarChamado"
	});

});