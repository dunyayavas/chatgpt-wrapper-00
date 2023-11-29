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
            content: ' Come up with 10 brand name alternatives which are memorizable, easy to say, sound good, distinctive for this business Idea: ${exampleText}\n\n Your alternatives should fit one of these categories: Definitive Brand Names (like Volkswagen, Toys r Us, booking.com), Hybrid Brand Names (combination of what it does and something else, like surveymonkey, airbnb, userpilot, shopify), Conceptual Brand Names (they create a feeling or convey an idea rather that what they do like apple, nike, amazon), Abstract brand names (they dont necessarily mean something but they are nice to say like yahoo, pixar, google)'
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
