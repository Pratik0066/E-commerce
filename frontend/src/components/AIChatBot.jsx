import { useState } from 'react';
import { MessageSquare, Send, X, Bot } from 'lucide-react';
import { Link } from 'react-router-dom';

const AIChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'bot', text: 'Hi! I am your AI Assistant. What electronics are you looking for today?' }
  ]);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    
    const query = input; // Capture the current input value
    setInput('');

   try {
    // Call your new Backend AI Search API
    const response = await fetch('/api/products/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: query }),
    });
    const data = await response.json();

    setMessages((prev) => [...prev, { 
      role: 'bot', 
      text: data.reply,
      // If products are found, provide a link to the first one
      suggestion: data.products.length > 0 ? `/product/${data.products[0]._id}` : null 
    }]);
  } catch (error) {
    console.error("AI Chat Error:", error);
  }
};

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-110"
      >
        {isOpen ? <X /> : <MessageSquare />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-80 md:w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden flex flex-col h-[500px]">
          <div className="bg-gray-900 p-4 flex items-center gap-3">
            <Bot className="text-blue-400" />
            <h3 className="text-white font-bold">Electronics AI Guide</h3>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                  msg.role === 'user' ? 'bg-blue-600 text-white' : 'bg-white border text-gray-800 shadow-sm'
                }`}>
                  {msg.text}
                  {msg.suggestion && (
                    <Link to={msg.suggestion} className="block mt-2 text-blue-500 font-bold hover:underline">
                      View Recommended Products →
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-white border-t flex gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Ask me anything..."
              className="flex-1 bg-gray-100 border-none rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <button onClick={handleSend} className="bg-blue-600 text-white p-2 rounded-xl">
              <Send size={18} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIChatBot;