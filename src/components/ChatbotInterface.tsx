
import { useState, useRef, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send } from 'lucide-react';
import { 
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

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
  const { toast } = useToast();
  
  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      toast({
        title: "MEA Assistant",
        description: "How can I help you today?",
      });
    }
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
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };
  
  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
      {/* Modern Floating Chatbot Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-6 right-6 bg-gradient-to-r from-mea-gold to-amber-500 text-white rounded-full p-5 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 z-50 animate-pulse"
        aria-label="Open chat assistant"
      >
        <MessageCircle size={28} strokeWidth={2.5} className="animate-bounce" />
      </button>
      
      {/* Chat Interface - Drawer for Mobile, Modal for Desktop */}
      <div className="md:block hidden">
        <div 
          id="chatbot-modal"
          className={`fixed bottom-24 right-6 w-[400px] max-w-[calc(100vw-3rem)] bg-white rounded-xl shadow-2xl z-50 transition-all duration-300 border-2 border-mea-gold ${
            isOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none hidden'
          }`}
        >
          {/* Chat Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-mea-darkblue to-mea-lightblue text-white p-4 rounded-t-xl">
            <div className="flex items-center">
              <MessageCircle size={22} className="mr-2" />
              <h3 className="font-medium text-lg">MEA Assistant</h3>
            </div>
            <button 
              onClick={toggleChat}
              className="text-white/80 hover:text-white hover:bg-white/10 p-1 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Chat Messages */}
          <div className="h-[450px] max-h-[50vh] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div 
                key={message.id} 
                className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
              >
                <div 
                  className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                    message.isUser 
                      ? 'bg-gradient-to-r from-mea-gold to-amber-500 text-white rounded-tr-none' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                  }`}
                >
                  <p className="text-sm md:text-base">{message.text}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          
          {/* Chat Input */}
          <div className="p-4 border-t bg-white rounded-b-xl">
            <div className="flex items-center">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 mr-2 resize-none max-h-20 min-h-10 py-2 px-3 rounded-xl border-mea-lightblue/30 focus-visible:ring-mea-gold"
                rows={1}
              />
              <Button 
                onClick={handleSendMessage}
                size="icon"
                className="bg-gradient-to-r from-mea-gold to-amber-500 hover:from-amber-500 hover:to-mea-gold rounded-full h-10 w-10 shadow-md"
              >
                <Send size={18} />
              </Button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send</p>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Version */}
      <div className="md:hidden block">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[85vh] rounded-t-xl">
            <DrawerHeader className="border-b-0">
              <DrawerTitle className="flex items-center justify-center">
                <MessageCircle size={20} className="mr-2 text-mea-gold" />
                <span className="text-lg font-medium">MEA Assistant</span>
              </DrawerTitle>
            </DrawerHeader>
            
            {/* Chat Messages */}
            <div className="p-4 overflow-y-auto flex-1 h-[calc(85vh-10rem)] bg-gray-50">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block max-w-[85%] rounded-2xl px-4 py-3 shadow-sm ${
                      message.isUser 
                        ? 'bg-gradient-to-r from-mea-gold to-amber-500 text-white rounded-tr-none' 
                        : 'bg-white border border-gray-200 text-gray-800 rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-4 border-t bg-white mt-auto">
              <div className="flex items-center">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 mr-2 resize-none max-h-20 min-h-10 py-2 px-3 rounded-xl border-mea-lightblue/30 focus-visible:ring-mea-gold"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-gradient-to-r from-mea-gold to-amber-500 hover:from-amber-500 hover:to-mea-gold rounded-full h-10 w-10 shadow-md"
                >
                  <Send size={18} />
                </Button>
              </div>
              <p className="text-xs text-gray-500 mt-2 text-center">Press Enter to send</p>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ChatbotInterface;
