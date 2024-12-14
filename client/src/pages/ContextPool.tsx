import { Outlet } from "react-router-dom";
import ToastProvider from "../components/ui/Toast";

export default function ContextPool() {
  return (
    <ToastProvider>
      <Outlet />
    </ToastProvider>
  );
}
