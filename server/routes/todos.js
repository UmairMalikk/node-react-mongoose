const express = require('express');
const routes = express.Router();
const TodoController = require('../controllers/todo');

routes.post('/saveTodos', TodoController.saveTodo);
routes.post('/updateTodo/:id', TodoController.updateTodowithId);
routes.post('/editTodo/:id', TodoController.editTodo);
routes.delete('/deleteCategory/:id', TodoController.DeleteTodo);

module.exports = routes;
