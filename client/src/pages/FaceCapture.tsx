import * as faceapi from "face-api.js";
import { useEffect, useRef } from "react";
import useVideo from "../hooks/useVideo";
import useDetectFace from "../hooks/useDetectFace";
import { cn } from "../lib/utils";
import useDiagnosisMutation from "../hooks/diagnosis/useDiagnosisMutation";
import LoadingSpinner from "../components/ui/LoadingSpinner";
import { useNavigate } from "react-router-dom";
import AnalyzingDataLoadingScreen from "./AnalyzingDataLoadingScreen";

export default function FaceCapture() {
  const videoRef = useRef<null | HTMLVideoElement>(null);
  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const diagnosisMutation = useDiagnosisMutation();
  const navigate = useNavigate();

  const { captureImage, startVideo } = useVideo({ videoRef, canvasRef });
  const { faceIsCloseToCenter } = useDetectFace({
    videoRef,
    canvasRef,
    onComplete: () => {
      if (diagnosisMutation.isPending) return;
      const base64Image = captureImage();
      if (!base64Image) return;
      diagnosisMutation.mutate({ base64_image: base64Image });
    },
  });

  useEffect(() => {
    const load = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri("/models");
      startVideo();
    };
    load();
  }, [startVideo]);

  if (diagnosisMutation.isPending) {
    return <AnalyzingDataLoadingScreen />;
  }

  return (
    <div className="flex items-center justify-center flex-col w-full mt-12 max-w-[1400px] mx-auto gap-12 max-md:gap-4">
      <div className="text-center flex flex-col items-center justify-center">
        <div
          className="col-span-2 flex items-center mb-8 hover:opacity-40 transition-all duration-100 cursor-pointer"
          onClick={() => navigate("/dashboard")}
        >
          <i className="bx bx-chevron-left text-2xl"></i>
          Go Back
        </div>
        <h1 className="text-[clamp(2rem,5vw,3.5rem)] leading-[125%] mb-3 font-semibold">
          {faceIsCloseToCenter
            ? "Taking A Picture of You..."
            : "Position Your Face at the Rectangle"}
        </h1>
        <p className="text-slate-400">
          {faceIsCloseToCenter
            ? "Please stay still until this process is completed"
            : "We will take the picture automatically after you have positioned your face correctly"}
        </p>
      </div>
      <div className="w-full h-full overflow-hidden grid place-items-center py-8 max-h-[30rem] max-w-[40rem]">
        <div className="relative w-full h-fit overflow-hidden">
          <div
            className={cn(
              "w-[50%] h-[50%] absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%] border-[0.25rem] border-white rounded-md transition-all duration-200 grid place-items-center",
              faceIsCloseToCenter && "border-emerald-300"
            )}
          >
            <div
              className={cn("opacity-0", faceIsCloseToCenter && "opacity-100")}
            >
              <LoadingSpinner
                className={cn("border-white border-b-transparent")}
                size={"3xl"}
              />
            </div>
          </div>
          <video ref={videoRef} autoPlay muted className="w-full rounded-xl" />
          <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
        </div>
      </div>
    </div>
  );
}
