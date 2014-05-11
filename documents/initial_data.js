/* Competition states */
"competition-db".competitionState.insert({
    "name": "Open",
    "description": "Open to new participants"
});
"competition-db".competitionState.insert({
    "name": "Closed",
    "description": "Closed to new participants"
});
"competition-db".competitionState.insert({
    "name": "Ongoing",
    "description": "Currently taking place!"
});
"competition-db".competitionState.insert({
    "name": "Finished",
    "description": "Finished"
});

/* Competition types */
"competition-db".competitionType.insert({
    "name": "5K",
    "description": "5 kilometer race"
});
"competition-db".competitionType.insert({
    "name": "10K",
    "description": "10 kilometer race"
});
"competition-db".competitionType.insert({
    "name": "Marathon",
    "description": "42 kilometer race"
});

/* Role types */
"competition-db".roleType.insert({
    "name": "MODERATOR",
    "description": "Users with this role are allowed to remove user's comments or participants of a competitions."
});

"competition-db".roleType.insert({
    "name": "ADMIN",
    "description": "Users with this role are allowed to do almost everything within the application."
});

