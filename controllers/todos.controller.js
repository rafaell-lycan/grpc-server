const uuid = require('uuid');
const grpc = require('grpc');
const todos = require('../data/todos')

module.exports = (debug) => {
  return {
    all: (_, cb) => {
      debug('Getting all Todos');
      cb(null, todos)
    },
    create: (call, cb) => {
      debug('Creating a new Todo with %o', call.request);
      const todo = call.request;
      todo.id = uuid.v4();
      todos.push(todo);
      cb(null, todo);
    },
    delete: (call, cb) => {
      debug('Deleting Todo with id %s', call.request.id);
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
}
