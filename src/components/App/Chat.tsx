import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  createNewConversation,
  sendMessageToAI,
  setActiveConversation,
} from "../../features/chat/chatSlice";
import ChatBubble from "./ChatBubble";
import { Mic, SendHorizontal, Menu, X } from "lucide-react";

interface ChatProps {
  onToggleSidebar: () => void;
}

const Chat = ({ onToggleSidebar }: ChatProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const { activeConversationId, messagesByConversations, isLoading } =
    useSelector((state: RootState) => state.chat);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>(
    []
  );

  // Sync local messages with Redux store based on activeConversationId
  useEffect(() => {
    if (activeConversationId && messagesByConversations[activeConversationId]) {
      const reduxMessages = messagesByConversations[activeConversationId].map(
        (msg) => ({
          text: msg.content || "",
          isUser: msg.role === "user",
        })
      );
      setMessages(reduxMessages);
    } else {
      setMessages([]);
    }
  }, [activeConversationId, messagesByConversations]);

  const handleSend = async () => {
    if (!input.trim()) return;
    if (!activeConversationId) {
      // Optionally create a new conversation if none is active
      await dispatch(createNewConversation("New Conversation"));
      return; // Wait for the next render with activeConversationId
    }

    try {
      // Dispatch the message to the Redux thunk
      await dispatch(
        sendMessageToAI({
          conversationId: activeConversationId,
          prompt: input,
        })
      );
      setInput(""); // Clear input after sending
    } catch (err) {
      console.error("Error sending message:", err);
      // Optionally handle error in UI (e.g., show toast)
    }
  };

  // Handle Enter key press for sending messages
  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const toggleSidebar = () => {
    onToggleSidebar();
  };

  return (
    <div className="flex-1 h-screen flex flex-col">
      {/* Header */}
      <div className="p-3 sm:p-4 flex justify-between items-center bg-white border-b border-gray-200 relative z-10">
        <div className="flex items-center gap-3">
          <button
            onClick={toggleSidebar}
            className="md:hidden p-2 hover:bg-gray-100 rounded-lg"
          >
            <Menu size={20} />
          </button>
          <img src="./APOLLO.svg" className="h-6 sm:h-8" alt="apollo" />
        </div>
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-300 rounded-full"></div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3 sm:space-y-5">
        {messages.length === 0 && (
          <p className="text-center text-gray-500 text-sm sm:text-base">
            Start a conversation...
          </p>
        )}
        {messages.map((msg, index) => (
          <ChatBubble key={index} message={msg.text} isUser={msg.isUser} />
        ))}
      </div>

      {/* Input Area */}
      <div className="flex items-center justify-center p-3 sm:p-4 bg-white border-t border-gray-200">
        <div className="w-full max-w-4xl flex justify-between items-center bg-white rounded-full shadow-md border border-gray-200 relative">
          <div className="relative flex-1 ml-2">
            <input
              type="text"
              placeholder="Ask anything..."
              className="w-full pr-12 pl-4 sm:pl-5 py-2 sm:py-2.5 text-sm sm:text-base text-[#484848] font-fontOne font-semibold rounded-full focus:bg-[#E6E6E6] focus:outline-none"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              disabled={isLoading}
            />
            <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              <svg
                width="20"
                height="20"
                viewBox="0 0 23 23"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 sm:w-5 sm:h-5"
              >
                <path
                  d="M18.652 5.3437C17.9926 4.62495 16.8033 4.58086 16.0108 5.37341L8.24829 13.1359C8.04704 13.3372 8.04704 13.5921 8.24829 13.7933C8.44954 13.9946 8.70445 13.9946 8.9057 13.7933L15.3265 7.37249C15.5073 7.19792 15.7494 7.10133 16.0006 7.10351C16.2519 7.10569 16.4923 7.20648 16.6699 7.38416C16.8476 7.56185 16.9484 7.80221 16.9506 8.05348C16.9528 8.30475 16.8562 8.54683 16.6816 8.72757L10.2608 15.1484C10.042 15.3736 9.7802 15.5526 9.49099 15.6748C9.20177 15.797 8.89098 15.86 8.57699 15.86C8.26301 15.86 7.95222 15.797 7.663 15.6748C7.37379 15.5526 7.11203 15.3736 6.8932 15.1484C6.66803 14.9296 6.48904 14.6678 6.36681 14.3786C6.24459 14.0894 6.18161 13.7786 6.18161 13.4646C6.18161 13.1506 6.24459 12.8398 6.36681 12.5506C6.48904 12.2614 6.66803 11.9996 6.8932 11.7808L14.6557 4.01832C16.1574 2.51566 18.5992 2.46678 20.0511 4.0327C21.5385 5.53632 21.5816 7.9657 20.0224 9.41182L10.9316 18.5026C8.83287 20.6013 5.54195 20.6013 3.4432 18.5026C1.34445 16.4038 1.34445 13.1129 3.4432 11.0142L11.2057 3.25166C11.3864 3.07709 11.6285 2.98049 11.8798 2.98268C12.1311 2.98486 12.3714 3.08565 12.5491 3.26333C12.7268 3.44101 12.8276 3.68138 12.8298 3.93265C12.832 4.18392 12.7354 4.426 12.5608 4.60674L4.79829 12.3692C3.44704 13.7205 3.44704 15.7962 4.79829 17.1475C6.14954 18.4987 8.22529 18.4987 9.57654 17.1475L18.6807 8.04332L18.7104 8.01457C19.4292 7.3562 19.4732 6.16595 18.6807 5.37341C18.6709 5.3637 18.6613 5.3538 18.652 5.3437Z"
                  fill="#484848"
                />
              </svg>
            </div>
          </div>
          <div className="bg-transparent rounded-full p-1 flex items-center mr-2 sm:mr-4 border-2 sm:border-4 border-[#CACACA]">
            <div className="bg-black p-1.5 sm:p-2 rounded-full">
              {input.length > 0 ? (
                <SendHorizontal
                  className="text-textColorSec cursor-pointer w-4 h-4 sm:w-5 sm:h-5"
                  onClick={handleSend}
                />
              ) : (
                <Mic className="text-textColorSec cursor-pointer w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
