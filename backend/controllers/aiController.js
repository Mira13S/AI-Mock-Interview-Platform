const {GoogleGenAI}=require("@google/genai");
const {conceptExplainPrompt}= require("../utils/prompt");
const { questionAnswerPrompt } = require("../utils/prompt");

const ai=new GoogleGenAI({apiKey: process.env.GEMINI_API_KEY});

// @desc Generate interview questions and answers using Gemini
// @route POST /api/ai/generate-questions
//@acess Private

const generateInterviewQuestions=async(req,res)=>
{
    try{
          const { role, experience, topicsToFocus, numberOfQuestions } = req.body;
          console.log(req.body);

          if(!role || !experience || !topicsToFocus || !numberOfQuestions)
          {
             return res.status(400).json({message:"Missing required fields"});
          }
          console.log("reached here");
          const prompt=questionAnswerPrompt(role,experience, topicsToFocus, numberOfQuestions);
          console.log("Generated Prompt:", prompt);
          const response= await ai.models.generateContent({
            model: "gemini-2.0-flash-lite",
            contents:prompt,
          });
          console.log("Generated Prompt:", response);
          let rawText=response.text;

          const cleanedText=rawText
                 .replace(/^```json\s*/, "")
                 .replace(/```$/, "") //remove ending ```
                 .trim();

          const data=JSON.parse(cleanedText);

          res.status(200).json(data);
              
    }
    catch(error)
    {
        res.status(500).json({
            message:"Failed to generate questions",
            error: error.message,
        });
    }
};

//@desc Generate axplains a interview question
//@route POST /api/ai/generate-explanation
//access Priavte

const generateConceptExplanation= async(req,res) =>
{
   try
   {
     const {question}= req.body;

     if(!question)
     {
        res.status(400).json({message:"Missing required fields"});
     }

     const prompt=conceptExplainPrompt(question);

     const response=await ai.models.generateContent({
        model:"gemini-2.0-flash-lite",
        contents:prompt,
     });


     let rawText=response.text;
     const cleanedText=rawText
                 .replace(/^```json\s*/, "")
                 .replace(/```$/, "") //remove ending ```
                 .trim();

    const data=JSON.parse(cleanedText);

     res.status(200).json(data);

   }
    catch(error)
    {
        res.status(500).json({
            message:"Failed to generate questions",
            error: error.message,
        });
    }
}

module.exports={generateConceptExplanation, generateInterviewQuestions};