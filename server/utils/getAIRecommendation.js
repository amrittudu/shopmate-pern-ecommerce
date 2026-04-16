export async function getAIRecommendation(req, res, userPrompt, products ) {
    debugger;
    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`;

    try {
        const geminiPrompt = `
        Here is a list of available products :
        ${JSON.stringify(products)}

        Based on the user's prompt, filter and suggest the best matching products:
        "${userPrompt}"
        Only return the matching products in JSON format.
        `;

        const response  = await fetch( apiUrl, {
            method : "POST",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify({
                contents : [{ parts : [{ text : geminiPrompt }] }],
            }),

        });

        const data = await response.json();
        const aiResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || "" ;
        const cleanedText = aiResponseText.replace(/```json```/g, ``).trim();
        
        if( !cleanedText ) {
            return res
            .status(200)
            .json({ success : false, message : "AI response is empty or invalid." });
        };

        let parsedProducts;
        
        try {
            parsedProducts = JSON.parse(cleanedText) ;

        } catch (error) {
            console.error("Error parsing AI response:", error);
            return res.status(500).json({ success : false, message : "Failed to parse AI response."})
        }
        return { success : true, products : parsedProducts };

    }

    catch(error) {
        res.status(500).json({
            success : false,
            message : "An error occurred while fetching AI recommendations."
        });
    }

};
