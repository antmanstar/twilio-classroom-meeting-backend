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

// id: room sid
router.post('/:id/join', classroom_controller.joinClassroom);

// id: room sid
router.delete('/:id/join', classroom_controller.leaveClassroom);

// id: room sid
router.delete('/end', classroom_controller.endClassroom);

/***  RECORDINGS  ***/
// pid: participants id
router.get('/participant/:pid/rec', classroom_controller.getAllRecordingsByPId);

// id: room sid
router.get('/classroom/:id/participant/:pid/cmp', classroom_controller.createCompositionOfRecording);

// id: composition id
router.get('/composition/:id/', classroom_controller.getComposedMedia);

// name: room's unique name
router.get('/classroom/:roomName/token', classroom_controller.generateAccessToken);

router.delete('/universtiy/:id/all', classroom_controller.delAllClassroomsByUniversity);

module.exports = router;