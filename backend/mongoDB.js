require('dotenv').config();
const mongoose = require('mongoose');

let db;

async function connectToDb() {
  const url = process.env.DB_URL;

  await mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }).then(
    /** ready to use. The `mongoose.connect()` promise resolves to mongoose instance. */ 
    () => { console.log('MongoDB successfully connected'); },
    (err) => { /** handle initial connection error */
      console.log(`Connection error: ${err}`);
      process.exit(1);
    },
  );
  db = mongoose.connection;
}

function getDb() {
  return db;
}

module.exports = { connectToDb, getDb };
