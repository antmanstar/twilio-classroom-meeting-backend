var router = require('../lib/privateRouter');

var classroom_controller = require('../controllers/classroom.js');

/**
  Get Classrooms
**/

/**
 * @api {GET} /university/:id Get classrooms created by self at the given university
 * @apiName getClassroomsByAdmin
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id University id.
 *
 * @apiSuccess {json} classroom array
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
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "Not Found"
 *    }  
 */
router.get('/university/:id', classroom_controller.getClassroomsByAdmin);


/**
  Get the Classroom
**/

/**
 * @api {GET} /classroom/:id Get the classroom given by classroom id
 * @apiName getClassroomByRoomId
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id classroom sid.
 *
 * @apiSuccess {json} classroom 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
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
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "Not Found"
 *    }  
 */
router.get('/classroom/:id', classroom_controller.getClassroomByRoomId);


/**
  Get Classrooms
**/

/**
 * @api {GET} /university/:id Get all classrooms at the given university by university id
 * @apiName getAllClassroomsByUniversity
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id University id.
 *
 * @apiSuccess {json} Classroom Array
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
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "Not Found"
 *    }  
 */
router.get('/university/:id/all', classroom_controller.getAllClassroomsByUniversity);

/**
  Create Classroom
**/

/**
 * @api {POST} /university Create the university by university id, unique name, privilege
 * @apiName createUniversityClassroom
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id University id.
 * @apiParam {String} :roomName Calssroom Unique Name.
 * @apiParam {Number} :privilege User Account Privilege.
 *
 * @apiSuccess {json} Classroom 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
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
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 403,
 *       "msg": "Insufficient Privilege"
 *    }  
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "Room Exist!"
 *    } 
 */
router.post('/university', classroom_controller.createUniversityClassroom);

/**
  Delete all Classrooms at the university
**/

/**
 * @api {GET} /university/:id/all Delete all classrooms at the given university by university id
 * @apiName delAllClassroomsByUniversity
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id University id.
 *
 * @apiSuccess {json} Classroom Array
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": [
 *          {
 *             "members": [],
 *             "_id": "xxxxxxxxxxxxxxxxxx",
 *             "questions": [],
 *             "donations": [],
 *             "privateMeetings": [],
 *             "recordParticipantsOnConnect": true,
 *             "uniqueName": "test_classroom",
 *             "status": "in-progress",
 *             "universityId": "xxxxxxxxxxxxxxxxxx",
 *             "accountSid": "xxxxxxxxxxxxxxxxxx",
 *             "statusCallback": "https://educationalcommunity-classroom.herokuapp.com/classroom/classroom/webhook/roomCallback",
 *             "minPrivilege": 0,
 *             "type": "group",
 *             "roomSID": "RMxxxxxxxxxxxxxxxxxxx",
 *             "__v": 0
 *          }
 *        ],
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "University ID undefiend."
 *    }  
 */
router.delete('/universtiy/:id/all', classroom_controller.delAllClassroomsByUniversity);

/**
  Add Student
**/

/**
 * @api {POST} /:id/join add student to the classroom
 * @apiName addStudent
 * @apiGroup Classroom
 *
 * @apiParam {String} :cid Classroom id.
 * @apiParam {String} :sid Student id.
 * @apiParam {Number} :id Classroom id.
 *
 * @apiSuccess {json} Classroom 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
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
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 404,
 *       "msg": "Not Found"
 *    }  
 */
router.post('/:cid/students/add', classroom_controller.addStudents);

/**
  Leave Classroom
**/

/**
 * @api {DELETE} /:id/join Leave from the given classroom by roomID
 * @apiName leaveClassroom
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id Classroom id.
 *
 * @apiSuccess {json} Classroom 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
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
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 404,
 *       "msg": "Not Found"
 *    }  
 */
router.post('/:cid/students/remove', classroom_controller.removeStudents);

/**
  End Classroom
**/

/**
 * @api {DELETE} /end Leave from the given classroom by roomID
 * @apiName leaveClassroom
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id Classroom id.
 * @apiParam {Number} :privilege User Account Privilege.
 *
 * @apiSuccess {json} Classroom 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
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
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 403,
 *       "msg": "You are not a Administrator"
 *    }  
 */
router.delete('/end', classroom_controller.endClassroom);


/**
  Get Recording
**/

/**
 * @api {GET} /participant/:pid/rec Get recordings by participant id
 * @apiName getAllRecordingsByPId
 * @apiGroup Classroom
 *
 * @apiParam {Number} :pid Participant id.
 *
 * @apiSuccess {json} Recording 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": [
 *         {
 *                "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxx",
 *                 "status": "completed",
 *                 "dateCreated": "2020-04-07T18:13:08.000Z",
 *                 "sid": "RTxxxxxxxxxxxxxxxxxxxxxx",
 *                 "sourceSid": "MTxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *                 "size": 773778,
 *                "url": "https://video.twilio.com/v1/Recordings/RTxxxxxxxxxxxxxxxxxxxxxx",
 *                 "type": "video",
 *                 "duration": 15,
 *                 "containerFormat": "mkv",
 *                 "codec": "vp8",
 *                 "groupingSids": {
 *                     "room_sid": "RMxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *                     "participant_sid": "PAxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *                 },
 *                 "trackName": "0a5c74a4-3244-413e-a527-e581f733bc34",
 *                 "offset": 143532775792,
 *                 "links": {
 *                     "media": "https://video.twilio.com/v1/Recordings/RTxxxxxxxxxxxxxxxxxxxxxxx/Media"
 *                 }
 *            }
 *        ]
 *        "status": 200
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 404,
 *       "msg": "Not Found"
 *    }  
 */
router.get('/participant/:pid/rec', classroom_controller.getAllRecordingsByPId);

/**
  Create Composition of recorded tracks
**/

/**
 * @api {GET} /classroom/:id/participant/:pid/cmp Get recordings by participant id
 * @apiName createCompositionOfRecording
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id Classroom id.
 * @apiParam {Number} :pid Participant id.
 *
 * @apiSuccess {json} Recording 
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *    {
 *    "success": true,
 *    "data": {
 *        "accountSid": "ACxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *        "status": "enqueued",
 *        "dateCreated": "2020-04-18T13:16:53.000Z",
 *        "dateCompleted": null,
 *        "dateDeleted": null,
 *        "sid": "CJxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *        "roomSid": "RMxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *        "audioSources": [
 *            "*"
 *        ],
 *        "audioSourcesExcluded": [],
 *        "videoLayout": {
 *            "single": {
 *                "z_pos": 0,
 *                "reuse": "show_oldest",
 *                "x_pos": 0,
 *                "max_columns": null,
 *                "cells_excluded": [],
 *                "video_sources_excluded": [],
 *                "height": null,
 *                "width": null,
 *                "max_rows": null,
 *                "y_pos": 0,
 *                "video_sources": [
 *                    "PAxxxxxxxxxxxxxxxxxxxxxxxxxxx"
 *                ]
 *            }
 *        },
 *        "resolution": "640x480",
 *        "trim": true,
 *        "format": "mp4",
 *        "bitrate": 0,
 *        "size": 0,
 *        "duration": 0,
 *        "url": "https://video.twilio.com/v1/Compositions/CJxxxxxxxxxxxxxxxxxxxxxxxxxxx",
 *        "links": {
 *            "media": "https://video.twilio.com/v1/Compositions/CJxxxxxxxxxxxxxxxxxxxxxxxxxxx/Media"
 *        }
 *     },
 *     "status": 200
 * }
 
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 401,
 *       "msg": "Composition Creation Failed"
 *    }  
 */
router.get('/classroom/:id/participant/:pid/cmp', classroom_controller.createCompositionOfRecording);

/**
  Get Composed Media
**/

/**
 * @api {GET} /composition/:id/ Get composed media file with composition id
 * @apiName getComposedMedia
 * @apiGroup Classroom
 *
 * @apiParam {Number} :id Composition id.
 *
 * @apiSuccess {String} Composed Media File Location as a URI 
 * @apiSuccessExample {String} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,        
 *        "status": 200,
 *        "location": "https://video.twilio.com/v1/Compositions/CJxxxxxxxxxxxxxxxxxxxxxxxxxxx/Media"
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 * @apiError {String} error message
 * @apiErrorExample {json} Failed-Response
 *    {
 *       "success": false,
 *       "status": 400,
 *       "msg": "Composition not exist"
 *    }  
 */
router.get('/composition/:id/', classroom_controller.getComposedMedia);

/**
  Get access token for the classroom
**/

/**
 * @api {GET} /classroom/:roomName/token Get the classroom access token
 * @apiName generateAccessToken
 * @apiGroup Classroom
 *
 * @apiParam {String} :roomName Unique clasroom Name
 *
 * @apiSuccess {json} classroom access token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
 *             "token": "exxxxxxx..."
 *        }
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
router.get('/classroom/:roomName/token', classroom_controller.generateAccessToken);

router.get('/participants', classroom_controller.getAllParticipants);
router.put('/subscribe', classroom_controller.subscribeAll);

module.exports = router;