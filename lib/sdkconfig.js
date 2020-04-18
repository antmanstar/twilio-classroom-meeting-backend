let SDK = require('@weloveeducation/sdk');

// microservices configuration
let microservicesPort = { university: "9007", emails: "9002", authentication: "8999", accounts: "9000", chat: "9020" };

if (process.env.NODE_ENV == 'dev' || true) {
    SDK.configure({
        mode: "sandbox",
        microservices: microservicesPort
    });

} else if (process.env.NODE_ENV == 'test') {
    SDK.configure({
        mode: "sandbox",
        microservices: microservicesPort
    });

} else if (process.env.NODE_ENV == 'acceptance') {
    SDK.configure({ mode: "acceptance" });
} else if (process.env.NODE_ENV == 'prod') {
    SDK.configure({ mode: "prod" });
} else {
    throw new Error("Set up development variable. 'dev', 'test', 'acceptance', 'prod'");
}

module.exports = SDK;
