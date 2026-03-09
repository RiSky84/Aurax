import React, { useState, useRef, useEffect } from 'react';
import { chatAPI } from '../utils/api';
import CrisisModal from './CrisisModal';
import '../styles/ChatComponent.css';

function ChatComponent({ userId, conversationId = null }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentConversationId, setCurrentConversationId] = useState(conversationId);
  const [crisisAlert, setCrisisAlert] = useState(null);
  const [suggestedStrategies, setSuggestedStrategies] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadConversationHistory = async () => {
      try {
        const response = await chatAPI.getConversationHistory(currentConversationId);
        setMessages(response.data.messages || []);
      } catch (error) {
        console.error('Error loading conversation history:', error);
      }
    };

    if (currentConversationId) {
      loadConversationHistory();
    }
  }, [currentConversationId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    setLoading(true);

    try {
      const response = await chatAPI.sendMessage(
        userId,
        inputMessage,
        currentConversationId,
        'US' // Default region, can be made dynamic
      );

      setCurrentConversationId(response.data.conversationId);
      
      // Add user message
      setMessages(prev => [...prev, {
        role: 'user',
        content: inputMessage
      }]);

      // Add bot response
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: response.data.botResponse
      }]);

      setCrisisAlert(response.data.crisisAlert);
      setSuggestedStrategies(response.data.suggestedStrategies || []);
      setInputMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CrisisModal 
        crisisAlert={crisisAlert} 
        onClose={() => setCrisisAlert(null)} 
      />
      <div className="chat-container">
        <div className="chat-header">
          <h2>Mental Health Companion Chat</h2>
        </div>

      <div className="messages-container">
        {messages.length === 0 ? (
          <div className="empty-state">
            <p>Start a conversation with your Mental Health Companion</p>
            <p className="hint">Share how you're feeling, and we'll provide support and coping strategies</p>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {suggestedStrategies.length > 0 && (
        <div className="suggested-strategies">
          <h4>Suggested Coping Strategies:</h4>
          <div className="strategies-list">
            {suggestedStrategies.map((strategy, idx) => (
              <div key={idx} className="strategy-card">
                <h5>{strategy.name}</h5>
                <p>{strategy.description}</p>
                <span className="duration">{strategy.duration}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <form className="message-input-form" onSubmit={handleSendMessage}>
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type your message... (Remember, I'm here to listen)"
          disabled={loading}
          className="message-input"
        />
        <button
          type="submit"
          disabled={loading}
          className="send-button"
        >
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      </div>
    </>
  );
}

export default ChatComponent;
