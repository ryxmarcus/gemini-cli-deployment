const chatHistory = document.getElementById('chat-history');
const promptInput = document.getElementById('prompt-input');
const sendBtn = document.getElementById('send-btn');

function appendMessage(text, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    messageDiv.textContent = text;
    chatHistory.appendChild(messageDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
}

function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'message ai-message loading-indicator';
    loadingDiv.innerHTML = '<div class="loading-dots"><span></span><span></span><span></span></div>';
    chatHistory.appendChild(loadingDiv);
    chatHistory.scrollTop = chatHistory.scrollHeight;
    return loadingDiv;
}

async function handleSend() {
    const prompt = promptInput.value.trim();
    if (!prompt) return;

    promptInput.value = '';
    promptInput.style.height = 'auto';
    appendMessage(prompt, true);

    const loadingIndicator = showLoading();
    sendBtn.disabled = true;

    try {
        const response = await fetch('/prompt', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ prompt }),
        });

        const data = await response.json();
        chatHistory.removeChild(loadingIndicator);

        if (response.ok) {
            appendMessage(data.output || 'No response from AI.');
        } else {
            appendMessage(`Error: ${data.error || 'Something went wrong'}`, false);
        }
    } catch (error) {
        chatHistory.removeChild(loadingIndicator);
        appendMessage(`Connection Error: ${error.message}`, false);
    } finally {
        sendBtn.disabled = false;
        promptInput.focus();
    }
}

sendBtn.addEventListener('click', handleSend);

promptInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleSend();
    }
});

// Auto-resize textarea
promptInput.addEventListener('input', function() {
    this.style.height = 'auto';
    this.style.height = (this.scrollHeight) + 'px';
});

promptInput.focus();
