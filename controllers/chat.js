let twilioOptions = require('../config/twilio.js');

const accountSid = twilioOptions.TWILIO_ACCOUNT_SID;
const twilioApiKey = twilioOptions.TWILIO_API_KEY;
const twilioApiSecret = twilioOptions.TWILIO_API_SECRET;
const serviceId = twilioOptions.TWILIO_IPM_SERVICE_SID;
const appName = twilioOptions.TWILIO_APP_NAME;
const AccessToken = require('twilio').jwt.AccessToken;

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
            endpointId: endpointId,
        });

        // Create an access token which we will sign and return to the client,
        // containing the grant we just created
        const token = new AccessToken(accountSid, twilioApiKey, twilioApiSecret);
        token.addGrant(chatGrant);
        token.identity = identity;

        // Serialize the token to a JWT string
        let jwt = token.toJwt();
        return res.json({ success: true, token: jwt });
    } else {
        return res.json({ success: false, msg: 'Device ID missing' });
    }
}
