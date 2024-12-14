import { useLocation, useNavigate } from "react-router-dom";
import logo from "/logo.png";
import Button from "../ui/Button";

export default function Navbar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("token");
  return (
    <nav className="fixed xl:left-[50%] xl:translate-x-[-50%] w-screen top-0 h-20 z-10 bg-white max-w-[1400px] flex items-center justify-between mx-auto px-12 py-4 max-md:px-6">
      <img src={logo} alt="logo" />
      {isLoggedIn ? (
        pathname === "/" ? (
          <Button className="py-2" onClick={() => navigate("/dashboard")}>
            Dashboard
          </Button>
        ) : (
          <Button
            variant={"secondary"}
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/");
            }}
          >
            Logout
          </Button>
        )
      ) : (
        ""
      )}
    </nav>
  );
}
