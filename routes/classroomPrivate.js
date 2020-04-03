var express = require('express');
var router = require('../lib/privateRouter');

var classroom_controller = require('../controllers/classroom.js');
/**

  Get all channels

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

// id: room sid
router.post('/:id/join', classroom_controller.joinClassroom);

// id: room sid
router.delete('/:id/join', classroom_controller.leaveClassroom);

// router.post('/:id/private', classroom_controller.privateMeeting);

// router.post('/:id/donate', classroom_controller.donate);

module.exports = router;