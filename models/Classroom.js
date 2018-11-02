let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Float = require('mongoose-float').loadType(mongoose);
let Schema = mongoose.Schema;

let bcrypt = require('bcryptjs');

//classroom schema definition
let ClassroomSchema = new Schema(
  {
    recordParticipantsOnConnect: {
      type: Boolean,
      required: true
    },
    statusCallback: {
      type: String
    },
    type: {
      type: String
    },
    uniqueName: {
      type: String,
      required: true
    },
    questions: [{
      title: { type: String }
    }],
    status: {
      type: Number
    },
    minPrivilege: {
      type: Number,
      required: true
    },
    donations: [ {
      memberId: { type: String, required: true },
      amount: {type: Number, required: true},
      date: {type: Date, required: true}
    }],
    privateMeetingRate: {
      type: Number
    },
    privateMeetings: [{
      accountId: { type: String, required: true },
      roomSID: { type: String, required: true },
      startTime: { type: Date },
      endTime: { type: Date }
    }],
    universityId: {
      type: String
    },
    ownerId: {
      type: String,
      required: true
    },
    roomSID: {
      type: String,
      required: true
    }
});

// Sets the createdAt parameter equal to the current time
ClassroomSchema.pre('save', next => {
  let ts = Math.round((new Date()).getTime() / 1000);
  if(!this.createdAt) {
    this.createdAt = ts;
  }
  next();
});

ClassroomSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model('Classroom', ClassroomSchema);
