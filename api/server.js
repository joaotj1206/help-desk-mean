// IMPORTAÇÃO DE MODULO
var express = require('express')
var mongoose = require('mongoose');
var cors = require('cors');
var bodyParser = require('body-parser');

// CONSECTA BD
//mongoose.connect('mongodb://localhost:27017/helpdesk');
mongoose.connect('mongodb://posunifacs:unifacs@ds223609.mlab.com:23609/help-desk-pos-unifacs');

// CONFIGURA API
var api = express();
api.use(cors());
api.use(bodyParser.json());

// IMPORTA CONTROLLERS
var ControllerUsuario = require('./usuarios/controller');
var ControllerChamado = require('./chamados/controller');

// ROTAS AUTENTICÃO
api.post("/cadastre_se", ControllerUsuario.cadastre_se);
api.post("/autenticar", ControllerUsuario.autenticar);

// VERIFICA AUTENTICAÇÃO
api.use(ControllerUsuario.checkLogado);


// ROTAS USUÁRIOS
api.post("/usuarios", ControllerUsuario.cadastrarUsuario);
api.get("/usuarios/:id?", ControllerUsuario.listarUsuarios);
api.get("/usuarios/listarPorPerfil/:perfil?", ControllerUsuario.listarPorPerfil);
api.get("/usuarios/buscar/:id", ControllerUsuario.listarUsuarioPorId);
api.put("/usuarios/:id", ControllerUsuario.atualizarUsuario);
api.delete("/usuarios/:id", ControllerUsuario.removerUsuario);

// ROTAS CHAMADOS
api.post("/chamados", ControllerChamado.cadastrarChamado);
api.get("/chamados/:id?", ControllerChamado.listarChamados);
api.get("/chamados/buscar/:id", ControllerChamado.buscarChamadoPorId);
api.put("/chamados/:id", ControllerChamado.atualizarChamado);
api.delete("/chamados/:id", ControllerChamado.removerChamado);

// PORTA DO SERVIDOR
api.listen(3000, function(){
	console.log("Servidor rodando na porta 3000!");
});