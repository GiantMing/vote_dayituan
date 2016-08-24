'use strict';

const Work = require('./workModel');
const Vote = require('./voteModel');





Work.hasMany(Vote);
Work.sync({focus: true});
Vote.sync({focus: true});

module.exports = {
    Work: Work,
    Vote: Vote
}