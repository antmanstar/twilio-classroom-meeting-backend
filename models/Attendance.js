let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Schema = mongoose.Schema;

//classroom schema definition
let AttendanceSchema = new Schema({
    present: {
        type: Boolean,
        default: false
    },
    classroomId: {
        type: String,
        required: true
    },
    accountId: {
        type: String,
        required: true
    },
    duration: {
        type: Number,
        default: 0
    },
    session: [{
        time: {
            type: Date,
            required: true
        },
        activity: {
            type: String,
            enum: ["JOIN", "LEAVE"]
        },
    }]
});

// Sets the createdAt parameter equal to the current time
AttendanceSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

AttendanceSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model('Attendance', AttendanceSchema);