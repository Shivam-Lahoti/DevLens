import React, { useState } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import { explainPage, sendChatMessage } from '../../services/api';

function AIPanel({ currentUrl }) {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleExplainPage = async () => {
    setIsLoading(true);
    
    const userMessage = { role: 'user', content: `Explain this page: ${currentUrl}` };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await explainPage(currentUrl);
      const aiMessage = { role: 'assistant', content: response.explanation };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error explaining page:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendMessage = async (message) => {
    setIsLoading(true);
    
    const userMessage = { role: 'user', content: message };
    setMessages(prev => [...prev, userMessage]);

    try {
      const response = await sendChatMessage(message, currentUrl);
      const aiMessage = { role: 'assistant', content: response.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = { 
        role: 'assistant', 
        content: 'Sorry, I encountered an error. Please try again.' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">AI Assistant (Gemini)</h2>
        <button
          onClick={handleExplainPage}
          disabled={isLoading}
          className="w-full px-4 py-2 bg-secondary text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Processing...' : 'Explain This Page'}
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-sm">Ask me anything about the current page!</p>
            <p className="text-xs mt-2">Try "Explain this page" or ask specific questions.</p>
          </div>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage key={index} message={msg} />
          ))
        )}
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-500">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary"></div>
            <span className="text-sm">AI is thinking...</span>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4">
        <ChatInput onSend={handleSendMessage} disabled={isLoading} />
      </div>
    </div>
  );
}

export default AIPanel;