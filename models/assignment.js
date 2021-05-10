let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
let Schema = mongoose.Schema;

//assignment schema definition
let assignmentSchema = new Schema(
  {
    class_room_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Classroom"
    },
    assignment_type: {
      type: String,
      enum: ["QUIZ", "EXAM", "ASSIGNMENT"]
    },
    title: String,
    file: [String],
    max_grade: String,
    status: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

// Sets the createdAt parameter equal to the current time
assignmentSchema.pre("save", next => {
  let ts = Math.round(new Date().getTime() / 1000);
  if (!this.createdAt) {
    this.createdAt = ts;
  }
  next();
});

assignmentSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model("assignment", assignmentSchema);
