import { useNavigate } from "react-router-dom";

export default function TakePictureCTA() {
  const navigate = useNavigate();

  return (
    <li
      className="cursor-pointer hover:opacity-75 transition-all duration-200 p-3 rounded-md shadow-[0_0_1rem_0.5rem_rgba(0,0,0,0.025)] bg-gradient-to-r from-[#E5FAFF] to-[#FFE1FA]"
      onClick={() => navigate("/face-capture")}
    >
      <div className="px-6 py-7 flex items-center gap-8 border-[2px] border-slate-300 rounded-md border-dashed max-sm:flex-col max-sm:items-start max-sm:gap-4">
        <i className="bx bx-camera text-[3.5rem]"></i>
        <div>
          <h2 className="text-2xl font-semibold text-slate-800">
            Take Picture
          </h2>
          <p className="text-slate-400 mt-1">
            Use you device’s camera to take a photo
          </p>
        </div>
      </div>
    </li>
  );
}
