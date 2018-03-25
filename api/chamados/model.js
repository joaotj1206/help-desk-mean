var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chamadoSchema = new Schema({
	titulo: {
		type: String,
		required: true
	},
	descricao: {
		type: String,
		required: true
	},
	status: {
		type: String,
		required: true
	},
	solucao: {
		type: String,
		required: false
	},
	usuario: {
		type: Schema.Types.ObjectId,
		ref: 'Usuario',
		required: true
	},
	idUsuarioResponsavel: {
		type: String,
		required: false
	},
	usuarioResponsavel: {
		type: String,
		required: false
	}

});

var Chamado = mongoose.model('chamados', chamadoSchema);

module.exports = Chamado;