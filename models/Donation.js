let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Float = require('mongoose-float').loadType(mongoose);
let Schema = mongoose.Schema;

let bcrypt = require('bcryptjs');

//donation schema definition
let DonationSchema = new Schema({
    accountId: {
      type: String,
    },
    classroomId: {
      type: String,
    }
});

// Sets the createdAt parameter equal to the current time
DonationSchema.pre('save', next => {
  let ts = Math.round((new Date()).getTime() / 1000);
  if(!this.createdAt) {
    this.createdAt = ts;
  }
  next();
});

DonationSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model('Donation', DonationSchema);
