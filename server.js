const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-text', async (req, res) => {
    const { exampleText } = req.body;
    console.log("Received exampleText:", exampleText);
      // Constructing the prompt as a conversation
      const messages = [
        {
            role: 'system',
            content: 'You are an expert creative brand strategist with outstanding copywriting skills.'
        },
        {
            role: 'user',
            content: ' You are an expert creative brand strategist with outstanding copywriting skills. GOAL: I want you to generate 5 brand names for each trend in the trends section for my business. It will help my audience remember and recall my brand and feel more affinity to me. TRENDS: 1- Combining Words: Creating brand names by blending two relevant words. 2- Made-Up Words: Inventing entirely new words. 3- Numerals and Symbols: Using numbers or symbols 4- Idea: Names that evoke emotions and are easy to visualize. 5- Prefixes or Suffixes: tech-related prefixes (e.g., "Tech," "Lab") or suffixes (e.g., "ify," "io") NAMING CRITERIA: Use as many different words as you can. All alternatives should be short, simple, and easy to pronounce. RESPONSE FORMAT: Return me a table with 2 columns: - Brand name - Impact score from 0 to 10 (10 — high impact). Do not write trend names as a category. only return the table. INFORMATION ABOUT ME: My Business: A simple platform that matches people in one click and lets them work or study side-by-side. Strengths: Deep focus, 1-1, serendipity My Audience: Students and freelancers'
        }
        
    ];
    console.log(exampleText);

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-3.5-turbo",
            messages: messages
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        res.json({ generatedText: response.data.choices[0].message.content });
    }
        catch (error) {
        console.error(error);
        res.status(500).send('Error generating text');
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
