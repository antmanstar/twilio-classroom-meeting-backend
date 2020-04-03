//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./config').server;
let should = chai.should();
let configClassroomMock = require('./nockConfig').configClassroom;

chai.use(chaiHttp);

describe('Classroom', () => {
    beforeEach((done) => {
        configClassroom(server);
        done();
    });
    /*
     * Test the /POST createClassroom
     */
    describe('/POST /classroom/university/:id', () => {
        it('it should Create new classroom', (done) => {
            chai.request(server)
                .post('/classroom/university/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });

    /*
     * Test the /GET getClassroomByAdmin
     */
    describe('/GET /classroom/university/:id', () => {
        it('it should GET all classrooms created by admin', (done) => {
            chai.request(server)
                .get('/classroom/university/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    /*
     * Test the /GET getClassroomById
     */
    describe('/GET /classroom/:id', () => {
        it('it should GET classroom by id', (done) => {
            chai.request(server)
                .get('/classroom/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });

    /*
     * Test the /POST endClassroom
     */
    describe('/POST /classroom/:id/end', () => {
        it('it should end classroom session', (done) => {
            chai.request(server)
                .get('/university/id/:id')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    done();
                });
        });
    });

    /*
     * Test the /GET getAllClassrooms
     */
    describe('/GET /classroom/university/:id/all', () => {
        it('it should GET all available classrooms for member', (done) => {
            chai.request(server)
                .get('/classroom/university/:id/all')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });

    /*
     * Test the /POST joinClassroom
     */
    describe('/POST /classroom/:id/join', () => {
        it('it should check if member can join the classroom', (done) => {
            chai.request(server)
                .post('/classroom/:id/join')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('object');
                    res.body.status.should.eql(10000);
                    done();
                });
        });
    });


    /*
     * Test the /DELETE leaveClassroom
     */
    describe('/DELETE /classroom/:id/join', () => {
        it('it should leave the classroom', (done) => {
            chai.request(server)
                .delete('/classroom/:id/join')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    done();
                });
        });
    });

    /*
     * Test the /post privateMeeting
     */
    describe('/POST /classroom/:id/private', () => {
        it('it should SHOULD create private meeting with classroom admin', (done) => {
            chai.request(server)
                .post('/classroom/:id/private')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.data.should.be.a('object');
                    done();
                });
        });
    });


    /*
     * Test the /POST donate
     */
    describe('/POST /classroom/:id/donate', () => {
        it('it should ADD new donation', (done) => {
            chai.request(server)
                .post('/classroom/:id/donate')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    done();
                });
        });
    });


    /*
     * Test the /POST roomCallback
     */
    describe('/POST /classroom/webhook', () => {
        it('it should ACCEPT Twilio room event callbacks', (done) => {
            chai.request(server)
                .post('/classroom/webhook')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.success.should.eql(true);
                    res.body.status.should.be.a('number');
                    res.body.data.should.be.a('array');
                    done();
                });
        });
    });
});