const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
	text: {
		type: 'string',
		required: true,
	},
	complete: {
		type: 'boolean',
		default: false,
	},
	timestamp: {
		type: 'string',
		default: Date.now(),
	},
});

module.exports = mongoose.model('Todo', todoSchema);
