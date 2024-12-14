import * as faceapi from "face-api.js";
import { MutableRefObject, useEffect, useRef, useState } from "react";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
  onComplete: () => void;
};

export default function useDetectFace({
  videoRef,
  canvasRef,
  onComplete,
}: Props) {
  const [faceIsCloseToCenter, setFaceIsCloseToCenter] = useState(false);
  const [loadingPercentage, setLoadingPercentage] = useState(0);
  const intervalRef = useRef<number | null>();
  const loadPercentRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const detectFaces = async () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const detectionOptions = new faceapi.TinyFaceDetectorOptions();

      intervalRef.current = setInterval(async () => {
        const displaySize = {
          width: video.getBoundingClientRect().width,
          height: video.getBoundingClientRect().height,
        };
        faceapi.matchDimensions(canvas, displaySize);
        const detection = await faceapi.detectAllFaces(video, detectionOptions);

        const resizedDetections = faceapi.resizeResults(detection, displaySize);

        const box = resizedDetections[0]?.box;
        if (box) {
          const left = box.left + box.width / 2;
          const top = box.top + box.height / 2;

          const centerX = displaySize.width / 2;
          const centerY = displaySize.height / 2;

          const cellSize = displaySize.width / 8;
          const isCloseToCenter =
            Math.abs(centerX - left) < cellSize &&
            Math.abs(centerY - top) < cellSize;

          if (loadPercentRef.current >= 1 && intervalRef.current) {
            setLoadingPercentage(0);
            loadPercentRef.current = 0;
            clearInterval(intervalRef.current);
            onComplete();
            return;
          }
          loadPercentRef.current = isCloseToCenter
            ? loadPercentRef.current + 0.05
            : 0;
          setLoadingPercentage((cur) => (isCloseToCenter ? cur + 0.05 : 0));
          setFaceIsCloseToCenter(isCloseToCenter);
        } else {
          setLoadingPercentage(0);
          setFaceIsCloseToCenter(false);
        }
      }, 100);
    };

    video.addEventListener("play", detectFaces);
    return () => {
      video.removeEventListener("play", detectFaces);
      if (!intervalRef.current) return;
      clearInterval(intervalRef.current);
    };
  }, [canvasRef, videoRef]);

  return { loadingPercentage, faceIsCloseToCenter };
}
