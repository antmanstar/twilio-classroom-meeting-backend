let nock = require('nock');
let response = require('./mockResponse');

module.exports = {
    configClassroom(server) {

        nock(server).post('/classroom/university/:id').reply(200, response.createClassroom);
        nock(server).get('/classroom/university/:id').reply(200, response.getClassroomByAdmin);
        nock(server).get('/classroom/:id').reply(200, response.getClassroomById);
        nock(server).post('/classroom/:id/end').reply(200, response.endClassroom);
        nock(server).get('/classroom/university/:id/all').reply(200, response.getAllClassrooms);
        nock(server).post('/classroom/:id/join').reply(200, response.joinClassroom);
        nock(server).delete('/classroom/:id/join').reply(200, response.leaveClassroom);
        // nock(server).post('/classroom/:id/private').reply(200, response.privateMeeting);
        // nock(server).post('/classroom/:id/donate').reply(200, response.donate);
        nock(server).post('/classroom/webhook').reply(200, response.roomCallback);
    }
}