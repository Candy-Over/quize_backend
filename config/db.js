const mongoose = require('mongoose');

class Database {
  constructor(uri) {
    this.uri = uri;
  }
  async connect() {
    mongoose.set('strictQuery', false);
    mongoose.connect(this.uri)
    .then(()=>console.log('Database connected'))
    .catch((err)=>('MongoDB connection error:', err.message))
  }
}

module.exports = Database;
