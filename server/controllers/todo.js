const Todo = require('../model/todo');

exports.saveTodo = async (req, res) => {
  try {
    const todo = new Todo();
    todo.category = req.body.catergoryId;
    todo.task = req.body.task;
    console.log(todo);
    const response = await todo.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

exports.updateTodowithId = async (req, res) => {
  try {
    const FindTodo = await Todo.findById(req.params.id);
    FindTodo.status = req.body.status;
    const response = await FindTodo.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

exports.editTodo = async (req, res) => {
  try {
    const UpdateTodo = await Todo.findById(req.params.id);

    if (req.body.status) {
      UpdateTodo.status = req.body.status;
    }
    UpdateTodo.task = req.body.task;
    const response = await UpdateTodo.save();
    res.json(response);
  } catch (err) {
    res.json(err);
  }
};

exports.DeleteTodo = async (req, res) => {
  try {
    const deleteTodo = await Todo.deleteOne({ _id: req.params.id });
    res.json(deleteTodo);
  } catch (err) {
    res.json(err);
  }
};
