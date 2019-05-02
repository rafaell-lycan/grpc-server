const client = require('./client');

const title = String(process.argv[2]);

if (!title) {
  console.error('Expected a valid title!');
  process.exit(1);
}

client.insert({
  title
}, (error, todo) => {
  if (!error) {
    console.log('New Todo created successfully', todo)
  } else {
    console.error(error)
  }
});
