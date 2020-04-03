let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Float = require('mongoose-float').loadType(mongoose);
let Schema = mongoose.Schema;

let bcrypt = require('bcryptjs');

//classroom schema definition
let ClassroomSchema = new Schema({
    recordParticipantsOnConnect: {
        type: Boolean,
        required: true
    },
    statusCallback: {
        type: String
    },
    type: {
        type: String,
        required: true
    },
    uniqueName: {
        type: String,
        required: true
    },
    questions: [{
        title: { type: String }
    }],
    status: { // The status of the room. Can be: in-progress, failed, or completed
        type: String
    },
    minPrivilege: { // minimum privilege 
        type: Number,
        required: true
    },
    donations: [{ // donation resources
        memberId: { type: String, required: true },
        amount: { type: Number, required: true },
        date: { type: Date, required: true }
    }],
    privateMeetingRate: { // private meeting rate
        type: Number
    },
    privateMeetings: [{ // The private meetings resources
        accountId: { type: String, required: true },
        roomSID: { type: String, required: true },
        startTime: { type: Date },
        endTime: { type: Date }
    }],
    universityId: { // university ID
        type: String,
        required: true
    },
    accountSid: { // The SID of the Account that created the Room resource.
        type: String,
        required: true
    },
    roomSID: { // The unique string that we created to identify the Room resource.
        type: String,
        required: true
    },
    maxParticipants: {
        type: Number
    },
    // videoCodecs: {
    //   type: 
    // }
    url: {
        type: String
    },

});

// Sets the createdAt parameter equal to the current time
ClassroomSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

ClassroomSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model('Classroom', ClassroomSchema);