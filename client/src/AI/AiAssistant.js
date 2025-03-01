import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

const model = new ChatGoogleGenerativeAI({
    modelName: "gemini-1.5-flash",
    apiKey: "AIzaSyCjk3DQoGz-ChVqmuqDwEG9_WrmeFDak4U",
    temperature: 0.7,
    maxOutputTokens: 2048,
});

async function AssistantChat(userInput, docLink = null) {
    try {
        const messages = [
            { role: "system", content: "You are an AI assistant." },
            { role: "user", content: userInput },
        ];

        if (docLink) {
            messages.push({ role: "user", content: `Here is some reference link: ${docLink}` });
        }

        const response = await model.invoke(messages);
        return response.content;
    } catch (error) {
        console.error("Error in AI Assistant:", error);
        return "I apologize, but I'm having trouble processing your request.";
    }
}

async function AiAssistant(userInput, docLink) {
    const response = await AssistantChat(userInput, docLink);
    return response;
}

export default AiAssistant;
