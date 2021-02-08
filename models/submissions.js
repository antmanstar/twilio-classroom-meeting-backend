let mongoose = require("mongoose");
let mongoosePaginate = require("mongoose-paginate");
let Schema = mongoose.Schema;

//assignment schema definition
let submissionSchema = new Schema({
  assignment_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "assignment"
  },
  submitted_date: Date,
  tiltle: String,
  user_id: {
    type: mongoose.Schema.Types.ObjectId
  },
  file: String,
  grades: String,
  total_marks: String,
  status: { type: Boolean, default: true }
});

// Sets the createdAt parameter equal to the current time
submissionSchema.pre("save", next => {
  let ts = Math.round(new Date().getTime() / 1000);
  if (!this.createdAt) {
    this.createdAt = ts;
  }
  next();
});

submissionSchema.plugin(mongoosePaginate);

//Exports the ModelSchema for use elsewhere.
module.exports = mongoose.model("submission", submissionSchema);
