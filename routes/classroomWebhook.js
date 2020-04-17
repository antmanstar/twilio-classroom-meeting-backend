var express = require('express');
var router = express.Router();

var classroom_controller = require('../controllers/classroom.js');

// dealing with cors permission
router.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

/**
  CALL BACK WEB HOOK
**/

/**
 * @api {post} /classroom/webhook/roomCallback Callback regarding to room events
 * @apiName roomCallback
 * @apiGroup Classroom
 *
 * @apiParam {} 
 *
 * @apiSuccess {Callback} 
 *
 */

router.post('/webhook/roomCallback', classroom_controller.roomCallback);

/**
 * @api {post} /classroom/webhook/compositionCallback Callback regarding to recording composition events
 * @apiName roomCallback
 * @apiGroup Classroom
 *
 * @apiParam {} 
 *
 * @apiSuccess {Callback} 
 *
 */
router.post('/webhook/compositionCallback', classroom_controller.compositionCallback);

module.exports = router;