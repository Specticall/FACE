import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { cn } from "../../lib/utils";

type TToastContextValues = {
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
  };
};

const ToastContext = createContext<TToastContextValues | null>(null);

/*
 * ToastProvider is a context provider that provides a function to display a Toast message.
 * The Toast message is displayed at the bottom of the screen and disappears after a specified amount of time.
 * The message can be displayed using the `toast()` function.
 *
 * Self implementation of the popular library `react-toastify` to display Toast messages.
 */
export default function ToastProvider({
  children,
  suspendDuration = 2000,
}: {
  children: ReactNode;
  suspendDuration?: number;
}) {
  const [message, setMessage] = useState("Default Toast Message");

  // Used to differentiate calls from `toast()`. Without this, a call from `toast()` with the same message won't trigger the timeout effect.
  const [id, setId] = useState(0);

  const [show, setShow] = useState(false);
  const [type, setType] = useState<"success" | "error">("success");

  // Suspends / display the Toast for a specified amount of time.
  useEffect(() => {
    const suspend = setTimeout(() => {
      setShow(false);
    }, suspendDuration);

    return () => {
      clearTimeout(suspend);
    };
  }, [suspendDuration, message, id]);

  /**
   * Displays the Toast window with the message inside.
   */
  const toast = useMemo(() => {
    return {
      success(message: string) {
        setMessage(message);
        setId(Math.random());
        setShow(true);
        setType("success");
      },
      error(message: string) {
        setMessage(message);
        setId(Math.random());
        setShow(true);
        setType("error");
      },
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      <div
        className={cn(
          "fixed bottom-0 right-8 z-[100] translate-y-[-2rem] text-brown bg-bg text-start flex justify-between items-center pl-5 pr-4 py-2 rounded-md shadow-lg shadow-main/30 transition-all duration-500 max-md:w-fit max-md:x-4 max-md:text-center w-fit border-brown border-[1px] max-md:right-0 max-md:left-[50%] max-md:translate-x-[-50%] whitespace-nowrap gap-4 ",
          type === "error" && "bg-red-500 border-red-400 text-white"
        )}
        style={{
          translate: show ? "0 0" : "0 300%",
        }}
      >
        {message}
        {/* {type === "success" ? (
          <i className="text-2xl text-highlight bx bxs-check-square"></i>
        ) : (
          <i className="text-2xl text-white bx bxs-x-square"></i>
        )} */}
      </div>
      {children}
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context)
    throw new Error("useToast can't be used outside of its provider's scope");
  return context;
}
