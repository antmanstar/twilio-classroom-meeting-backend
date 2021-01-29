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
    minPrivilege: { // minimum privilege of participant who can join to the classroom
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
    url: {
        type: String
    },
    teacher: {
        type: String,
    },
    markAttendance: {
        type: Boolean
    },
    schedule: [{
        days: {
            type: String
        },
        startTime: {
            type: Date
        },
        endTime: {
            type: Date
        }
    }],
    assignments: [{
        assignmentId: { type: String }
    }],
    members: [{
        accountId: {
            type: String
        },
        attendence: [{
            date: { type: Date },
            present: { type: Boolean },
            timeIn: { type: Date },
            timeOut: { type: Date },
            timeDuration: { type: Number }
        }],
        submission: [{
            assignmentId: { type: String },
            date: { type: Date },
            submittedDate: { type: Date },
            title: { type: String },
            file: { type: String },
            grade: { type: Number },
            totalMark: { type: Number }
        }],
        finalGrade: {
            type: Number,
            default: 0
        },
    }]
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