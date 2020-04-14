var express = require('express');
var router = express.Router();

var classroom_controller = require('../controllers/classroom.js');

/**

  Get all classrooms

**/

/**
 * @api {get} /all Get All Classrooms over all the universities
 * @apiName getAllClassrooms
 * @apiGroup Classroom
 *
 * @apiParam {}
 *
 * @apiSuccess {json} data classroom list.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": [
 *          {
 *             "members": [],
 *             "_id": "5e9557ddaa669e687805cac4",
 *             "questions": [],
 *             "donations": [],
 *             "privateMeetings": [],
 *             "recordParticipantsOnConnect": true,
 *             "uniqueName": "test_classroom",
 *             "status": "in-progress",
 *             "universityId": "afdfdsfffsfsdf",
 *             "accountSid": "5e8629d50d2d1e00175689df",
 *             "statusCallback": "http://8baf0adf.ngrok.io/classroom/classroom/webhook/roomCallback",
 *             "minPrivilege": 0,
 *             "type": "group",
 *             "roomSID": "RMe230f4fafc38977f9b73e7c6542cd7e2",
 *             "__v": 0
 *          }
 *        ],
 *        "status": 200
 *     }
 *
 * @apiError {json} success Indicates if request was sucessful or not.
 * @apiErrorExample Failed-Response
 *    {
 *       "success": false,
 *       "status": 400
 *    }
 * @apiErrorStatus
 *    
 */


/***  ROOM  ***/
router.get('/all', classroom_controller.getAllClassrooms);

module.exports = router;