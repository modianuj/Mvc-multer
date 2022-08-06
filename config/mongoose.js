const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017';

mongoose.connect(`${url}/BookDatabase`);

const db = mongoose.connection;

db.once('error', console.error.bind('error', `database not connected`));

db.on('open', (error) => {
  if (error) {
    console.log(`database not opening`);
  }
  console.log(`database successfully connected`);
});

module.exports = db;
