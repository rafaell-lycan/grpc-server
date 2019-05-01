const client = require('./client');

client.list({}, (error, todos) => {
  if (!error) {
    console.log('successfully fetch List todos')
    console.log(todos)
  } else {
    console.error(error)
  }
});
