const express = require('express');
const todoSchema = require('../models/todo');

const router = express.Router();

// create Todo
router.post('/new', (req, res) => {
	const todo = todoSchema(req.body);

	todo.save()
		// retorna
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
});

// get all Todos
router.get('/todos', (req, res) => {
	// objeto Schema
	todoSchema

		.find()
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
});

//Delete Todo
router.delete('/todos/delete/:id', (req, res) => {
	const { id } = req.params;
	todoSchema

		.remove({ _id: id })
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
});

//Line through Todo
router.put('/todos/complete/:id', async (req, res) => {
	const todo = await todoSchema.findById(req.params.id);

	todo.complete = !todo.complete;
	todo
		.save()
		.then((data) => res.json(data))
		.catch((error) => res.json({ message: error }));
});

module.exports = router;
