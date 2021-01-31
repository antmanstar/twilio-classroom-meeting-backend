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
        class_room_id: assignmentId
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

module.exports = {
  createAssignment,
  getAllAssignmentFromClass,
  getAssignmentById,
  deleteAssignmentById
  //   uploadSubmission
};
