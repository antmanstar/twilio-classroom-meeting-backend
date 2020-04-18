var express = require('express');
var router = express.Router();

var classroom_controller = require('../controllers/chat.js');

/**
  Get access token for the chat
**/

/**
 * @api {GET} /chat_token/deviceId/:deviceId get the chat access token
 * @apiName getAllClassrooms
 * @apiGroup Classroom
 *
 * @apiParam {Number} :deviceId user based device id.
 *
 * @apiSuccess {json} chat access token.
 * @apiSuccessExample {json} Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *        "success": true,
 *        "data": {
 *             "chat_token": "exxxxxxx..."
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
router.get('/chat_token/deviceId/:deviceId', classroom_controller.generateChatAccessToken);

module.exports = router;