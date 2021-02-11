const assignment_model = require("../models/assignment");
const submission_model = require("../models/submissions");

/**
 * Api to create assigment
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function createAssignment(req, res) {
  let { class_room_id, assignment_type, title, file, max_grade } = req.body;
  if (!class_room_id) {
    return res.json({
      success: false,
      status: 400,
      msg: "Class room id is required"
    });
  } else if (!assignment_type) {
    return res.json({
      success: false,
      status: 400,
      msg: "Assignment type is required"
    });
  } else if (!title) {
    return res.json({
      success: false,
      status: 400,
      msg: "Title is required"
    });
  }

  let obj = new assignment_model({
    class_room_id,
    assignment_type,
    title,
    file,
    max_grade
  });

  obj
    .save()
    .then(result => {
      return res.json({
        success: true,
        status: 201,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({ success: false, status: 500, msg: "DB error" });
    });
}

/**
 * Api to get all assigment from class id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function getAllAssignmentFromClass(req, res) {
  let { roomId } = req.params;

  assignment_model
    .find({
      class_room_id: roomId,
      status: true
    })
    .then(result => {
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({ success: false, status: 500, msg: "DB error" });
    });
}

/**
 * Api to get assigment from assignment id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function getAssignmentById(req, res) {
  let { assignmentId } = req.params;

  assignment_model
    .findById(assignmentId)
    .then(result => {
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({ success: false, status: 500, msg: "DB error" });
    });
}

/**
 * Api to delete assigment from assignment id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function deleteAssignmentById(req, res) {
  let { assignmentId } = req.params;

  assignment_model
    .findOneAndUpdate(
      {
        _id: assignmentId
      },
      {
        $set: {
          status: false
        }
      },
      {
        new: true
      }
    )
    .then(result => {
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({ success: false, status: 500, msg: "DB error" });
    });
}

/**
 * Api to upload submission for assignment
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function uploadSubmission(req, res) {
  let {
    assignment_id,
    submitted_date = new Date(),
    title,
    user_id,
    file
  } = req.body;
  if (!assignment_id) {
    return res.json({
      success: false,
      status: 400,
      msg: "Assignment id is required"
    });
  } else if (!title) {
    return res.json({
      success: false,
      status: 400,
      msg: "Title is required"
    });
  } else if (!user_id) {
    return res.json({
      success: false,
      status: 400,
      msg: "User id is required"
    });
  } else if (!file) {
    return res.json({
      success: false,
      status: 400,
      msg: "File is required, Please submit your task."
    });
  }

  submission_model
    .findOne({ assignment_id, user_id })
    .then(result => {
      if (result) {
        return res.json({
          success: false,
          status: 404,
          msg: "Already submitted task."
        });
      } else {
        let obj = { assignment_id, submitted_date, title, user_id, file };
        let model = new submission_model(obj);
        model
          .save()
          .then(result => {
            console.log({ result });
            return res.json({
              success: true,
              status: 200,
              result
            });
          })
          .catch(err => {
            console.log({ err });
            return res.json({
              success: false,
              status: 400,
              msg: "Internal server error."
            });
          });
      }
    })
    .catch(err => {
      console.log({ err });
      return res.json({
        success: false,
        status: 400,
        msg: "Internal server error."
      });
    });
}

/**
 * Api to fetch submission from id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function fetchSubmissionfromId(req, res) {
  let { id } = req.params;

  submission_model
    .findById(id)
    .then(result => {
      console.log({ result });
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({
        success: false,
        status: 400,
        msg: "Internal server error."
      });
    });
}

/**
 * Api to fetch all submissions from assignment id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function fetchSubmissionfromAssignmentId(req, res) {
  let { id } = req.params;

  submission_model
    .find({ assignment_id: id, status: true })
    .then(result => {
      console.log({ result });
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({
        success: false,
        status: 400,
        msg: "Internal server error."
      });
    });
}

/**
 * Api to delete  submissions from submission id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function deleteSubmission(req, res) {
  let { id } = req.params;

  submission_model
    .findByIdAndUpdate(id, { $set: { status: false } }, { new: true })
    .then(result => {
      console.log({ result });
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({
        success: false,
        status: 400,
        msg: "Internal server error."
      });
    });
}

/**
 * Api to edit  submissions from submission id
 * @param {Object} req , request object
 * @param {Object} res , response object
 */
function editSubmission(req, res) {
  let { id } = req.params;

  submission_model
    .findByIdAndUpdate(id, { $set: req.body }, { new: true })
    .then(result => {
      console.log({ result });
      return res.json({
        success: true,
        status: 200,
        result
      });
    })
    .catch(err => {
      console.log({ err });
      return res.json({
        success: false,
        status: 400,
        msg: "Internal server error."
      });
    });
}

module.exports = {
  createAssignment,
  getAllAssignmentFromClass,
  getAssignmentById,
  deleteAssignmentById,
  uploadSubmission,
  fetchSubmissionfromId,
  fetchSubmissionfromAssignmentId,
  editSubmission,
  deleteSubmission
};
