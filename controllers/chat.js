let twilioOptions = require('../config/twilio.js');

const accountSid = twilioOptions.TWILIO_ACCOUNT_SID;
const authToken = twilioOptions.TWILIO_ACCOUNT_AUTH_TOKEN;
const twilioApiKey = twilioOptions.TWILIO_API_KEY;
const twilioApiSecret = twilioOptions.TWILIO_API_SECRET;
const serviceId = twilioOptions.TWILIO_IPM_SERVICE_SID;
const appName = twilioOptions.TWILIO_APP_NAME;
const pushCredentialSid = twilioOptions.TWILIO_PUSH_CREDENTIAL_SID;
const AccessToken = require('twilio').jwt.AccessToken;
const tw = require('twilio')(accountSid, authToken);

// generate token for the chat
exports.generateChatAccessToken = function(req, res) {
    const ChatGrant = AccessToken.ChatGrant;
    const identity = req.account._id;
    const deviceId = req.params.deviceId;

    if (deviceId != undefined && deviceId != null) {
        // Create a unique ID for the client on their current device
        const endpointId = appName + ':' + identity + ':' + deviceId;

        // Create a "grant" which enables a client to use Chat as a given user,
        // on a given device
        const chatGrant = new ChatGrant({
            serviceSid: serviceId,
            // endpointId: endpointId,
            pushCredentialSid: pushCredentialSid
        });

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret);
        token.addGrant(chatGrant);
        token.identity = identity;

        // Serialize the token to a JWT string
        let jwt = token.toJwt();
        return res.json({ success: true, token: jwt, });
    } else {
        return res.json({ success: false, msg: 'Device ID missing' });
    }
}

// create admin channel
exports.createChannel = function(req, res) {
    const f_name = req.body.friendlyName;
    const u_name = req.body.uniqueName;

    tw.chat.services(serviceId)
        .channels
        .create({ // create channel
            friendlyName: f_name,
            uniqueName: u_name,
            type: 'public',
        })
        .then(channel => {
            return res.json({ success: true, status: 201, data: channel });
        }).catch(message => {
            return res.json({ success: false, status: 400, msg: message })
        })
}

// get all channels
exports.getAllChannels = function(req, res) {
    tw.chat.services(serviceId)
        .channels
        .list()
        .then(channels => {
            return res.json({ success: true, status: 201, data: channels });
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message })
        })
}

// get a channel
exports.getChannelByChannelId = function(req, res) {
    const chId = req.params.chid;

    tw.chat.services(serviceId)
        .channels(chId)
        .fetch()
        .then(channel => {
            return res.json({ success: true, status: 201, data: channel });
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message })
        })
}

// get a channel by unique name
exports.getChannelByUniqueName = function(req, res) {
    const uniqueName = req.body.uniqueName;

    tw.chat.services(serviceId)
        .channels
        .list({ uniqueName: uniqueName })
        .then(channels => {
            return res.json({ success: true, status: 201, data: channels[0] });
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message })
        })
}


// del all channels
exports.delAllChannels = function(req, res) {
    tw.chat.services(serviceId)
        .channels
        .list()
        .then(channels => {
            channels.forEach(channel => {
                channel
                    .remove()
                    .catch((message) => {
                        return res.json({ success: false, status: 400, msg: message })
                    })
            })
            return res.json({ success: true, status: 201, msg: 'sucess' });
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message })
        })
}

// del a channel
exports.delChannel = function(req, res) {
    const chId = req.body.chId;

    tw.chat.services(serviceId)
        .channels(chId)
        .fetch()
        .then(channel => {
            channel
                .remove()
                .then(() => {
                    return res.json({ success: true, status: 201, data: 'successfully deleted' });
                })
                .catch(message => {
                    return res.json({ success: false, status: 400, msg: message });
                })
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message });
        })
}

// del a channel by unique name
exports.delChannelByUniqueName = function(req, res) {
    const uniqueName = req.body.uniqueName;

    tw.chat.services(serviceId)
        .channels
        .list({ uniqueName: uniqueName })
        .then(channels => {
            channels[0]
                .remove()
                .then(() => {
                    return res.json({ success: true, status: 201, data: 'successfully deleted' });
                })
                .catch(message => {
                    return res.json({ success: false, status: 400, msg: message });
                })
        })
        .catch(message => {
            return res.json({ success: false, status: 400, msg: message });
        })
}