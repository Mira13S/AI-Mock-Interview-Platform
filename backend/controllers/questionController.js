const Question=require("../models/Question");
const Session=require("../models/Session");

//@desc Add additional questions to existing session
//@route POT /api/questions/add
//@access PRivatre

exports.addQuestionstoSession=async(req,res)=>
{
    try{
        const {sessionId, questions}=req.body;
        if(!sessionId || !questions || !Array.isArray(questions) )
        {
            return res.status(400).json({message: "Invalid Input Data"});
        }
        const session=await Session.findById(sessionId);

        if(!session)
        {
            return res.status(404).json({message: "Session Not Found"});
        }

        //Create New Questions
        const createdQuestions=await Question.insertMany(
            questions.map((q) =>({
                session:sessionId,
                question:q.question,
                answer:q.answer,
            }))
        );

        session.questions.push(...createdQuestions.map((q) => q._id));
        await session.save();

        res.status(201).json(createdQuestions);

    }
     catch(err)
     {
        res.status(500).json({message:"Server Error"});
     }
}

//@desc Pin or Unpin a Question
//@route POST /api/questions/:id/pin
//@access Private

exports.togglePinQuestion=async(req,res)=>
{
    try
    {
        const question=await Question.findById(req.params.id);
        
        if(!question)
        {
            return res.status(404).json({sucess: false, message:"Question Not Found" });
        }

        question.isPinned=!question.isPinned;
        await question.save();

        res.status(200).json({sucess:true, question});
        
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"});
    }
};

// @desc Update a note for a question
// @route POST /api/questions/:id/note
// @access Private

exports.updateQuestionNote=async(req,res)=>
{
    try
    {
       const {note}=req.body;
       const question=await Question.findById(req.params.id);

       if(!question)
       {
        return res.status(404).json({sucess:false, message:"Question not Found "});
       }

       question.note=note || "";
       await question.save();

       res.status(200).json({sucess:true, question});
    }
    catch(error)
    {
        res.status(500).json({message:"Server Error"});
    }

}