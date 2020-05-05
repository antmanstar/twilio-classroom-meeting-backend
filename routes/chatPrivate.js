var express = require('express');
var router = express.Router();

var chat_controller = require('../controllers/chat.js');

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
router.get('/chat_token/deviceId/:deviceId', chat_controller.generateChatAccessToken);
router.post('/channel', chat_controller.createChannel);
router.get('/channel/all', chat_controller.getAllChannels);
router.get('/channel/id/:chid', chat_controller.getChannelByChannelId);
router.get('/channel/name/:name', chat_controller.getChannelByUniqueName);
router.delete('/channel', chat_controller.delChannel);
router.delete('/channel/all', chat_controller.delAllChannels);
router.delete('/channel/name/', chat_controller.delChannelByUniqueName);

module.exports = router;