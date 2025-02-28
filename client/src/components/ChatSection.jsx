import { useEffect, useRef, useState } from 'react';
import ChatInput from './ChatInput';
import AiAssistant from '../AI/AiAssistant';

const ChatSection = ({ selectedSubject }) => {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // Auto scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (messageText) => {
        try {
            setIsLoading(true);

            // Add user message to chat
            const userMessage = {
                role: 'user',
                content: messageText,
            };
            setMessages(prev => [...prev, userMessage]);

            // Get AI response
            const response = await AiAssistant(messageText, selectedSubject?.googleDocId);

            // Add AI response to chat
            const aiMessage = {
                role: 'assistant',
                content: response,
            };
            setMessages(prev => [...prev, aiMessage]);

        } catch (error) {
            console.error('Error getting AI response:', error);
            setMessages(prev => [...prev, {
                role: 'error',
                content: 'Sorry, I encountered an error. Please try again.',
            }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="h-full flex items-center justify-center w-full">
            <div className="w-full h-[80%] bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-gray-200 flex flex-col mx-4">
                {/* Chat messages area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
                    {messages.length === 0 ? (
                        // Skeleton messages when chat is empty
                        <>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-sm backdrop-blur-md bg-gray-100">
                                    <p className="leading-relaxed text-sm text-gray-600">Hello! I&apos;m your AI study assistant. How can I help you understand your subjects better today?</p>
                                </div>
                            </div>
                            <div className="flex justify-end opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-sm backdrop-blur-md bg-gradient-to-r from-blue-100 to-cyan-100">
                                    <p className="leading-relaxed text-sm text-gray-700">I need help practicing some questions for my exam...</p>
                                </div>
                            </div>
                            <div className="flex justify-start opacity-40">
                                <div className="max-w-[70%] rounded-xl p-4 shadow-sm backdrop-blur-md bg-gray-100">
                                    <p className="leading-relaxed text-sm text-gray-600">I&apos;d be happy to help you practice questions and understand key concepts. What subject would you like to focus on?</p>
                                </div>
                            </div>
                        </>
                    ) : (
                        messages.map((message, index) => (
                            <div
                                key={index}
                                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fadeIn`}
                            >
                                <div
                                    className={`max-w-[70%] rounded-xl p-4 shadow-sm backdrop-blur-md 
                                        ${message.role === 'user'
                                            ? 'bg-gradient-to-r from-blue-100 to-cyan-100 text-gray-700'
                                            : message.role === 'error'
                                                ? 'bg-red-100 text-red-600'
                                                : 'bg-gray-100 text-gray-600'
                                        } 
                                        transform hover:scale-[1.02] transition-all duration-300 ease-in-out`}
                                >
                                    <p className="leading-relaxed text-sm">{message.content}</p>
                                </div>
                            </div>
                        ))
                    )}
                    {isLoading && (
                        <div className="flex justify-start animate-pulse">
                            <div className="bg-gray-100 rounded-xl p-4 shadow-sm">
                                <div className="flex items-center space-x-2">
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:150ms]"></div>
                                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-duration:600ms] [animation-delay:300ms]"></div>
                                </div>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Chat input area */}
                <div className="w-full bg-gray-50 p-4 gap-2 rounded-b-2xl border-t border-gray-200 flex justify-between items-center">
                    <ChatInput onSendMessage={handleSendMessage} />
                    {selectedSubject && (
                        <div className="h-15 p-4 bg-sky-100 text-sky-700 rounded-lg inline-block">
                            Using reference: {selectedSubject.subjectCode}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatSection;