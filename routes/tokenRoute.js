var express = require('express');
var router = require('../lib/privateRouter');

var token_controller = require('../controllers/token.js');
/**

  Get all channels

**/

/**
 * @api {get} /token/device/:deviceId Get Member Twilio Token
 * @apiName getMemberToken
 * @apiGroup Token
 *
 * @apiParam {String} :deviceid Chat device id.
 *
 * @apiExample {curl} Example usage:
 *     curl -i http://localhost/chat/token/device/browser
 *
 *
 * @apiSuccess {Boolean} success Indicates if request was sucessful or not.
 * @apiSuccess {String} token  Member token.
 * @apiSuccess {Number} status Status code.
 *
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "success": true,
 *       "token": "dj3ua934jafnxcv9348",
 *	"status": 03
 *     }
 *
 * @apiError {Boolean} success Indicates if request was sucessful or not.
 * @apiError {Number} status Status code.
 */

router.get('/device/:deviceId', token_controller.getMemberToken);

module.exports = router;
