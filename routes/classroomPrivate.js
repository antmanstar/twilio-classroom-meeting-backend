var router = require('../lib/privateRouter');

var classroom_controller = require('../controllers/classroom.js');
/**
  Get all channels
**/

/**
 * @api {get} /university/:id Get University Channels
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
 *		"title": "General Channel",
 *		"universityId": "d35",
 *		"members": [35, 43]
 *		}],
 *	"status": 03
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 */

// id: universityId, name: rooms' name
router.post('/university', classroom_controller.createUniversityClassroom);

// id: universityId
router.get('/university/:id', classroom_controller.getClassroomsByAdmin);

// id: room sid
router.get('/classroom/:id', classroom_controller.getClassroomByRoomId);

// id: room sid
router.post('/:id/join', classroom_controller.joinClassroom);

// id: room sid
router.delete('/:id/join', classroom_controller.leaveClassroom);

// id: room sid
router.post('/classroom/:id/end', classroom_controller.endClassroom);

// id: universityId
router.get('/university/:id/all', classroom_controller.getAllClassroomsByUniversity);

/***  RECORDINGS  ***/
// pid: participants id
router.get('/participant/:pid/rec', classroom_controller.getAllRecordingsByPId);

// id: room sid
router.get('/classroom/:id/participant/:pid/cmp', classroom_controller.createCompositionOfRecording);

// id: composition id
router.get('/composition/:id/', classroom_controller.getComposedMedia);

// name: room's unique name
router.get('/classroom/:roomName/token', classroom_controller.generateAccessToken);

module.exports = router;