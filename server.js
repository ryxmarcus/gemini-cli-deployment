const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/prompt', (req, res) => {
    const { prompt, model } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    const modelFlag = model ? `--model "${model.replace(/"/g, '\\"')}"` : '';
    console.log(`Executing prompt: ${prompt} (model: ${model || 'default'})`);

    // Execute gemini CLI in non-interactive mode
    exec(`gemini ${modelFlag} --prompt "${prompt.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send({ error: error.message, details: stderr });
        }
        
        res.send({ output: stdout, error: stderr });
    });
});

app.get('/', (req, res) => {
    res.send({ 
        message: 'Gemini CLI Web Wrapper is running!',
        usage: {
            endpoint: '/prompt',
            method: 'POST',
            body: { 
                prompt: 'string',
                model: 'string (optional, e.g., gemini-1.5-flash)'
            }
        },
        health: '/health'
    });
});

app.get('/health', (req, res) => {
    res.send({ status: 'OK' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Gemini CLI wrapper listening at http://0.0.0.0:${port}`);
});
