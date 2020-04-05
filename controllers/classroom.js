let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let Classroom = require('../models/Classroom.js');
let Donation = require('../models/Donation.js');

let bcrypt = require('bcryptjs');
let lodash = require('lodash');
let jwtOptions = require('../config/jwt.js');

let twilioOptions = require('../config/twilio.js');

let SDK = require('../lib/sdkconfig.js');

let university = SDK.university;

const webhookCallbackUrl = "http://weLove.Education/classroom/webhook";

const accountSid = twilioOptions.TWILIO_ACCOUNT_SID;
const authToken = twilioOptions.TWILIO_ACCOUNT_AUTH_TOKEN;
const twilioApiKey = twilioOptions.TWILIO_API_KEY;
const twilioApiSecret = twilioOptions.TWILIO_API_SECRET;
const serviceId = twilioOptions.TWILIO_IPM_SERVICE_SID;
const tw = require('twilio')(accountSid, authToken);
const AccessToken = require('twilio').jwt.AccessToken;

let twClient = tw.video;

// get all the classrooms over all the universities
exports.getAllClassrooms = function(req, res) {
    Classroom.find({}, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 101 });
        } else if (data != undefined && data != null) {
            return res.json({ success: true, data: data, status: 102 });
        } else {
            return res.json({ success: false, status: 103 });
        }
    });
}

// get all the classrooms in the university
exports.getAllClassroomsByUniversity = function(req, res) {
    let universityId = req.params.id;
    Classroom.find({ universityId: universityId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 104 });
        } else if (data != undefined && data != null) {
            return res.json({ success: true, data: data, status: 105 });
        } else {
            return res.json({ success: false, status: 106 });
        }
    });
}

// create the classroom
exports.createUniversityClassroom = function(req, res) {
    let universityId = req.params.id;
    let accountId = req.account._id;
    // let uniqueName = req.params.name
    let uniqueName = req.params.roomName
        // let privilege = req.body.privilege;
    let privilege = 100;
    let token = req.body.token;

    let payload = { universityId: universityId, privilege: privilege, token: req.body.token };

    if (privilege >= 99) {
        let newRoom = new Classroom();
        newRoom.recordParticipantsOnConnect = true;
        newRoom.uniqueName = uniqueName;
        newRoom.status = "in-progress";
        newRoom.universityId = universityId;
        newRoom.accountSid = accountId;
        newRoom.statusCallback = webhookCallbackUrl;
        newRoom.minPrivilege = 10;
        newRoom.type = "group"

        twClient.rooms.create({
                uniqueName: newRoom.uniqueName,
                statusCallback: newRoom.statusCallback,
                recordParticipantsOnConnect: newRoom.recordParticipantsOnConnect,
            })
            .then(room => {
                newRoom.roomSID = room.sid;
                newRoom.save(function(err, doc) {
                    if (err)
                        return res.json({ success: false, err: err, status: 402 });
                    else if (doc != undefined && doc != null)
                        return res.json({ success: true, status: 10000, data: { id: doc._id, sid: room.sid } });
                    else
                        return res.json({ success: false, status: 402 });
                });

            })
            .catch(message => res.json({ success: false, status: 401 }));
    } else
        return res.json({ success: false, status: 403, err: "Insufficient privilege" });
}

// get all the classrooms by room creater and university id.
exports.getClassroomsByAdmin = function(req, res) {
    let accountId = req.account._id;
    let universityId = req.params.id;

    Classroom.find({ accountSid: accountId, universityId: universityId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 107 });
        } else if (data != undefined && data != null) {
            if (err)
                return res.json({ success: false, err: err, status: 402 });
            else if (data != undefined && data != null)
                return res.json({
                    success: true,
                    status: 1,
                    data: data
                });
            else
                return res.json({ success: false, status: 402 });
        } else {
            return res.json({ success: false, status: 112 });
        }
    });
}

// get the classroom by room sid
exports.getClassroomByRoomId = function(req, res) {
    let accountId = req.account._id;
    let roomId = req.params.id;

    Classroom.findOne({ accountSid: accountId, roomSID: roomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 107 });
        } else if (data != undefined && data != null) {
            if (err)
                return res.json({ success: false, err: err, status: 402 });
            else if (data != undefined && data != null)
                return res.json({
                    success: true,
                    status: 1,
                    data: data
                });
            else
                return res.json({ success: false, status: 402 });
        } else {
            return res.json({ success: false, status: 112 });
        }
    });
}

// A room creater end the classroom
exports.endClassroom = function(req, res) {
    let accountId = req.account._id;
    let roomId = req.params.id;
    Classroom.findOne({ accountSid: accountId, roomSID: roomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 107 });
        } else if (data != undefined && data != null) {
            if (err)
                return res.json({ success: false, err: err, status: 402 });
            else if (data != undefined && data != null) {
                if (data.status == "completed")
                    return res.json({ success: false, status: 402, err: "Room already completed!" });
                twClient.rooms(data.roomSID)
                    .update({ status: "completed" })
                    .then(room => {
                        Classroom.findOneAndUpdate({ roomSID: roomId }, { $set: { status: "completed" } }, function(err, data) {
                            if (err)
                                return res.json({ success: false, err: err, status: 402 });
                            else if (data != undefined && data != null) {
                                return res.json({ success: true, status: 10000 });
                            } else
                                return res.json({ success: false, status: 402 });
                        });
                    })
                    .catch(message => {
                        console.log(message)
                        res.json({ success: false, status: 401 })
                    });
            } else
                return res.json({ success: false, status: 402 });
        } else {
            return res.json({ success: false, status: 112 });
        }
    });
}

// A participant joins to the room
exports.joinClassroom = function(req, res) {
    let classroomId = req.params.id;
    let accountId = req.account._id;

    Classroom.findOne({ roomSID: classroomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 107 });
        } else if (data != undefined && data != null) {
            classroom = data;
            // let payload = { universityId: classroom.universityId, accountId: accountId };

            // university.updatePrivilegeOnUniversity(payload)
            // .then(function(response0) {
            // if (response0.success) {
            // if (classroom.permissionMin > response0.data.privilege) {
            classroom.members = lodash.union([accountId], classroom.members);

            classroom.save(function(err, doc) {
                if (err)
                    return res.json({ success: false, err: err, status: 108 });
                else if (doc != undefined && doc != null)
                    return res.json({ success: true, status: 10000 });
                else
                    return res.json({ success: false, status: 109 });
            });
            // }
            // } else {
            // return res.json({ success: false, err: err, status: 110 });
            // }
            // })
            // .catch(function(err) { return res.json({ success: false, err: err, status: 111 }) })
        } else {
            return res.json({ success: false, status: 112 });
        }
    });
}

// A participant leaves the classroom
exports.leaveClassroom = function(req, res) {
    let classroomId = req.params.id;
    let accountId = req.account._id;

    Classroom.findOne({ roomSID: classroomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 120 });
        } else if (data != undefined && data != null) {
            let classroom = data;

            classroom.members = lodash.difference(classroom.members, [accountId]);
            classroom.save(function(err, doc) {
                if (err)
                    return res.json({ success: false, err: err, status: 121 });
                else if (doc != undefined && doc != null)
                    return res.json({ success: true, status: 129 });
                else
                    return res.json({ success: false, status: 122 });
            });
        } else {
            return res.json({ success: false, status: 123 });
        }
    });
}

// the call back for the room event
exports.roomCallback = function(req, res) {
    if (req.body.statusCallbackEvent != undefined) {
        if (req.body.statusCallbackEvent == "room-ended") { // room-ended callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "room-created") { // room-created callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "participant-connected") { // participant-connected callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "participant-disconnected") { // participant-disconnected callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "track-added") { // track-added callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "track-removed") { // track-removed callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "track-enabled") { // track-enabled callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "track-disabled") { // track-disabled callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "recording-started") { // recording-started callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "recording-completed") { // recording-completed callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
        if (req.body.statusCallbackEvent == "recording-failed") { // recording-failed callback
            let roomSid = req.body.roomSid;
            Classroom.findOne({ roomSID: roomSid }, function(err, data) {});
        }
    }
    return res.json({ success: true });
}

// generate token for the specified user and room
exports.generateAccessToken = function(req, res) {
    const VideoGrant = AccessToken.VideoGrant;
    const identity = req.account._id;
    const roomName = req.params.roomName;

    // Create Video Grant
    const videoGrant = new VideoGrant({
        room: roomName,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret);
    token.addGrant(videoGrant);
    token.identity = identity;

    // Serialize the token to a JWT string
    let jwt = token.toJwt();
    return res.json({ success: true, token: jwt });
}

// exports.privateMeeting = function(req, res) {
//     Classroom.find({}, function(err, data) {
//     	if(err) {
//     		return res.json({success: false, status: 101});
//     	} else if(data != undefined && data != null) {
//     		return res.json({success: true, data: data, status: 102});
//     	}
//     	return res.json({ success:false, status: 103});
//     });
// }

// exports.donate = function(req, res) {
//     let classroomId = req.params.id;
//     let accountId = req.account._id;

//     let donation = new Donation();
//     donation.classroomId = classroomId;
//     donation.accountId = accountId;

//     donation.save(function(err, doc) {
//         if (err) {
//             return res.json({ success: false, status: 140, err: err });
//         } else if (doc != undefined && doc != null) {
//             return res.json({ success: true, status: 141 });
//         } else {
//             return res.json({ success: false, status: 142 });
//         }
//     });
// }