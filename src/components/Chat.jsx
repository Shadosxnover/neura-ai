import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateResponse } from '../utils/gemini';
import { saveChat, getChats, getChatMessages, deleteChat } from '../utils/chatStorage';
import Sidebar from './Sidebar';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [activeChatId, setActiveChatId] = useState(null);
  const [chats, setChats] = useState(getChats());
  const messagesEndRef = useRef(null);

  useEffect(() => {
    setChats(getChats());
  }, []);

  useEffect(() => {
    if (activeChatId) {
      try {
        const chatMessages = getChatMessages(activeChatId);
        setMessages(chatMessages);
      } catch (error) {
        setMessages([]);
      }
    }
  }, [activeChatId]);

  const handleChatSelect = (chatId) => {
    setActiveChatId(chatId);
    const selectedMessages = getChatMessages(chatId);
    setMessages(selectedMessages);
    setInput('');
  };

  const handleNewChat = () => {
    setActiveChatId(null);
    setMessages([]);
    setInput('');
  };

  const handleEditTitle = (chatId, newTitle) => {
    const chat = chats[chatId];
    if (chat) {
      saveChat(chatId, newTitle, getChatMessages(chatId));
      setChats(getChats());
    }
  };

  const handleDeleteChat = (chatId) => {
    deleteChat(chatId);
    setChats(getChats());
    if (activeChatId === chatId) {
      setActiveChatId(null);
      setMessages([]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    setLoading(true);
    const timestamp = Date.now();
    const newMessage = { role: 'user', content: input.trim(), timestamp };
    let currentChatId = activeChatId;
    let updatedMessages = [];

    try {
      if (!currentChatId) {
        currentChatId = `chat_${timestamp}`;
        updatedMessages = [newMessage];
        setActiveChatId(currentChatId);
        saveChat(currentChatId, input.trim().slice(0, 30) + '...', updatedMessages);
      } else {
        updatedMessages = [...messages, newMessage];
        saveChat(currentChatId, null, updatedMessages);
      }

      setMessages(updatedMessages);
      setInput('');
      setChats(getChats());

      const response = await generateResponse(input.trim());
      const aiMessage = { 
        role: 'assistant', 
        content: response, 
        timestamp: Date.now() 
      };
      
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
      saveChat(currentChatId, null, finalMessages);
      setChats(getChats());

    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { 
        role: 'error', 
        content: `Error: ${error.message || 'Failed to generate response'}`, 
        timestamp: Date.now() 
      }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-black">
      <Sidebar
        chats={Object.values(chats)}
        activeChat={activeChatId}
        onChatSelect={handleChatSelect}
        onNewChat={handleNewChat}
        onDeleteChat={handleDeleteChat}
        onEditTitle={handleEditTitle}
      />
      
      <div className="flex-1 flex flex-col">
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <div className="max-w-xl w-full p-8">
                <form onSubmit={handleSubmit} className="space-y-4">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Start a new conversation..."
                    className="w-full p-6 rounded-2xl bg-gray-900 text-white border-2 border-gray-800 focus:border-white transition-colors text-lg placeholder:text-gray-500"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-full p-4 rounded-xl bg-white text-black font-medium text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => (
                <motion.div
                  key={message.timestamp}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] rounded-2xl p-4 ${
                    message.role === 'user' 
                      ? 'bg-white text-black' 
                      : 'bg-gray-900 text-white border border-gray-800'
                  }`}>
                    <p className="text-lg">{message.content}</p>
                  </div>
                </motion.div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-gray-900 text-white rounded-2xl p-4 border border-gray-800">
                    <p className="text-lg">Thinking...</p>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {messages.length > 0 && (
          <div className="p-6">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 p-4 rounded-xl bg-gray-900 text-white border-2 border-gray-800 focus:border-white transition-colors text-lg placeholder:text-gray-500"
              />
              <button
                type="submit"
                disabled={loading || !input.trim()}
                className="px-8 rounded-xl bg-white text-black font-medium text-lg hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                Send
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
