import { MutableRefObject, useCallback } from "react";

type Props = {
  videoRef: MutableRefObject<HTMLVideoElement | null>;
  canvasRef: MutableRefObject<HTMLCanvasElement | null>;
};

export default function useVideo({ videoRef, canvasRef }: Props) {
  const startVideo = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: {} });
      if (!videoRef.current) return;
      videoRef.current.srcObject = stream;
    } catch (e) {
      console.log("User declined webcam access");
    }
  }, [videoRef]);

  const captureImage = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set fixed width and height for the canvas
    const fixedWidth = 500;
    const fixedHeight = 500;
    canvas.width = fixedWidth;
    canvas.height = fixedHeight;

    // Calculate aspect ratio of the video
    const videoAspectRatio = video.videoWidth / video.videoHeight;
    const canvasAspectRatio = fixedWidth / fixedHeight;

    let sx, sy, sWidth, sHeight;

    if (videoAspectRatio > canvasAspectRatio) {
      // Video is wider than canvas
      sHeight = video.videoHeight;
      sWidth = sHeight * canvasAspectRatio;
      sx = (video.videoWidth - sWidth) / 2;
      sy = 0;
    } else {
      // Video is taller than canvas
      sWidth = video.videoWidth;
      sHeight = sWidth / canvasAspectRatio;
      sx = 0;
      sy = (video.videoHeight - sHeight) / 2;
    }

    // Draw the video frame onto the canvas, scaled and centered
    ctx.drawImage(
      video,
      sx,
      sy,
      sWidth,
      sHeight,
      0,
      0,
      fixedWidth,
      fixedHeight
    );

    const base64Image = canvas.toDataURL("image/jpg");
    return base64Image;
  }, [videoRef, canvasRef]);

  return { captureImage, startVideo };
}
