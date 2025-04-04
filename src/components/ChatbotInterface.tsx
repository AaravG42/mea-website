
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from 'lucide-react';

interface Message {
  id: number;
  text: string;
  isUser: boolean;
}

const ChatbotInterface = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi there! I'm the MEA Assistant. How can I help you today?", isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;
    
    // Add user message
    const userMessageId = messages.length + 1;
    setMessages([...messages, { id: userMessageId, text: newMessage, isUser: true }]);
    setNewMessage("");
    
    // Simulate bot response (would be replaced with actual API call)
    setTimeout(() => {
      const botResponses = [
        "I'm here to help! What specific information about MEA are you looking for?",
        "You can find more details about that on our resources page.",
        "The next event is scheduled for next week. Check the events page for details!",
        "Feel free to email us at mea@iitb.ac.in for more information.",
        "That's a great question! Our team members would be happy to discuss this further."
      ];
      
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prevMessages => [...prevMessages, { 
        id: prevMessages.length + 1, 
        text: randomResponse, 
        isUser: false 
      }]);
    }, 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Chatbot Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-mea-gold text-white rounded-full p-4 shadow-lg hover:bg-amber-500 transition-colors z-50"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={24} />
      </button>
      
      {/* Chat Modal */}
      <div 
        id="chatbot-modal"
        className={`fixed bottom-24 right-6 w-[350px] max-w-[calc(100vw-3rem)] bg-white rounded-lg shadow-xl z-50 transition-all duration-300 ${
          isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none hidden'
        }`}
      >
        {/* Chat Header */}
        <div className="flex items-center justify-between bg-mea-darkblue text-white p-4 rounded-t-lg">
          <div className="flex items-center">
            <MessageCircle size={20} className="mr-2" />
            <h3 className="font-medium">MEA Assistant</h3>
          </div>
          <button 
            onClick={toggleChat}
            className="text-white/80 hover:text-white"
            aria-label="Close chat"
          >
            <X size={18} />
          </button>
        </div>
        
        {/* Chat Messages */}
        <div className="h-[400px] max-h-[50vh] overflow-y-auto p-4 bg-gray-50">
          {messages.map((message) => (
            <div 
              key={message.id} 
              className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
            >
              <div 
                className={`inline-block max-w-[80%] rounded-lg px-4 py-2 ${
                  message.isUser 
                    ? 'bg-mea-gold text-white rounded-tr-none' 
                    : 'bg-gray-200 text-gray-800 rounded-tl-none'
                }`}
              >
                <p>{message.text}</p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        
        {/* Chat Input */}
        <div className="p-4 border-t">
          <div className="flex">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="flex-1 mr-2"
            />
            <Button 
              onClick={handleSendMessage}
              size="icon"
              className="bg-mea-gold hover:bg-amber-500"
            >
              <Send size={18} />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatbotInterface;
