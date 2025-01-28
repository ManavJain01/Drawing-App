import React, { useEffect, useRef, useState } from "react";

interface DrawingCanvasProps {
  mode: "freehand" | "rectangle" | "text";
  color: string;
  text: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ mode, color, text }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const isDrawing = useRef(false);
  const startPosition = useRef({ x: 0, y: 0 });

  // Update canvas dimensions on window resize
  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const startDrawing = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      isDrawing.current = true;
      startPosition.current = {
        x: e.nativeEvent.offsetX,
        y: e.nativeEvent.offsetY,
      };

      ctx.strokeStyle = color;
      ctx.fillStyle = color; // Used for fill color

      ctx.beginPath();
      ctx.moveTo(startPosition.current.x, startPosition.current.y);
    }
  };

  const draw = (e: React.MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    if (ctx && isDrawing.current) {
      if (mode === "freehand") {
        // Freehand drawing
        ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
        ctx.stroke();
      } else if (mode === "rectangle") {
        // Drawing rectangle
        const width = e.nativeEvent.offsetX - startPosition.current.x;
        const height = e.nativeEvent.offsetY - startPosition.current.y;
        ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear previous rectangles
        ctx.strokeRect(
          startPosition.current.x,
          startPosition.current.y,
          width,
          height
        );
      }
    }
  };

  const stopDrawing = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      isDrawing.current = false;
      ctx.closePath();
    }

    if (mode === "text" && text) {
      // Draw the text when in "text" mode
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (ctx && text) {
        ctx.font = "20px Arial";
        ctx.fillText(text, startPosition.current.x, startPosition.current.y);
      }
    }
  };

  return (
    <canvas
      ref={canvasRef}
      width={dimensions.width}
      height={dimensions.height}
      style={{ border: "1px solid black", cursor: "crosshair" }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing} // Stop drawing if the mouse leaves the canvas
    />
  );
};

export default DrawingCanvas;
