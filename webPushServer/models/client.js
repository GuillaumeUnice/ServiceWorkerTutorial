let mongoose = require('mongoose');
let Schema = mongoose.Schema;

// create a schema
let clientSchema = new Schema({
  endpoint: String,
  keys: {
      p256dh: String,
      auth: String
  },
  created_at: Date,
  updated_at: Date
});

clientSchema.pre('save', function(next) {
  var currentDate = new Date();
  
  // change the updated_at field to current date
  this.updated_at = currentDate;

  // if created_at doesn't exist, add to that field
  if (!this.created_at)
    this.created_at = currentDate;

  next();
});

// the schema is useless so far
// we need to create a model using it
let Client = mongoose.model('Client', clientSchema);

module.exports = Client;
