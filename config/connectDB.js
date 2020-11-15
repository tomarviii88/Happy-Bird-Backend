const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://tomarviii88:69vDbIxv9ZHYYD9e@mental-health-cluster.4s2yl.mongodb.net/<dbname>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
      }
    );

    console.log('Database connected..');
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
