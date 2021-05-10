let SDK = require('@weloveeducation/sdk');

let master = {
    "dev": {
        mode: "dev",
        microservices: {
            emails: "localhost:9002",
            authentication: "localhost:8999",
            accounts: "localhost:9000",
            university: "localhost:9007"
        }
    },
    "prod": {
        mode: "prod",
        "microservices": {
            emails: "educationalcommunity-emails.herokuapp.com",
            authentication: "educationalcommunity-auth.herokuapp.com",
            accounts: "educationalcommunity-accounts.herokuapp.com",
            university: "educationalcommunity-uni.herokuapp.com",
            ewallet: "e-wallet-backend.herokuapp.com"
        }
    },
    "acceptance": { mode: "acceptance" },
    "test": {
        mode: "sandbox",
        "microservices": {
            emails: "educationalcommunity-emails-ts.herokuapp.com",
            authentication: "educationalcommunity-auth-ts.herokuapp.com",
            accounts: "educationalcommunity-acnt-ts.herokuapp.com",
            university: "educationalcommunity-uni-ts.herokuapp.com",
            ewallet: "e-wallet-backend-ts.herokuapp.com"
        }
    }
}

if (process.env.NODE_ENV == 'dev') {
    SDK.configure(master["dev"]);
} else if (process.env.NODE_ENV == 'test') {
    SDK.configure(master["test"]);
} else if (process.env.NODE_ENV == 'acceptance') {
    SDK.configure(master["acceptance"]);
} else if (process.env.NODE_ENV == 'prod') {
    SDK.configure(master["prod"]);
} else {
    throw new Error("Set up development variable. 'dev', 'test', 'acceptance', 'prod'");
}

module.exports = SDK;