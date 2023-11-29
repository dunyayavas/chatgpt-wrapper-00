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
            content: "You are an expert creative brand strategist with outstanding copywriting skills. Generate a brand strategy in a structured table format."
        },
        {
            role: "user",
            content: `Business Idea: ${exampleText}\n\nCreate a brand strategy table with the following headings: Brand Name, Brand Colors, Target Audience, Product Features, Product Benefits, Emotions, Positioning, Unique Value Proposition, and Tone of Voice. Describe each element briefly under its respective heading. Example format:\n\n| Heading | Description |\n| ------- | ----------- |\n| Brand Name | [Your text here] |\n| ... | ... |\n\nPlease fill in this table format with information for the given business idea.`
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
