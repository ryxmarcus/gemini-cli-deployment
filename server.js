const express = require('express');
const { exec } = require('child_process');
const bodyParser = require('body-parser');

const app = express();
const port = 8080;

app.use(bodyParser.json());

app.post('/prompt', (req, res) => {
    const { prompt } = req.body;

    if (!prompt) {
        return res.status(400).send({ error: 'Prompt is required' });
    }

    console.log(`Executing prompt: ${prompt}`);

    // Execute gemini CLI in non-interactive mode
    exec(`gemini --prompt "${prompt.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
        if (error) {
            console.error(`Error: ${error.message}`);
            return res.status(500).send({ error: error.message, details: stderr });
        }
        
        res.send({ output: stdout, error: stderr });
    });
});

app.get('/health', (req, res) => {
    res.send({ status: 'OK' });
});

app.listen(port, '0.0.0.0', () => {
    console.log(`Gemini CLI wrapper listening at http://0.0.0.0:${port}`);
});
