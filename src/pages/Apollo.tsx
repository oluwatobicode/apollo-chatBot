import Sidebar from "../components/App/Sidebar";
import Chat from "../components/App/Chat";
import { useState } from "react";

const Apollo = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleCloseSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="chat flex h-screen">
      <Sidebar isOpen={isSidebarOpen} onClose={handleCloseSidebar} />
      <Chat onToggleSidebar={handleToggleSidebar} />
    </div>
  );
};
export default Apollo;
