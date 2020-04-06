var express = require('express');
var router = require('../lib/privateRouter');
//var router= express.Router();

var classroom_controller = require('../controllers/classroom.js');
/**

  Get all classrooms

**/

/**
 * @api {get} /channel/university/:id Get University Channels
 * @apiName getUniversityChannels
 * @apiGroup Channel
 *
 * @apiParam {Number} :id University id.
 *
 *
 * @apiSuccess {Boolean} success Indicates if request was sucessful or not.
 * @apiSuccess {JSON} data  Channel list.
 * @apiSuccess {Number} status Status code.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "data": [{"channelId": "532",
 *		   "title": "General Channel",
 *		   "universityId": "d35",
 *	  	 "members": [35, 43]
 *		}],
 *	     "status": 03
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 */

router.get('/all', classroom_controller.getAllClassrooms);

// id: universityId, name: rooms' name
router.post('/university/:id/room/:roomName', classroom_controller.createUniversityClassroom);

// id: universityId
router.get('/university/:id', classroom_controller.getClassroomsByAdmin);

// id: room sid
router.get('/classroom/:id', classroom_controller.getClassroomByRoomId);

// id: room sid
router.post('/classroom/:id/end', classroom_controller.endClassroom);

// id: universityId
router.get('/university/:id/all', classroom_controller.getAllClassroomsByUniversity);

// name: room's unique name
router.get('/classroom/:roomName/token', classroom_controller.generateAccessToken);

// id: room sid
router.post('/classroom/:id/rec', classroom_controller.createCompositionRecording);

// id: composition id
router.get('/composition/:id/', classroom_controller.getComposedMedia);


// id: classroom id
router.post('/classroom/:id/stop', classroom_controller.stopRecording);

// id: classroom id
router.post('/classroom/:id/start', classroom_controller.startRecording);

module.exports = router;