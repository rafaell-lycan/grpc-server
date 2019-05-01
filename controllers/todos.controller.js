const uuid = require('uuid');
const grpc = require('grpc');
const todos = require('../data/todos')

module.exports = {
  all: (_, cb) => cb(null, todos),
  create: (call, cb) => {
    const todo = call.request;
    todo.id = uuid.v4();
    todos.push(todo);
    cb(null, todo);
  },
  delete: (call, cb) => {
    const index = todos.indexOf((todo) => todo.id == call.request.id);
    if (index != -1) {
      todos.splice(index, 1);
      cb(null, {})
    } else {
      cb({
        code: grpc.status.NOT_FOUND,
        message: 'Not found'
      });
    }
  }
}
