import { Outlet } from "react-router-dom";
import Navbar from "../components/general/Navbar";

export default function AppLayout() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="max-w-[1400px] mx-auto px-12 max-md:px-6 min-w-0">
        <Outlet />
      </main>
    </div>
  );
}
