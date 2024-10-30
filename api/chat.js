// api/chat.js

const { Configuration, OpenAIApi } = require('openai');

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // The API key will be stored securely in Vercel
});
const openai = new OpenAIApi(configuration);

module.exports = async (req, res) => {
  // Set CORS headers if necessary
  res.setHeader('Access-Control-Allow-Origin', '*'); // Replace '*' with your domain in production
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  const { message } = req.body;

  if (!message) {
    res.status(400).json({ error: 'No message provided.' });
    return;
  }

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo', // Use 'gpt-4' if you have access
      messages: [
        { role: 'system', content: 'You are a helpful assistant specialized in Hudson Faris\'s portfolio.' },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.data.choices[0].message.content.trim();
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error:', error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while processing your request.' });
  }
};