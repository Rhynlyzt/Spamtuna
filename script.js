const apiUrl = "https://appjonellccapis.zapto.org/api/gpt4o-v2?prompt=";
const chatWindow = document.getElementById("chatWindow");

// Load existing chat history from localStorage
document.addEventListener("DOMContentLoaded", loadChatHistory);

function sendMessage() {
    const userInput = document.getElementById("userInput").value.trim();
    if (!userInput) return;

    appendMessage("user", userInput);
    document.getElementById("userInput").value = ""; // Clear input field

    // Fetch AI response
    fetch(apiUrl + encodeURIComponent(userInput))
        .then(response => response.json())
        .then(data => {
            const aiResponse = data.response || "Sorry, I couldn't understand that.";
            appendMessage("ai", aiResponse);
        })
        .catch(error => {
            console.error("Error fetching AI response:", error);
            appendMessage("ai", "Error: Unable to get response.");
        });
}

// Append message to chat window and save to localStorage
function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add(sender === "user" ? "user-message" : "ai-message");
    messageElement.textContent = sender === "user" ? `You: ${message}` : `🤖 Mekumi AI: ${message}`;
    chatWindow.appendChild(messageElement);
    chatWindow.scrollTop = chatWindow.scrollHeight;

    // Save message to localStorage
    saveMessage(sender, message);
}

// Save message in localStorage
function saveMessage(sender, message) {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.push({ sender, message });
    localStorage.setItem("chatHistory", JSON.stringify(chatHistory));
}

// Load chat history from localStorage
function loadChatHistory() {
    const chatHistory = JSON.parse(localStorage.getItem("chatHistory")) || [];
    chatHistory.forEach(entry => appendMessage(entry.sender, entry.message));
}
function clearConversation() {
    // Clear chat history in the UI
    document.getElementById("chatWindow").innerHTML = "";
    
    // Clear chat history in localStorage
    localStorage.removeItem("chatHistory");
}



