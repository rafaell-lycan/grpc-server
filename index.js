const path = require('path');
const grpc = require('grpc');
require('dotenv').config();

//load controllers
const todosController = require('./controllers/todos.controller');

// const APPNAME = 'TODO_QHANDLER_V1.0';

const todosProto = grpc.load({
  root: path.join(__dirname, 'Proto'),
  file: 'todos.proto'
})[process.env.GRPC_PACKAGE_NAME];

const server = new grpc.Server();
const allServices = ['TodosService'];
allServices.forEach((service) => {
  server.addService(todosProto[service].service, {
    //define all of your services here
    list: todosController.all,
    insert: todosController.create,
    delete: todosController.delete,
  });
});

//start grpc server
try {
  server.bind(
    `${process.env.HOST}:${process.env.PORT}`,
    grpc.ServerCredentials.createInsecure()
  );
  server.start();
  console.log(`GRPC Server running on port ${process.env.PORT}`);
} catch (error) {
  console.error(error);
  process.exit(1);
}
