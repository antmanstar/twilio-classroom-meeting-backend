let mongoose = require('mongoose');
let jwt = require('jsonwebtoken');
let Classroom = require('../models/Classroom.js');
let Donation = require('../models/Donation.js');

let bcrypt = require('bcryptjs');
let lodash = require('lodash');
let jwtOptions = require('../config/jwt.js');

let twilioOptions = require('../config/twilio.js');

let SDK = require('../lib/sdkconfig.js');

let emails = SDK.emails;

const webhookCallbackUrl = "http://weLove.Education/classroom/webhook";

const accountSid = twilioOptions.TWILIO_ACCOUNT_SID;
const authToken = twilioOptions.TWILIO_ACCOUNT_AUTH_TOKEN;
const serviceId = twilioOptions.TWILIO_IPM_SERVICE_SID;
const tw = require('twilio')(accountSid, authToken);
let twClient = tw.video;

exports.getAllClassrooms = function(req,res) {
	Classroom.find({}, function(err, data) {
		if(err) {
			return res.json({success: false, status: 101});
		} else if(data != undefined && data != null) {
			return res.json({success: true, data: data, status: 102});
		} else {
			return res.json({ success: false, status: 103});
		}
	});
}

exports.getAllClassroomsByUniversity = function(req,res) {
	let universityId = req.params.id;

	Classroom.find({universityId: universityId}, function(err, data) {
		if(err) {
			return res.json({success: false, status: 104});
		} else if(data != undefined && data != null) {
			return res.json({success: true, data: data, status: 105});
		} else {
			return res.json({ success: false, status: 106});
		}
	});
}

exports.createUniversityClassroom = function(req, res) {
	let universityId = req.params.id;
	let accountId = req.account._id;

	let payload = {universityId: universityId, accountId: accountId};

	university.getPrivilege(payload)
	.then(function (response) {
		if (response.success) {
			if (response.data.privilege >= 99) {
				let newRoom = Classroom.new();

				newRoom.recordParticipantsOnConnect = true;
				newRoom.uniqueName = req.body.title;
				newRoom.status = 1;
				newRoom.minPrivilege = req.body.minPrivilege;
				newRoom.privateMeetingRate = req.body.pmRate;
				newRoom.universityId = universityId;
				newRoom.ownerId = accountId;

				let callbackUrl = ""; 
				/* We will leave it as empty for now, twilio callback won't be dispatched */
				//let callbackUrl = webhookCallbackUrl;

				twClient.rooms.create({uniqueName: newRoom.uniqueName,
										statusCallback: callbackUrl})
						.then(room => {
							newRoom.roomSID = room.sid;
							newRoom.save(function(err, doc) {
				              if (err)
				                return res.json({ success: false, err: err, status : 402 });
				              else if (doc != undefined && doc != null)
				                return res.json({ success: true, status : 10000, data: {id: doc._id, sid: room.sid}});
				              else
				                return res.json({ success: false, status : 402 });
				            });

						})
						.catch(message => res.json({success: false, status: 401}));
			} else
				return res.json({ success: false, status: 403, err: "Insufficient privilege" });
		} else {
			return res.json({ success: false, err: err, status: 402});
		}
	})
	.catch(function (err) {return res.json({ success: false, err: err, status: 402})})''
}

exports.getClassroomsByAdmin = function(req, res) {
	let accountId = req.account._id;
	let universityId = req.params.id;

	Classroom.find({ownerId: accountId, universityId: universityId}, function (err, data) {
		if(err) {
			return res.json({success: false, status: 107});
		} else if(data != undefined && data != null) {
			if (err)
	            return res.json({ success: false, err: err, status : 402 });
	        else if (data != undefined && data != null)
	            return res.json({ success: true, status : 1, 
	            	data: data
	            });
	        else
	            return res.json({ success: false, status : 402 });
		} else {
			return res.json({ success: false, status: 112});
		}
	});
}

exports.getClassroomById = function(req, res) {
	let accountId = req.account._id;
	let roomId = req.params.id;

	Classroom.findOne({ownerId: accountId, _id: roomId}, function (err, data) {
		if(err) {
			return res.json({success: false, status: 107});
		} else if(data != undefined && data != null) {
			if (err)
	            return res.json({ success: false, err: err, status : 402 });
	        else if (data != undefined && data != null)
	            return res.json({ success: true, status : 1, 
	            	data: data
	            });
	        else
	            return res.json({ success: false, status : 402 });
		} else {
			return res.json({ success: false, status: 112});
		}
	});
}

exports.endClassroom = function(req, res) {
	let accountId = req.account._id;
	let roomId = req.params.id;

	Classroom.findOne({ownerId: accountId, _id: roomId}, function (err, data) {
		if(err) {
			return res.json({success: false, status: 107});
		} else if(data != undefined && data != null) {
			if (err)
	            return res.json({ success: false, err: err, status : 402 });
	        else if (data != undefined && data != null) {
	        	if(data.status == 1)
	        		return res.json({success: false, status: 402, err: "Room already completed!"});
	        	twClient.rooms(data.roomSID)
	        			.update({status: "completed"})
						.then(room => {
							Classroom.findOneAndUpdate({_id: roomId}, {$set: {status: 1}}, function(err, data) {
								if (err)
						            return res.json({ success: false, err: err, status : 402 });
						        else if (data != undefined && data != null) {
						        	return res.json({success: true, status: 10000});
						        } else
						            return res.json({ success: false, status : 402 });
							});
						})
						.catch(message => res.json({success: false, status: 401}));
	        } else
	            return res.json({ success: false, status : 402 });
		} else {
			return res.json({ success: false, status: 112});
		}
	});
}

exports.joinClassroom = function(req,res) {
	let classroomId = req.params.id;
	let accountId = req.account._id;

	Classroom.find({_id: classroomId}, function(err, data) {
		if(err) {
			return res.json({success: false, status: 107});
		} else if(data != undefined && data != null) {
			let classroom = data;
			let payload = {universityId: classroom.universityId, accountId: accountId};

			university.getPrivilege(payload)
			.then(function (response0) {
				if (response0.success) {
					if (classroom.permissionMin > response0.data.privilege) {
						classroom.members = lodash.union([accountId], classroom.members);

						classroom.save(function(err, doc) {
			              if (err)
			                return res.json({ success: false, err: err, status : 108 });
			              else if (doc != undefined && doc != null)
			                return res.json({ success: true, status : 10000 });
			              else
			                return res.json({ success: false, status : 109 });
			            });
					}
				} else {
					return res.json({ success: false, err: err, status: 110});
				}
			})
			.catch(function (err) {return res.json({ success: false, err: err, status: 111})})
		} else {
			return res.json({ success: false, status: 112});
		}
	});
}

exports.leaveClassroom = function(req,res) {
	let classroomId = req.params.id;
	let accountId = req.account._id;

	Classroom.find({_id: classroomId}, function(err, data) {
		if(err) {
			return res.json({success: false, status: 120});
		} else if(data != undefined && data != null) {
			let classroom = data;

			classroom.members = lodash.difference(classroom.members, [accountId]);
			classroom.save(function(err, doc) {
              if (err)
                return res.json({ success: false, err: err, status : 121 });
              else if (doc != undefined && doc != null)
                return res.json({ success: true, status : 129 });
              else
                return res.json({ success: false, status : 122 });
            });
		} else {
			return res.json({ success:false, status: 123});
		}
	});
}

exports.privateMeeting = function(req,res) {
	// Classroom.find({}, function(err, data) {
	// 	if(err) {
	// 		return res.json({success: false, status: 101});
	// 	} else if(data != undefined && data != null) {
	// 		return res.json({success: true, data: data, status: 102});
	// 	}
	// 	return res.json({ success:false, status: 103});
	// });
}

exports.donate = function(req,res) {
	let classroomId = req.params.id;
	let accountId = req.account._id;

	let donation = new Donation();
	donation.classroomId = classroomId;
	donation.accountId = accountId;

	donation.save(function (err, doc) {
		if (err) {
	      	return res.json({ success: false, status: 140, err: err });
	    } else if (doc != undefined && doc != null) {
	    	return res.json({ success: true, status: 141 });
	    } else {
	    	return res.json({ success: false, status : 142});
	    }
	});
}

exports.roomCallback = function(req, res) {
	if(req.body.statusCallbackEvent != undefined) {
		if(req.body.statusCallbackEvent == "room-ended") { // room-ended callback
			let roomSid = req.body.roomSid;

			Classroom.findOne({roomSID: roomSid}, function(err, data) {
				/*
				 Room found and additional functionality would be required for future use
				*/
			});
		}
	}
	return res.json({success: true});
}