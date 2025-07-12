import { Search, Plus, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { logOutUser } from "../../features/auth/authSlice";
import {
  createNewConversation,
  setActiveConversation,
} from "../../features/chat/chatSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { format, isToday, isThisWeek } from "date-fns";

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { conversations, activeConversationId, isLoading } = useSelector(
    (state: RootState) => state.chat
  );

  const handleNewConversation = async () => {
    try {
      await dispatch(createNewConversation("New Conversation")).unwrap();
      toast.success("New conversation created!");
      // Close sidebar on mobile after creating conversation
      if (window.innerWidth < 768) {
        onClose();
      }
    } catch (error) {
      toast.error("Failed to create new conversation");
      console.error("Error creating conversation:", error);
    }
  };

  const handleLogOut = async () => {
    try {
      await dispatch(logOutUser()).unwrap();
      toast.success("Logged out successfully!");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed!");
      console.error("Error logging out:", error);
    }
  };

  const handleSelectConversation = (conversationId: string) => {
    dispatch(setActiveConversation(conversationId));
    // Close sidebar on mobile after selecting conversation
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  // Group conversations by date
  const groupConversationsByDate = () => {
    const grouped: { [key: string]: any[] } = {};
    conversations.forEach((conv) => {
      const date = new Date(conv.created_at || new Date());
      let groupKey = "";
      if (isToday(date)) {
        groupKey = `Today - ${format(date, "EEEE, MMMM d, yyyy")}`;
      } else if (isThisWeek(date)) {
        groupKey = format(date, "EEEE - MMMM d, yyyy");
      } else {
        groupKey = format(date, "MMMM d, yyyy");
      }
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      grouped[groupKey].push(conv);
    });
    return grouped;
  };

  const groupedConversations = groupConversationsByDate();

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
        fixed md:relative top-0 left-0 z-50 md:z-auto
        w-80 max-w-[85vw] md:max-w-none h-screen 
        bg-textColorSec pl-4 pr-4 pb-4 pt-6 sm:pt-8 
        overflow-y-auto transform transition-transform duration-300 ease-in-out
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        md:translate-x-0 md:block
      `}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4 sm:mb-5">
          <img src="./APOLLO.svg" className="h-6 sm:h-8" alt="apollo" />
          <div className="flex items-center gap-2">
            <Plus
              size={20}
              className="cursor-pointer hover:bg-gray-200 rounded p-1"
              onClick={handleNewConversation}
            />
            <button
              onClick={onClose}
              className="md:hidden p-1 hover:bg-gray-200 rounded"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Search */}
        <div className="mb-4">
          <div className="relative items-center">
            <input
              type="text"
              placeholder="Search"
              className="w-full p-2 pl-8 rounded-md bg-black text-textColorSec placeholder:text-textColorSec text-sm"
            />
            <Search className="absolute left-2 top-[11px] h-4 w-4 text-textColorSec" />
          </div>
        </div>

        {/* Conversations */}
        <div className="space-y-2 flex-1">
          {Object.entries(groupedConversations).map(([date, convs]) => (
            <div key={date}>
              <p className="text-xs sm:text-sm text-black font-semibold mb-2 truncate">
                {date}
              </p>
              {convs.map((conv) => (
                <div
                  key={conv.id}
                  className={`bg-black text-white p-2 rounded-md flex justify-between items-center cursor-pointer mb-1 hover:bg-gray-800 transition-colors ${
                    activeConversationId === conv.id
                      ? "ring-2 ring-blue-500"
                      : ""
                  }`}
                  onClick={() => handleSelectConversation(conv.id)}
                >
                  <p className="text-sm truncate flex-1 mr-2">{conv.title}</p>
                  <span className="text-xs text-textColorSec whitespace-nowrap">
                    {format(new Date(conv.created_at || new Date()), "h:mma")}
                  </span>
                </div>
              ))}
            </div>
          ))}
          {conversations.length === 0 && (
            <p className="text-sm text-gray-500">No conversations yet</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2 mt-5 pt-4 border-t border-gray-300">
          <button
            className="p-2 text-textColorSec bg-textColor font-fontOne rounded-md font-normal text-sm sm:text-[16px] hover:bg-gray-800 transition-colors"
            onClick={() => {
              navigate("/about");
              if (window.innerWidth < 768) onClose();
            }}
          >
            About
          </button>
          <button
            onClick={handleLogOut}
            className="p-2 text-textColorSec bg-textColor font-fontOne rounded-md font-normal text-sm sm:text-[16px] hover:bg-gray-800 transition-colors disabled:opacity-50"
            disabled={isLoading}
          >
            Log out
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
