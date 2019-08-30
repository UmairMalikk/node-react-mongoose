const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Todo = require('./model/todo');
const Category = require('./model/category');
const app = express();
// const todoController = require('./controllers/todo');
const categoryRoutes = require('./routes/category');
const todoRoutes = require('./routes/todos');
// const todo = new Todo();
mongoose.connect(
  'mongodb://localhost:27018/local',
  { useNewUrlParser: true },
  err => {
    if (err) {
      console.log(err);
    } else {
      console.log('Database is Connected');
    }
  }
);

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send({ hi: 'there' });
});

app.use('/category', categoryRoutes);
app.use('/todo', todoRoutes);
// Category Saving
// app.post('/saveCategory', async (req, res) => {
//   try {
//     const category = new Category();
//     category.title = req.body.title;
//     const saveCategory = await category.save();
//     res.json(saveCategory);
//   } catch (err) {
//     res.json(err);
//   }
// });

// app.post('/saveTodos', todoController.saveTodo);

// Saving Todos
// app.post('/saveTodos', async (req, res) => {
//   //   console.log(req.category.id);
//   try {
//     const todo = new Todo();
//     todo.category = req.body.catergoryId;
//     todo.task = req.body.task;
//     const response = await todo.save();
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// Update Todo status
// app.post('/updateTodo/:id', async (req, res) => {
//   try {
//     const FindTodo = await Todo.findById(req.params.id);
//     FindTodo.status = req.body.status;
//     const response = await FindTodo.save();
//     res.json(response);
//   } catch (err) {
//     res.json(err);
//   }
// });

// Get whole category list
// app.get('/getCategoryTodos/:id', async (req, res) => {
//   try {
//     const todos = await Todo.find({ category: req.params.id }).populate(
//       'categoryId'
//     );
//     res.json(todos);
//   } catch (err) {
//     res.json(err);
//   }
// });

// // Delete Whole Category
// app.delete('/deletecategory/:id', async (req, res) => {
//   try {
//     const deleteCategory = await Category.deleteOne({ _id: req.params.id });
//     const deleteTodos = await Todo.deleteMany({ category: req.params.id });
//     res.json(deleteTodos);
//   } catch (err) {
//     console.log(err);
//   }
// });

// // Delete Single Todo

// app.delete('/deleteTodo/:id', async (req, res) => {
//   try {
//     const deleteTodo = await Todo.deleteOne({ _id: req.params.id });
//     res.json(deleteTodo);
//   } catch (err) {
//     res.json(err);
//   }
// });

// app.post('/saveTodo', (req, res) => {
//   const todo = new Todo();
//   todo.task = req.body.task;

//   // using callback
//   //   todo.save((err, data) => {
//   //     if (err) {
//   //       console.error(err);
//   //     } else {
//   //       res.json(data);
//   //     }
//   //   });

//   // Using promises
//   todo
//     .save()
//     .then(data => {
//       res.json(data);
//     })
//     .catch(err => {
//       console.error(err);
//     });
// });

// app.get('/getTodos', (req, res) => {
//   Todo.find({}, (err, doc) => {
//     if (err) {
//       console.error(err);
//     } else {
//       res.json(doc);
//     }
//   });

//   //   Todo.find({})
//   //     .then(doc => {
//   //       res.json(doc);
//   //     })
//   //     .catch(err => {
//   //       console.error(err);
//   //     });
// });

// Using CallBack
// app.post('/checkTodo/:id', (req, res) => {
//   Todo.findById(req.params.id, (err, todo) => {
//     if (err) {
//       const response = { error: true, message: 'Error fetching data' };
//       res.json(response);
//     } else {
//       todo.status = req.body.status;
//       todo.save((err, doc) => {
//         if (err) {
//           res.json({ status: 400, response: err });
//         } else {
//           const response = { error: false, response: doc };
//           res.json(response);
//         }
//       });
//     }
//   });
// });
// Using Async await
// app.post('/check/:id', async (req, res) => {
//   try {
//     const response = await Todo.findById(req.params.id);
//     response.status = req.body.status;
//     const dataSaved = await response.save();
//     res.json(dataSaved);
//   } catch (error) {
//     res.send(error);
//   }
// });

app.listen('4000', err => {
  if (err) {
    console.log(err);
  } else {
    console.log('server is connected on port 4000');
  }
});
