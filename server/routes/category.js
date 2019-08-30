const express = require('express');
const routes = express.Router();
const CategoryController = require('../controllers/category');
routes.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

routes.post('/saveCategory', CategoryController.saveCategory);

routes.get('/getCategoryTodos/:id', CategoryController.getCategoryTodosWithIds);
routes.post('/editCategory/:id', CategoryController.editCategory);
routes.delete('/deleteCategory/:id', CategoryController.deleteCategoryWithId);

module.exports = routes;
