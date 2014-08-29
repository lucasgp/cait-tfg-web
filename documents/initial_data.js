/*
 * 1.- Open mongo console
 * 2.- Execute command: load("<path>/initial_data.js")
 */

dbName = "competition-db";
conn = new Mongo();
db = conn.getDB(dbName);

/* Competition states */
db.competitionState.insert({
    "name": "Open",
    "description": "Open to new participants",
    "version": 0
});
db.competitionState.insert({
    "name": "Closed",
    "description": "Closed to new participants",
    "version": 0
});
db.competitionState.insert({
    "name": "Ongoing",
    "description": "Currently taking place!",
    "version": 0
});
db.competitionState.insert({
    "name": "Finished",
    "description": "Finished",
    "version": 0
});

/* Competition types */
db.competitionType.insert({
    "name": "5K",
    "description": "5 kilometer race",
    "version": 0
});
db.competitionType.insert({
    "name": "10K",
    "description": "10 kilometer race",
    "version": 0
});
db.competitionType.insert({
    "name": "Marathon",
    "description": "42 kilometer race",
    "version": 0
});

/* Role types */
db.roleType.insert({
    "name": "MODERATOR",
    "description": "Users with this role are allowed to remove user's comments or participants of a competitions.",
    "version": 0
});

db.roleType.insert({
    "name": "ADMIN",
    "description": "Users with this role are allowed to do almost everything within the application.",
    "version": 0
});

var adminRoleId = db.roleType.find({
    name: {$eq: "ADMIN"}
})[0]._id.valueOf();

/* Default admin user */
db.user.insert({
    "username": "admin",
    "password": "admin",
    "name": "admin",
    "surname": "admin",
    "email": "admin@admin.com",
    "version": 0
});

var adminUserId = db.user.find({
    username: {$eq: "admin"}
})[0]._id.valueOf();

/* Assign ADMIN role to admin user */
db.userRole.insert({
    "userId": adminUserId,
    "roleTypesId": [
        adminRoleId
    ],
    "version": 0
});
