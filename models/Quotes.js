const mongoose = require('mongoose');
const QuotesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  quote: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Quote = mongoose.model('quote', QuotesSchema);
