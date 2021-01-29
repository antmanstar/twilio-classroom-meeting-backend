let mongoose = require('mongoose');
let mongoosePaginate = require('mongoose-paginate');
let Float = require('mongoose-float').loadType(mongoose);
let Schema = mongoose.Schema;

let bcrypt = require('bcryptjs');

//classroom schema definition
let AssignmentSchema = new Schema({
    classroomId: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true,
        enum: ["ASSIGNMENT", "EXAM", "QUIZ"],
        default: "ASSIGNMENT"
    },
    dueDate: {
        type: Date,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    file: {
        type: String
    },
    maxGrade: {
        type: Number
    },
    createdAt: {
        type: String
    }
});

// Sets the createdAt parameter equal to the current time
AssignmentSchema.pre('save', next => {
    let ts = Math.round((new Date()).getTime() / 1000);
    if (!this.createdAt) {
        this.createdAt = ts;
    }
    next();
});

AssignmentSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model('Assignment', AssignmentSchema);