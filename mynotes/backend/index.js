const connectToMongo = require('./db');
const express = require('express');

const app = express(); 

app.use(express.json()); 

connectToMongo();

const port = 3000;

// Available Routes
app.use('/api/authen', require('./routes/authentication'));
app.use('/api/notes', require('./routes/notes'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
