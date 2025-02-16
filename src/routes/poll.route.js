const express=require('express');
const { createPoll, getAllPolls, voteOnPoll } = require('../controllers/poll.controller');
const router=express.Router();

router.route("/").post(createPoll);
router.route("/").get(getAllPolls);
router.route("/vote").post(voteOnPoll)

module.exports=router