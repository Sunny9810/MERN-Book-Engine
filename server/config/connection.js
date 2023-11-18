const mongoose = require('mongoose');

// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/googlebooks');

const uri = 'mongodb://localhost:27017/googlebooks';
//Connect to MongoDB
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
// Get the default connection
const connection = mongoose.connection;

connection.on('error', (error) => {
    console.error('Error connecting to MongoDB:', error);
  });
  
  connection.once('open', () => {
    console.log('Connected to MongoDB!');
  });

  module.exports = mongoose.connection;
