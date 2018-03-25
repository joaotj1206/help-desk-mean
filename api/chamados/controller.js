var Chamado = require('./model');

var cadastrarChamado = function(req, res) {

	var chamado = req.body;

	new Chamado( chamado ).save(function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao cadastrar chamado! ' + error.message
			});
			
		} else {
			res.status(201).json({
				success: true,
				message: 'Chamado cadastrado com sucesso!',
				data: data
			});
		}

	});

}

var listarChamados = function(req, res) {
	var id_user = req.params.id;
	var query = {};
	if (id_user) {
		query = {usuario: id_user};
	}
	Chamado.find(query, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao listar chamados!'
			});
			
		} else if (!data) {
			res.status(404).json({
				success: false,
				message: 'Nenhum chamado encontrado!'
			});
		} else {			
			res.status(200).json({
				success: true,
				message: 'Chamados encontrados com sucesso!',
				data: data
			});
		}


	});
}

var buscarChamadoPorId = function(req, res) {

	var id = req.params.id;

	Chamado.findById(id, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao listar por chamado id!'
			});
			
		} else if (!data) {
			res.status(404).json({
				success: false,
				message: 'Chamado não encontrado!'
			});
		} else {			
			res.status(200).json({
				success: true,
				message: 'Chamado encontrado com sucesso!',
				data: data
			});
		}


	});

}

var atualizarChamado = function(req, res) {

	var query = {_id: req.params.id};
	var chamado = req.body;

	Chamado.findOneAndUpdate(query, chamado, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao atualizar chamado! ' + error.message
			});
			
		} else {			
			res.status(200).json({
				success: true,
				message: 'Chamado atualizado com sucesso!',
				data: data
			});
		}


	});

}

var removerChamado = function(req, res) {

	var query = {_id: req.params.id};
	var chamado = req.body;	

	Chamado.findOneAndRemove(query, chamado, function(error, data) {

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao remover chamado! ' + error.message
			});
			
		} else {			
			res.status(200).json({
				success: true,
				message: 'Chamado removido com sucesso!',
				data: data
			});
		}


	});

}



exports.cadastrarChamado = cadastrarChamado;
exports.listarChamados = listarChamados;
exports.buscarChamadoPorId = buscarChamadoPorId;
exports.atualizarChamado = atualizarChamado;
exports.removerChamado = removerChamado;