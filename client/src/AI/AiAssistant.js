import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import fetchPublicGoogleDoc from "./fetchGoogleDoc.js";

const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    apiKey: "AIzaSyCjk3DQoGz-ChVqmuqDwEG9_WrmeFDak4U",
    temperature: 0.7,
    maxOutputTokens: 2048,
});

async function AssistantChat(userInput, docId = null) {
    try {
        let docContent = "";
        if (docId) {
            docContent = await fetchPublicGoogleDoc(docId);
        }

        const messages = [
            { role: "system", content: "You are an AI assistant." },
            { role: "user", content: userInput },
        ];
console.log(docContent)
        if (docContent) {
            messages.push({ role: "user", content: `Here is some reference text:\n\n${docContent}` });
        }

        const response = await model.invoke(messages);
        return response.content;
    } catch (error) {
        console.error("Error in AI Assistant:", error);
        return "I apologize, but I'm having trouble processing your request.";
    }
}

// Example usage with a public Google Doc
async function AiAssistant(userInput, docId) {
    const response = await AssistantChat(userInput, docId);
    return response;
}

export default AiAssistant;
