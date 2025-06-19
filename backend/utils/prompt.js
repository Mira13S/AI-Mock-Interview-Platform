const questionAnswerPrompt=(role,experience,topicsToFocus, numberOfQuestions)=>
    `You are an AI trained to generate technical interview questions and answers.
      
        Task:
        -Role: ${role} 
        -Candidate Experience Level: ${experience} years  
        -Topics to Focus On: ${topicsToFocus} 
        -Number of Questions Needed: ${numberOfQuestions}

        Instructions:
        - Generate ${numberOfQuestions} diverse interview questions tailored for a candidate applying for the role of {{role}} with {{experience}} years of experience.
        - Focus strictly on the following topics: ${topicsToFocus}.
        - Ensure the questions are suitable for a real technical interview (mix of theory, coding problems, or system design depending on experience).
        - Questions should vary in difficulty (Easy, Medium, Hard) based on experience level.
        - If the answer need a code example, add a small code block inside
        - Return a pure JSON array.  
        [
        {
          "question":"Question here?",
          "answer":"Answer here."
        },
        ...
        ]
        Important: DO NOT ADD ANY EXTRA TEXT — ONLY RETURN VALID JSON.
`;


const conceptExplainPrompt=(question)=>
`
You are an AI trained to generate explanations for a given interview question.

Your tasks include:
- Explain the following interview question and its concept in depth, as if you are teaching a beginner developer.
- Question: {{question}}
- Provide clear step-by-step reasoning and break down the topic so it’s easy to understand.
- If the explanation includes a code example, provide a small, clean code block that is easy to read.
- After the explanation, provide a **short and clear title** that summarizes the concept — this will be used as an article or page header.
- Keep the formatting very clean and clear.

Return the result as a **valid JSON object** in the following format:
{
  "title": "Short title here",
  "explanation": "Full detailed explanation here (may include code if relevant)"
}
 Important: DO NOT ADD ANY EXTRA TEXT — ONLY RETURN VALID JSON.

`;

module.exports={questionAnswerPrompt, conceptExplainPrompt};