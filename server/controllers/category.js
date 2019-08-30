const Category = require('../model/category');
const Todo = require('../model/todo');
exports.saveCategory = async (req, res) => {
  try {
    const category = new Category();
    category.title = req.body.title;
    const saveCategory = await category.save();
    res.json(saveCategory);
  } catch (err) {
    res.json(err);
  }
};
exports.editCategory = async (req, res) => {
  try {
    const CategoryData = await Category.findById({ _id: req.params.id });
    CategoryData.title = req.body.title;
    const response = await CategoryData.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

exports.getCategoryTodosWithIds = async (req, res) => {
  try {
    const todos = await Todo.find({ category: req.params.id }).populate(
      'categoryId'
    );
    res.json(todos);
  } catch (err) {
    res.json(err);
  }
};

exports.deleteCategoryWithId = async (req, res) => {
  try {
    const deleteCategory = await Category.deleteOne({ _id: req.params.id });
    const deleteTodos = await Todo.deleteMany({ category: req.params.id });
    res.json(deleteTodos);
  } catch (err) {
    console.log(err);
  }
};
