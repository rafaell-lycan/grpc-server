const client = require('./client');

const id = process.argv[2];

if (!id) {
  console.error('Expected a valid id!');
  process.exit(1);
}

client.delete({
  id
}, (error, _) => {
  if (!error) {
    console.log('Todo Has been successfully deleted', _)
  } else {
    console.error(error)
  }
});
