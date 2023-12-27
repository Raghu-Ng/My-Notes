const connectToMongo = require('./db');
const express = require('express');
var cors = require('cors');

const app = express(); // Move this line above the middleware and route setup
app.use(cors());
app.use(express.json()); 

connectToMongo();

const port = 5000;

// Available Routes
app.use('/api/authen', require('./routes/authentication'));
app.use('/api/notes', require('./routes/notes'));

app.listen(port, () => {
  console.log(`My Notes App listening on port ${port}`);
});
