var functions = require('firebase-functions');
var admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase);

exports.syncDBOnUserCreate = functions.auth.user().onCreate(event => {
    return admin.database()
        .ref('users')
        .child(event.data.uid)
        .set({
            displayName: event.data.displayName,
            photoURL: event.data.photoURL
        });
});

exports.syncDBOnUserDelete = functions.auth.user().onDelete(event => {
    return admin.database()
        .ref('users')
        .child(event.data.uid)
        .remove();
});

exports.syncMyJobs = functions.database.ref('jobs/{jobId}/').onWrite(event => {
    var refs = [];
    var ref1 = admin.database()
        .ref(`owner_to_jobs/${event.auth.variable.uid}/${event.params.jobId}`);
    var ref2 = admin.database()
        .ref(`job_to_owner/${event.params.jobId}`);

    ref1 = event.data.exists() ? ref1.set(event.params.jobId) : ref1.remove()
    ref2 = event.data.exists() ? ref2.set(event.auth.variable.uid) : ref2.remove()

    return Promise.all([ref1,ref2]);
});

exports.onJobPayed = functions.database.ref('bids/{jobId}/{uid}/payed').onWrite(event => {
    return admin.database().ref(`jobs/${event.params.jobId}/locked`).set(true);
});