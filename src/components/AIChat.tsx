import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { ScrollArea } from "../components/ui/scroll-area";
import { MessageCircle, Send, X, Bot } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! I'm Mr. Bony, your AI bone specialist assistant. I can help you understand bone fractures, their causes, treatments, and prevention. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Knowledge base for Mr. Bony
    if (
      lowerMessage.includes("clavicle") ||
      lowerMessage.includes("collarbone")
    ) {
      return "The clavicle (collarbone) is a common fracture site. It connects your shoulder blade to your breastbone. Clavicle fractures often occur from falls on the shoulder or outstretched arm. Most heal well with conservative treatment using a sling for 6-12 weeks. Would you like to know more about clavicle fracture symptoms or treatment?";
    }

    if (
      lowerMessage.includes("humerus") ||
      lowerMessage.includes("upper arm")
    ) {
      return "The humerus is your upper arm bone, the longest bone in your arm. Fractures can occur at the proximal end (near shoulder) or distal end (near elbow). Treatment depends on the location and severity - some require surgery while others heal with immobilization. Recovery typically takes 8-16 weeks.";
    }

    if (lowerMessage.includes("femur") || lowerMessage.includes("thigh")) {
      return "The femur is the strongest and longest bone in your body, running from hip to knee. Femur fractures are serious injuries that usually require surgical repair with rods, plates, or screws. Recovery can take 3-6 months and requires extensive rehabilitation.";
    }

    if (lowerMessage.includes("healing") || lowerMessage.includes("recovery")) {
      return "Bone healing occurs in four stages: 1) Inflammation (first few days), 2) Soft callus formation (weeks 2-3), 3) Hard callus formation (weeks 6-12), and 4) Remodeling (months to years). Proper nutrition, rest, and following medical advice are crucial for optimal healing.";
    }

    if (
      lowerMessage.includes("prevention") ||
      lowerMessage.includes("prevent")
    ) {
      return "Prevent fractures by: maintaining bone density through calcium and vitamin D intake, regular weight-bearing exercise, avoiding falls by keeping your home safe, wearing protective gear during sports, and getting regular bone density screenings if you're at risk.";
    }

    if (lowerMessage.includes("symptoms") || lowerMessage.includes("signs")) {
      return "Common fracture symptoms include: severe pain at the injury site, swelling and bruising, inability to move the affected area normally, visible deformity or bone protruding through skin, and numbness or tingling. If you suspect a fracture, seek immediate medical attention.";
    }

    if (
      lowerMessage.includes("treatment") ||
      lowerMessage.includes("therapy")
    ) {
      return "Fracture treatment varies by type and severity but may include: immobilization with casts or splints, surgical repair with pins/plates/screws, pain management, physical therapy for rehabilitation, and gradual return to activities. Always follow your doctor's specific treatment plan.";
    }

    if (lowerMessage.includes("x-ray") || lowerMessage.includes("imaging")) {
      return "X-rays are the primary imaging tool for diagnosing fractures. They show bone structure clearly and can reveal breaks, cracks, and displacement. Sometimes additional imaging like CT scans or MRI may be needed for complex fractures or soft tissue evaluation.";
    }

    // Default responses for general queries
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
      return "Hello! I'm here to help you with any questions about bones, fractures, or bone health. What would you like to learn about today?";
    }

    if (lowerMessage.includes("thank")) {
      return "You're welcome! I'm always here to help with bone health questions. Remember, while I can provide educational information, always consult with healthcare professionals for medical advice and treatment.";
    }

    // General bone/fracture response
    return "That's an interesting question about bone health! I specialize in fracture types, bone anatomy, healing processes, and prevention. Could you be more specific about what aspect you'd like to know more about? For example, I can explain different fracture types, healing timelines, or prevention strategies.";
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
      setTimeout(scrollToBottom, 100);
    }, 1000 + Math.random() * 1000);

    setTimeout(scrollToBottom, 100);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: "spring", stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg"
          size="lg"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[500px]"
          >
            <Card className="bg-slate-800/95 border-slate-600 backdrop-blur-sm h-full flex flex-col">
              <CardHeader className="pb-4">
                <CardTitle className="text-white flex items-center">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  Mr. Bony - AI Assistant
                </CardTitle>
              </CardHeader>

              <CardContent className="flex-1 flex flex-col p-4 pt-0">
                <ScrollArea className="flex-1 pr-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${
                          message.isUser ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] p-3 rounded-lg ${
                            message.isUser
                              ? "bg-blue-600 text-white"
                              : "bg-slate-700 text-slate-100"
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs opacity-70 mt-1">
                            {message.timestamp.toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="bg-slate-700 text-slate-100 p-3 rounded-lg">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.1s" }}
                            />
                            <div
                              className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                              style={{ animationDelay: "0.2s" }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>

                <div className="flex space-x-2 mt-4">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me about bones and fractures..."
                    className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                    disabled={isTyping}
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim() || isTyping}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIChat;
