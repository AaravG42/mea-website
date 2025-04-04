
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
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose
} from "@/components/ui/sheet";

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
      {/* Clean, Subtle Floating Button */}
      <button 
        onClick={toggleChat}
        className="fixed bottom-5 right-5 bg-white/90 text-mea-darkblue rounded-full p-3 shadow-md hover:bg-mea-gold/10 hover:shadow-lg transition-all duration-300 z-50 border border-mea-lightblue/20"
        aria-label="Chat with MEA Assistant"
      >
        <MessageCircle size={22} />
      </button>
      
      {/* Desktop Chat Interface - Using Sheet for cleaner sidebar */}
      <div className="md:block hidden">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetContent side="right" className="w-[380px] p-0 border-l border-mea-lightblue/20">
            {/* Chat Header */}
            <SheetHeader className="border-b border-border/30 px-4 py-3">
              <SheetTitle className="flex items-center text-mea-darkblue">
                <MessageCircle size={18} className="mr-2 text-mea-gold" />
                <span>MEA Assistant</span>
              </SheetTitle>
            </SheetHeader>
            
            {/* Chat Messages */}
            <div className="h-[calc(100vh-10rem)] overflow-y-auto p-4 bg-gray-50/80">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block max-w-[85%] rounded-lg px-4 py-2 ${
                      message.isUser 
                        ? 'bg-mea-lightblue/90 text-white' 
                        : 'bg-white border border-gray-200/80 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t bg-white">
              <div className="flex items-center">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 mr-2 resize-none max-h-20 min-h-10 text-sm py-2 px-3 rounded-md border-mea-lightblue/20"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-mea-darkblue hover:bg-mea-gold/10 hover:text-mea-gold"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {/* Mobile Drawer Version - Simplified */}
      <div className="md:hidden block">
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="h-[80vh] rounded-t-lg">
            <DrawerHeader className="border-b-0 py-2">
              <DrawerTitle className="flex items-center justify-center text-mea-darkblue">
                <MessageCircle size={18} className="mr-2 text-mea-gold" />
                <span>MEA Assistant</span>
              </DrawerTitle>
            </DrawerHeader>
            
            {/* Chat Messages */}
            <div className="p-4 overflow-y-auto flex-1 h-[calc(80vh-8rem)] bg-gray-50/80">
              {messages.map((message) => (
                <div 
                  key={message.id} 
                  className={`mb-4 ${message.isUser ? 'text-right' : ''}`}
                >
                  <div 
                    className={`inline-block max-w-[85%] rounded-lg px-4 py-2 ${
                      message.isUser 
                        ? 'bg-mea-lightblue/90 text-white' 
                        : 'bg-white border border-gray-200/80 text-gray-800'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Chat Input */}
            <div className="p-3 border-t bg-white mt-auto">
              <div className="flex items-center">
                <Textarea
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={handleKeyPress}
                  placeholder="Type your message..."
                  className="flex-1 mr-2 resize-none max-h-20 min-h-10 text-sm py-2 px-3 rounded-md border-mea-lightblue/20"
                  rows={1}
                />
                <Button 
                  onClick={handleSendMessage}
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-mea-darkblue hover:bg-mea-gold/10 hover:text-mea-gold"
                >
                  <Send size={16} />
                </Button>
              </div>
            </div>
          </DrawerContent>
        </Drawer>
      </div>
    </>
  );
};

export default ChatbotInterface;
