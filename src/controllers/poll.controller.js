const ApiError = require("../utils/api-error.utils");
const ApiResponse = require("../utils/api-response.utils");
const asyncHandler = require("../utils/asynchandler.utils");
const Poll=require("../models/Poll.js")

const createPoll=asyncHandler(async(req,res)=>{
    const{question,options}=req.body;
    if(!question || !options)
        throw new ApiError(400,"questions or options not found")
    const formattedOptions = options.map((option) => ({
        text: option,
        votes: 0,
      }));
    const newPoll = new Poll({ question,options:formattedOptions});
    await newPoll.save();
    return res.status(201).json(new ApiResponse(201,newPoll,'Poll created successfully'))
})

const getAllPolls = asyncHandler(async (req, res) => {
    const polls = await Poll.find().sort({ createdAt: -1 });
    return res
      .status(200)
      .json(new ApiResponse(200, polls, "Polls fetched successfully"));
});
  

const voteOnPoll = asyncHandler(async (req, res) => {
    const { pollId, optionId} = req.body;
    if (!pollId || !optionId) {
      throw new ApiError(400, "Poll ID and option are required");
    }

    const poll = await Poll.findById(pollId);
    if (!poll) {
      throw new ApiError(404, "Poll not found");
    }
    
    const option = poll.options.id(optionId);
    if (!option) {
      throw new ApiError(400, "Invalid option ID");
    }
    option.votes += 1;
    await poll.save();
  
    return res
      .status(200)
      .json(new ApiResponse(200, poll, "Vote recorded successfully"));

  });

module.exports={createPoll,voteOnPoll,getAllPolls}