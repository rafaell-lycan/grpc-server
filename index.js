const APPNAME = 'GRPC_SERVER_V1.0';
require('dotenv').config();
const path = require('path');
const grpc = require('grpc');
const debug = require('debug')(APPNAME);

class Server {
  constructor(config) {
    const {
      pkg,
      proto,
      service,
    } = config;
    this.server = new grpc.Server();
    this.proto = grpc.load({
      root: path.join(__dirname, 'Proto'),
      file: proto
    })[pkg];

    this.setup(service);
  }

  setup(serviceName) {
    debug('Setup...');
    //load controllers
    const todosController = require('./controllers/todos.controller')(debug);

    debug(`Configuring service ${serviceName}`);
    const allServices = [serviceName];
    allServices.forEach((service) => {
      this.server.addService(this.proto[service].service, {
        //define all of your services here
        list: todosController.all,
        insert: todosController.create,
        delete: todosController.delete,
      });
    });
  }

  start() {
    debug('Starting GRPC Server');
    //start grpc server
    try {
      this.server.bind(
        `${process.env.HOST}:${process.env.PORT}`,
        grpc.ServerCredentials.createInsecure()
      );
      this.server.start();
      debug(`GRPC Server running on port ${process.env.PORT}`);
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  }
}

const server = new Server({
  pkg: process.env.GRPC_PACKAGE_NAME,
  proto: 'todos.proto',
  service: 'TodosService'
});
server.start()
