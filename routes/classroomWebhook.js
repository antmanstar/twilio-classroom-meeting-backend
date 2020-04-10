var express = require('express');
var router = express.Router();

var classroom_controller = require('../controllers/classroom.js');

router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

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

router.post('/classroom/webhook/roomCallback', classroom_controller.roomCallback);
router.post('/classroom/webhook/compositionCallback', classroom_controller.compositionCallback);

module.exports = router;