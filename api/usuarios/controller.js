var Usuario = require('./model');
var sha256 = require('sha256');
var jwt = require('jsonwebtoken');

var chaveJWT = "helpdesk";

var cadastrarUsuario = function(req, res) {

	var usuario = req.body;
	usuario.senha = sha256(usuario.senha);

	new Usuario(usuario).save(function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao cadastrar usuário! '
			});
		
		} else {

			res.status(201).json({
				success: true,
				message: 'Usuário cadastrado com sucesso!',
				data: data
			});

		}

	});

}

var listarUsuarios = function(req, res) {

	var user = req.params.id;
	var query = {};
	if (user) {
		query = {_id: user};
	}	

	Usuario.find(query, function(error, data) {

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao localizar usuário! '
			});
		
		} else if (!data) {

			res.status(404).json({
				success: false,
				message: 'Nenhum usuário localizado!'
			});

		} else {

			res.status(200).json({
				success: true,
				message: 'Usuários localizados!',
				data: data
			});

		}

	});

}

var listarPorPerfil = function(req, res) {

	
	var perfil = req.params.perfil;
	var query = {};
	if (perfil) {
		query = { perfil: perfil};
	}
		

	Usuario.find(query, function(error, data) {

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao localizar usuário! '
			});
		
		} else if (!data) {

			res.status(404).json({
				success: false,
				message: 'Nenhum usuário localizado!'
			});

		} else {

			res.status(200).json({
				success: true,
				message: 'Usuários localizados!',
				data: data
			});

		}

	});

}

var listarUsuarioPorId = function(req, res) {

	var id = req.params.id;

	Usuario.findById(id, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao Localizar! '
			});
		
		} else if (!data) {

			res.status(404).json({
				success: false,
				message: 'Nenhum registro localizado'
			});

		} else {

			res.status(200).json({
				success: true,
				message: 'Registro Localizado',
				data: data
			});

		}

	});

}

var atualizarUsuario = function(req, res) {

	var query = {_id: req.params.id};
	var usuario = req.body;

	Usuario.findOneAndUpdate(query, usuario, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao Atualizar usuário!'
			});
		
		} else {

			res.status(200).json({
				success: true,
				message: 'Usuário atualizado com sucesso!',
				data: data
			});

		}

	});

}

var removerUsuario = function(req, res) {
	
	var query = {_id: req.params.id};

	Usuario.findOneAndRemove(query, function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao remover usuário! '
			});
		
		} else {

			res.status(200).json({
				success: true,
				message: 'Registro removido com sucesso!',
				data: data
			});

		}

	});

}

var cadastre_se = function(req, res) {

	var usuario = req.body;
	usuario.senha = sha256(usuario.senha);

	new Usuario(usuario).save(function(error, data){

		if (error) {

			res.status(400).json({
				success: false,
				message: 'Erro ao cadastrar usuário!'
			});
		
		} else {

			res.status(201).json({
				success: true,
				message: 'Usuário cadastrado com sucesso!',
				data: data
			});

		}

	});

}

var autenticar = function(req, res) {

	var query = {
		login: req.body.login,
		senha: sha256(req.body.senha)
	};

	Usuario.findOne(query, function(error, data){

		if (error) {

			res.status(401).json({
				success: false,
				message: 'Usuário ou Senha inválido! '
			});
		
		} else {

			var payload = {
				nome: data.nome,
				id: data._id
			}

			var token = jwt.sign(payload, chaveJWT);

			res.status(200).json({
				success: true,
				message: 'Autenticação realizada com sucesso!',
				data: data,
				token: token
			});

		}

	});

}

var checkLogado = function(req, res, next) {

	var token = req.headers.authorization;

	if (token) {

		token = token.split("Bearer").pop().trim();

		jwt.verify(token, chaveJWT, function(error, data) {

			if (error) {
			
				res.status(401).json({
					success: false,
					message: 'Token JWT Inválido!'
				});
			
			} else {

				req.decoded = data;
				next();

			}

		})

	} else {

		res.status(401).json({
			success: false,
			message: 'Token JWT não Enviado!'
		});

	}

}

exports.cadastrarUsuario = cadastrarUsuario;
exports.listarUsuarios = listarUsuarios;
exports.listarPorPerfil = listarPorPerfil;
exports.listarUsuarioPorId = listarUsuarioPorId;
exports.atualizarUsuario = atualizarUsuario;
exports.removerUsuario = removerUsuario;
exports.cadastre_se = cadastre_se;
exports.autenticar = autenticar;
exports.checkLogado = checkLogado;