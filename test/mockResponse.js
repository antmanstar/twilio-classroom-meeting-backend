let classroom = {
    _id: "5e86f6d36e4eb35a88fd722d",
    uniqueName: "Room1",
    accountSid: "5e81b31d1c845f0017c619b1",
    roomSID: "RM6356f7f05678e2dae8a3b30734f11896",
    universityId: "5bb219db1f00e700132dde26",
    status: "in-progress"
};
let pmRoom = { _id: "5b249dfasdf983" };

module.exports = {

    // Classroom responses
    createClassroom: { success: true, data: classroom, status: 10000 },
    getClassroomByAdmin: { success: true, data: [classroom], status: 10000 },
    getClassroomById: { success: true, data: classroom, status: 10000 },
    endClassroom: { success: true, status: 10000 },
    getAllClassrooms: { success: true, data: [classroom], status: 10000 },
    joinClassroom: { success: true, status: 10000 },
    leaveClassroom: { success: true, status: 10000 },
    privateMeeting: { success: true, data: pmRoom },
    donate: { success: true, status: 10000 },
    roomCallback: { success: true }
};