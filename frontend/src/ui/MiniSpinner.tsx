import { Ring } from "ldrs/react";
import "ldrs/react/Ring.css";

const MiniLoader = () => {
  return (
    <div className="flex items-center justify-center">
      <Ring size="25" stroke="3" bgOpacity="0" speed="3" color="white" />
    </div>
  );
};

export default MiniLoader;
