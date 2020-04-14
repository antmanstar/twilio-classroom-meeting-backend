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
let emails = SDK.emails;

const webhookRoomCallbackUrl = "http://8baf0adf.ngrok.io/classroom/classroom/webhook/roomCallback";
const webhookCompositionCallbackUrl = "http://8baf0adf.ngrok.io/classroom/classroom/webhook/compositionCallback"

const accountSid = twilioOptions.TWILIO_ACCOUNT_SID;
const authToken = twilioOptions.TWILIO_ACCOUNT_AUTH_TOKEN;
const twilioApiKey = twilioOptions.TWILIO_API_KEY;
const twilioApiSecret = twilioOptions.TWILIO_API_SECRET;
const serviceId = twilioOptions.TWILIO_IPM_SERVICE_SID;
const tw = require('twilio')(accountSid, authToken);
const AccessToken = require('twilio').jwt.AccessToken;

let twClient = tw.video;

// exports.createHiddenUniversity = function(req, res) {
//     let payload = {
//         name: req.body.name,
//         url: req.body.url,
//         token: req.body.token,
//         ownerId: req.body.ownerId,
//         language: req.body.language
//     };

//     university.createHiddenUniversity(payload).then(function(response) {
//             console.log(response)
//             return res.json({ success: true, data: response, status: 200 });
//         })
//         .catch(function(err) {
//             console.log(err)
//             return res.json({ success: false, err: err, status: 404 });
//         });
// }

// get all the classrooms over all the universities
exports.getAllClassrooms = function(req, res) {
    Classroom.find({}, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 500 });
        } else if (data != undefined && data != null) {
            return res.json({ success: true, data: data, status: 200 });
        } else {
            return res.json({ success: false, status: 404 });
        }
    });
}


exports.delAllClassrooms = function(req, res) {
    Classroom.remove({}, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 500 });
        } else if (data != undefined && data != null) {
            return res.json({ success: true, data: data, status: 200 });
        } else {
            return res.json({ success: false, status: 404 });
        }
    });
}

// get all the classrooms in the university
exports.getAllClassroomsByUniversity = function(req, res) {
    let universityId = req.params.id;
    if (universityId != undefined && universityId != null) {
        Classroom.find({ universityId: universityId }, function(err, data) {
            if (err) {
                return res.json({ success: false, status: 500 });
            } else if (data != undefined && data != null) {
                return res.json({ success: true, data: data, status: 200 });
            } else {
                return res.json({ success: false, status: 404 });
            }
        });
    } else {
        return res.json({ success: false, status: 400 })
    }
}

// create the classroom
exports.createUniversityClassroom = function(req, res) {
    let accountId = req.account._id;
    let universityId = req.body.id;
    let uniqueName = req.body.roomName
    let privilege = req.body.privilege;

    if (privilege >= 99) {
        let newRoom = new Classroom();
        newRoom.recordParticipantsOnConnect = true;
        newRoom.uniqueName = uniqueName;
        newRoom.status = "in-progress";
        newRoom.universityId = universityId;
        newRoom.accountSid = accountId;
        newRoom.statusCallback = webhookRoomCallbackUrl;
        newRoom.minPrivilege = 0;
        newRoom.type = "group";
        newRoom.members = [];

        twClient.rooms.create({
                uniqueName: newRoom.uniqueName,
                statusCallback: newRoom.statusCallback,
                recordParticipantsOnConnect: newRoom.recordParticipantsOnConnect,
            })
            .then(room => {
                newRoom.roomSID = room.sid;
                newRoom.save(function(err, doc) {
                    if (err)
                        return res.json({ success: false, status: 500, msg: err });
                    else if (doc != undefined && doc != null)
                        return res.json({ success: true, status: 201, data: { id: doc._id, sid: room.sid } });
                    else
                        return res.json({ success: false, status: 404 });
                });

            })
            .catch(message => {
                console.log(message)
                res.json({ success: false, status: 400, msg: message.Error })
            });
    } else
        return res.json({ success: false, status: 403, msg: "Insufficient Privilege" });
}

// get all the classrooms by room creater and university id.
exports.getClassroomsByAdmin = function(req, res) {
    let accountId = req.account._id;
    let universityId = req.params.id;

    Classroom.find({ accountSid: accountId, universityId: universityId }, function(err, data) {
        if (err)
            return res.json({ success: false, status: 500, err: err });
        else if (data != undefined && data != null)
            return res.json({ success: true, status: 200, data: data });
        else
            return res.json({ success: false, status: 404 });
    });
}

// get the classroom by room sid
exports.getClassroomByRoomId = function(req, res) {
    let roomId = req.params.id;

    Classroom.findOne({ roomSID: roomId }, function(err, data) {
        if (err)
            return res.json({ success: false, status: 500, err: err });
        else if (data != undefined && data != null)
            return res.json({ success: true, status: 200, data: data });
        else
            return res.json({ success: false, status: 404 });
    });
}

// A room creater end the classroom
exports.endClassroom = function(req, res) {
    let roomId = req.body.id;
    let privilege = req.body.privilege;

    if (privilege >= 99) {
        Classroom.findOne({ roomSID: roomId }, function(err, data) {
            if (err)
                return res.json({ success: false, status: 500, err: err });
            else if (data != undefined && data != null) {
                if (data.status == "completed")
                    return res.json({ success: false, status: 403, msg: "Room already completed!" });
                twClient.rooms(roomId)
                    .update({ status: "completed" })
                    .then(room => {
                        console.log(room)
                        Classroom.findOneAndRemove({ roomSID: roomId }, function(err, data) {
                            if (err)
                                return res.json({ success: false, status: 500, err: err });
                            else if (data != undefined && data != null) {
                                return res.json({ success: true, status: 200, msg: "Successfully deleted" });
                            } else
                                return res.json({ success: false, status: 404 });
                        });
                    })
                    .catch(message => {
                        console.log(message)
                        res.json({ success: false, status: 400, err: message })
                    });
            } else
                return res.json({ success: false, status: 404 });
        });
    } else {
        return res.json({ success: false, status: 403, msg: "You are not a Administrator" });
    }
}

// A participant joins to the room
exports.joinClassroom = function(req, res) {
    let classroomId = req.params.id;
    let accountId = req.account._id;

    Classroom.findOne({ roomSID: classroomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 500, err: err });
        } else if (data != undefined && data != null) {
            if (data.status == "completed")
                return res.json({ success: false, status: 403, err: "Room is completed!" });
            let classroom = data;
            classroom.members = lodash.union([accountId], classroom.members);
            classroom.save(function(err, doc) {
                if (err)
                    return res.json({ success: false, status: 500, err: err });
                else if (doc != undefined && doc != null)
                    return res.json({ success: true, status: 200, data: data });
                else
                    return res.json({ success: false, status: 404 });
            });
        } else {
            return res.json({ success: false, status: 404 });
        }
    });
}

// A participant leaves the classroom
exports.leaveClassroom = function(req, res) {
    let classroomId = req.params.id;
    let accountId = req.account._id;

    Classroom.findOne({ roomSID: classroomId }, function(err, data) {
        if (err) {
            return res.json({ success: false, status: 500, err: err });
        } else if (data != undefined && data != null) {
            let classroom = data;

            classroom.members = lodash.difference(classroom.members, [accountId]);
            classroom.save(function(err, doc) {
                if (err)
                    return res.json({ success: false, status: 500, err: err });
                else if (doc != undefined && doc != null)
                    return res.json({ success: true, status: 200, data: data });
                else
                    return res.json({ success: false, status: 404 });
            });
        } else {
            return res.json({ success: false, status: 404 });
        }
    });
}

// // stop recording
// exports.stopRecording = function(req, res) {
//     let recId = req.params.id;
//     twClient.recordings(recId)
//         .update({ status: 'completed' })
//         .then(recording => {
//             res.json({ success: true, status: 200 });
//         })
//         .catch(err => {
//             res.json({ success: false, status: 403, err: err });
//         })
// }

// // start recording
// exports.startRecording = function(req, res) {
//     let recId = req.params.id;
//     twClient.recordings(recId)
//         .update({ status: 'processing' })
//         .then(recording => {
//             res.json({ success: true, status: 200 });
//         })
//         .catch(err => {
//             res.json({ success: false, status: 403, err: err });
//         })
// }

// // get all participants by roomid
// exports.getAllParticipantByRoomId = function(req, res) {
//     let roomId = req.params.id;
//     twClient.rooms(roomId)
//         .participants.get('antman')
//         .fetch()
//         .then(participant => {
//             console.log(participant);
//             res.json({ success: true, status: 200 });
//         }).catch(message => {
//             return { message: message }
//         })
// }

// get recording by participants Id
exports.getAllRecordingsByPId = function(req, res) {
    pId = req.params.pid;
    twClient.recordings.list({ groupingSid: [pId], limit: 20 })
        .then(recordings => {
            console.log(recordings);
            return res.json({ success: true, status: 200, data: recordings });
        })
        .catch(err => {
            console.log(err)
            return res.json({ success: false, status: 400, err: message })
        })
}

// get the composition complete recording in a grid
exports.createCompositionOfRecording = function(req, res) {
    const Twilio = require('twilio');
    const client = new Twilio(twilioApiKey, twilioApiSecret, { accountSid: accountSid });
    let classroomId = req.params.id;
    let participantId = req.params.pid;

    client.video.compositions.
    create({
            roomSid: classroomId,
            audioSources: '*',
            videoLayout: {
                single: {
                    video_sources: [participantId]
                }
            },
            statusCallback: webhookCompositionCallbackUrl,
            format: 'mp4'
        })
        .then(composition => {
            console.log('Created Composition with SID=' + composition.sid);
            return res.json({ success: true, data: composition, status: 200 });
        })
        .catch(message => {
            res.json({ success: false, status: 401 });
            console.log("Error", message)
        });
}

// getting composed media
exports.getComposedMedia = function(req, res) {
    const Twilio = require('twilio');
    const client = new Twilio(twilioApiKey, twilioApiSecret, { accountSid: accountSid });

    const uri = 'https://video.twilio.com/v1/Compositions/' + req.params.id + '/Media?Ttl=3600';
    client.request({
            method: 'GET',
            uri: uri
        })
        .then(response => {
            const mediaLocation = JSON.parse(response.body).redirect_to;
            console.log(mediaLocation)
            return res.json({ success: true, status: 200, location: mediaLocation });
        })
        .catch(error => {
            console.log("Error" + error);
            res.json({ success: false, status: 400 });
        });
}


// callbacks for the room event
exports.roomCallback = function(req, res) {
    console.log(req.body)
    if (req.body.StatusCallbackEvent != undefined) {
        if (req.body.StatusCallbackEvent == "room-ended") { // room-ended callback
            console.log("room ended")
        }
        if (req.body.StatusCallbackEvent == "room-created") { // room-created callback
            console.log("room created")
        }
        if (req.body.StatusCallbackEvent == "participant-connected") { // participant-connected callback
            console.log("participant-connected")
        }
        if (req.body.StatusCallbackEvent == "participant-disconnected") { // participant-disconnected callback
            console.log("participant-disconnected")
        }
        if (req.body.StatusCallbackEvent == "track-added") { // track-added callback
            console.log("track-added")
        }
        if (req.body.StatusCallbackEvent == "track-removed") { // track-removed callback
            console.log("track-removed")
        }
        if (req.body.StatusCallbackEvent == "track-enabled") { // track-enabled callback
            console.log("track-enabled")
        }
        if (req.body.StatusCallbackEvent == "track-disabled") { // track-disabled callback                               
            console.log("track-disabled")
        }
        if (req.body.StatusCallbackEvent == "recording-started") { // recording-started callback
            console.log("recording-started")
            twClient.compositions.
            create({
                    roomSid: req.body.RoomSid,
                    audioSources: '*',
                    videoLayout: {
                        single: {
                            video_sources: [req.body.ParticipantSid]
                        }
                    },
                    statusCallback: webhookCompositionCallbackUrl,
                    format: 'mp4'
                })
                .then(composition => {
                    console.log('Created Composition with SID=' + composition.sid);
                })
                .catch(message => { console.log(message) })
        }
        if (req.body.StatusCallbackEvent == "recording-completed") { // recording-completed callback
            console.log("recording-completed")
        }
        if (req.body.StatusCallbackEvent == "recording-failed") { // recording-failed callback
            console.log("recording-failed")
        }
        return res.json({ success: true });
    } else {
        return res.json({ success: false });
    }
}

// the call back for the composition event
exports.compositionCallback = function(req, res) {
    console.log(req.body)
    if (req.body.StatusCallbackEvent != undefined) {
        if (req.body.StatusCallbackEvent == "composition-enqueued") { // composition-enqueued callback

        }
        if (req.body.StatusCallbackEvent == "composition-hook-failed") { // composition-hook-failed callback

        }
        if (req.body.StatusCallbackEvent == "composition-started") { // composition-started callback

        }
        if (req.body.StatusCallbackEvent == "composition-available") { // composition-available callback

        }
        if (req.body.StatusCallbackEvent == "composition-progress") { // composition-progress callback

        }
        if (req.body.StatusCallbackEvent == "composition-failed") { // composition-failed callback

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