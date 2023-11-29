const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.post('/generate-text', async (req, res) => {
    const { exampleText, topic } = req.body;
      // Constructing the prompt as a conversation
      const messages = [
        {
            role: "system",
            content: "You are an expert creative brand strategist. You create brands from business ideas. You have outstanding copywriting skills."
        },
        {
            role: "user",
            content: `Take this business idea: ${exampleText} 
            GOAL: Create a table with necessary rows and columns to convey your brand approach.
            RESPONSE FORMAT: Include below rows in your table. I might give additional details about the row in paranthesis.
            Brand Name
            Brand Colors
            Target Audience (Describe their role, demographics, obstacles, wants and needs.)
            Features of the Product
            Benefits of the Product
            Emotions (emotions of target audience related with benefits)
            Positioning
            Unique Value Proposition
            Tone of Voice of their communication (in 3 to 5 pillars)`
        }
    ];
    console.log(exampleText);
    console.log(topic);

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
