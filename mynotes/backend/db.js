// const mongoose = require('mongoose')
// const mongoURI = "mongodb://localhost:27017/?authMechanism=DEFAULT"

// const connectToMongo = ()=>{
//     mongoose.connect(mongoURI, ()=>{
//         console.log("connected to mongo")
//     })
// }

// module.exports = connectToMongo


const mongoose = require('mongoose');
const mongoURI = 'mongodb://0.0.0.0:27017/mynotes';
// const mongoURI = 'mongodb://127.0.0.1:27017/mynotes';

const connectToMongo = async () => {
    try {
      await mongoose.connect(mongoURI 
        );
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error.message);
    }
  };

module.exports = connectToMongo;

