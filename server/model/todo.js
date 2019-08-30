const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const todoSchema = new Schema({
  category: {
    type: Schema.Types.ObjectId,
    ref: 'category'
  },
  task: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['active', 'completed', 'inactive'],
    default: 'active',
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Todo = mongoose.model('todos', todoSchema);
