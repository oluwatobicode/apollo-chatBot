interface chatProp {
  message: string;
  isUser: boolean;
}

const ChatBubble = ({ message, isUser }: chatProp) => {
  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      } mb-3 sm:mb-4`}
    >
      <div
        className={`max-w-[85%] sm:max-w-[75%] lg:max-w-[535px] p-2.5 sm:p-3 text-xs sm:text-sm lg:text-[14px] ${
          isUser
            ? "bg-black font-medium font-fontOne text-white rounded-tl-[30px] sm:rounded-tl-[68.9px] rounded-br-[0px] rounded-tr-[20px] sm:rounded-tr-[41.34px] rounded-bl-[30px] sm:rounded-bl-[68.9px]"
            : "bg-white font-medium font-fontOne text-black rounded-tl-[0px] rounded-bl-[15px] sm:rounded-bl-[31.5px] rounded-tr-[25px] sm:rounded-tr-[52.5px] rounded-br-[25px] sm:rounded-br-[52.5px] shadow-sm border border-gray-100"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
