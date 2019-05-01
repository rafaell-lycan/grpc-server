const grpc = require('grpc')
require('dotenv').config();

const PROTO_PATH = './Proto/todos.proto';
const TodosService = grpc.load(PROTO_PATH)[process.env.GRPC_PACKAGE_NAME].TodosService;

const client = new TodosService(
  `${process.env.HOST}:${process.env.PORT}`,
  grpc.credentials.createInsecure()
);

module.exports = client;
