var express = require('express');
var router = express.Router();

var classroom_controller = require('../controllers/classroom.js');

/**
  Get all classrooms
**/
/**
 * @api {GET} /all Get All Classrooms over all the universities
 * @apiName getAllClassrooms
 * @apiGroup Classroom
 *
 * @apiParam {}
 *
 * @apiSuccess {json} data classroom array.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": [
 *          {
 *             "members": [],
 *             "_id": "xxxxxxxxxxxxxx",
 *             "questions": [],
 *             "donations": [],
 *             "privateMeetings": [],
 *             "recordParticipantsOnConnect": true,
 *             "uniqueName": "test_classroom",
 *             "status": "in-progress",
 *             "universityId": "xxxxxxxxxxxxxx",
 *             "accountSid": "xxxxxxxxxxxxxx",
 *             "statusCallback": "https://educationalcommunity-classroom.herokuapp.com/classroom/classroom/webhook/roomCallback",
 *             "minPrivilege": 0,
 *             "type": "group",
 *             "roomSID": "RMxxxxxxxxxxxxxx",
 *             "__v": 0
 *          }
 *        ],
 *        "status": 200
 *     }
 *
 * @apiError {json} success Indicates if request was sucessful or not.
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400
 *    }
 *    
 */
router.get('/all', classroom_controller.getAllClassrooms);


/**
  Delete all classrooms
**/

/**
 * @api {DELETE} /all Delete All Classrooms over all the universities
 * @apiName delAllClassrooms
 * @apiGroup Classroom
 *
 * @apiParam {}
 *
 * @apiSuccess {json} data classroom list.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
 *             "n": 2,
 *             "ok": 1,
 *             "deltedCount": 2
 *        }
 *        "status": 200
 *     }
 *
 * @apiError {json} success Indicates if request was sucessful or not.
 * @apiErrorExample Failed-Response
 *    {
 *       "success": false,
 *       "status": 400
 *    }
 *    
 */
router.delete('/all', classroom_controller.delAllClassrooms);
// router.get('/participants', classroom_controller.getAllParticipants);

module.exports = router;