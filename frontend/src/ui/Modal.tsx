import {
  cloneElement,
  createContext,
  useContext,
  useState,
  useRef,
  useEffect,
} from "react";
import type { ReactNode, ReactElement } from "react";
import { createPortal } from "react-dom";

// 1. Define TypeScript interfaces for type safety
interface ModalContextType {
  close: () => void;
  openName: string;
  open: (name: string) => void;
}

interface ModalProps {
  children: ReactNode;
}

interface OpenProps {
  children: ReactElement<any>; // More flexible typing for cloneElement
  opens: string;
}

interface WindowProps {
  children: ReactNode;
  name: string;
}

// 2. Create context with proper typing
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// 3. Custom hook for using the modal context
const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a Modal provider");
  }
  return context;
};

// 4. Custom hook for outside click detection
const useOutsideClick = (handler: () => void) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        handler();
      }
    };

    document.addEventListener("mousedown", handleClick, true);
    return () => document.removeEventListener("mousedown", handleClick, true);
  }, [handler]);

  return ref;
};

// 5. Main Modal component
const Modal: React.FC<ModalProps> & {
  Open: React.FC<OpenProps>;
  Window: React.FC<WindowProps>;
} = ({ children }) => {
  const [openName, setOpenName] = useState<string>("");

  const close = (): void => setOpenName("");
  const open = (name: string): void => setOpenName(name);

  return (
    <ModalContext.Provider value={{ close, openName, open }}>
      {children}
    </ModalContext.Provider>
  );
};

// 6. Open component - triggers modal opening
function Open({ children, opens }: OpenProps): ReactElement {
  const { open } = useModal();

  return cloneElement(children, {
    onClick: () => open(opens),
  });
}

// 7. Window component - the actual modal content
function Window({ children, name }: WindowProps): ReactElement | null {
  const { openName, close } = useModal();
  const ref = useOutsideClick(close);

  if (name !== openName) return null;

  return createPortal(
    <div className="fixed inset-0 w-full h-screen transition-all duration-500 bg-[#0000004D] backdrop-blur-[4px] z-[1000] flex items-center justify-center p-4">
      <div
        ref={ref}
        className="bg-[#EAE3D1] p-6 max-w-md w-[497.31px] h-[400px] rounded-[36.15px] shadow-xl transform transition-all duration-300 scale-100 flex flex-col items-center justify-center"
      >
        {children}
      </div>
    </div>,
    document.body
  );
}

// 8. Attach sub-components to main component
Modal.Open = Open;
Modal.Window = Window;

export default Modal;
