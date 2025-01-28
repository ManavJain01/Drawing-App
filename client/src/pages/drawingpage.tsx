import React, { useRef, useState, useEffect } from "react";
import CanvasDraw from "react-canvas-draw";
import { Box } from "@mui/material";
import {
  useGetDrawByIdMutation,
  useSaveDrawMutation,
} from "../services/drawing.api";

const Sidebar = React.lazy(() => import("../components/Drawing Page/Sidebar"));
import LazyComponent from "../components/LazyComponent";
import { toast } from "react-toastify";
import { useAppSelector } from "../store/store";

const DrawingPage: React.FC = () => {
  // useRef
  const canvasRef = useRef<CanvasDraw | null>(null);

  // uaseSelector
  const authData = useAppSelector((store) => store.auth);

  //   API Calls
  const [saveDraw] = useSaveDrawMutation();
  const [getDrawById] = useGetDrawByIdMutation();

  // useState
  const [color, setColor] = useState<string>("#000000");
  const [brushSize, setBrushSize] = useState<number>(1);
  const [tool, setTool] = useState<string>("brush"); // Current tool (brush, rectangle, circle)
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [startPoint, setStartPoint] = useState<{ x: number; y: number } | null>(
    null
  );

  //   useEffect
  useEffect(() => {
    getSavedDrawing();
  }, []);

  // Funcitons
  /**
   * Saves the current drawing from the canvas.
   * Retrieves the drawing data as a base64 string and attempts to save it using the API.
   * Displays a success or error toast notification based on the result.
   */
  const saveDrawing = async (): Promise<void> => {
    if (canvasRef.current) {
      const canvasData = canvasRef.current.getSaveData(); // Get the image as a base64 string
      try {
        await saveDraw({ drawing: canvasData });

        toast.success("Drawing Saved Successfully");
      } catch (error) {
        toast.error("Drawing Not Saved");
      }
    }
  };

  /**
   * Retrieves the saved drawing for the authenticated user and loads it into the canvas.
   * Initiates an API call to fetch the drawing data by user ID.
   * If the drawing data is successfully retrieved, it is loaded onto the canvas.
   * Displays a success toast notification if the drawing is fetched successfully,
   * or an error toast notification if the fetch operation fails.
   */
  const getSavedDrawing = async () => {
    try {
      const res = await getDrawById(authData.id);
      console.log("res: ", res);

      if (canvasRef.current && res.data.data.drawing) {
        const drawing = res.data.data.drawing;
        // Load the saved drawing data into the canvas
        canvasRef.current.loadSaveData(drawing, true);
      }

      toast.success("Drawing Fetch Successfully");
    } catch (error) {
      toast.error("Drawing Fetch Failed");
    }
  };

  /**
   * Handles the mousedown event on the canvas.
   * If the tool is a rectangle or circle, it sets the start point of the shape and
   * sets the isDrawing state to true.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event object.
   */
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (tool === "rectangle" || tool === "circle") {
      setStartPoint({ x: e.clientX, y: e.clientY });
      setIsDrawing(true);
    }
  };

  /**
   * Handles the mouseup event on the canvas.
   * If the tool is a rectangle or circle and the user is currently drawing,
   * it draws the shape based on the start and end points of the mouse event.
   * Sets the isDrawing state to false and resets the start point.
   * @param {React.MouseEvent<HTMLDivElement>} e - The mouse event object.
   */
  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (isDrawing && startPoint && canvasRef.current) {
      const ctx = canvasRef.current.ctx.drawing;
      ctx.strokeStyle = color;
      ctx.lineWidth = brushSize;

      const endX = e.clientX;
      const endY = e.clientY;

      if (tool === "rectangle") {
        ctx.strokeRect(
          startPoint.x,
          startPoint.y - 60, // Adjust for toolbar height
          endX - startPoint.x,
          endY - startPoint.y
        );
      } else if (tool === "circle") {
        const radius = Math.sqrt(
          Math.pow(endX - startPoint.x, 2) + Math.pow(endY - startPoint.y, 2)
        );
        ctx.beginPath();
        ctx.arc(
          startPoint.x,
          startPoint.y - 60, // Adjust for toolbar height
          radius,
          0,
          Math.PI * 2
        );
        ctx.stroke();
      }
    }
    setIsDrawing(false);
    setStartPoint(null);
  };

  /**
   * Undoes the last drawing operation.
   * If the canvas is available, it calls the undo method to undo the last action.
   */
  const handleUndo = (): void => {
    canvasRef.current?.undo();
  };

  /**
   * Redoes the last drawing operation.
   * If the canvas is available, it calls the redo method to redo the last action.
   */
  const handleRedo = (): void => {
    canvasRef.current?.redo();
  };

  /**
   * Clears the entire canvas.
   * If the canvas is available, it calls the clear method to remove all drawings.
   */
  const handleClear = (): void => {
    canvasRef.current?.clear();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        position: "relative",
      }}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {/* Toolbar */}
      <LazyComponent>
        <Sidebar
          brushSize={brushSize}
          tool={tool}
          setBrushSize={setBrushSize}
          setTool={setTool}
          setColor={setColor}
          handleUndo={handleUndo}
          handleRedo={handleRedo}
          handleClear={handleClear}
          saveDrawing={saveDrawing}
        />
      </LazyComponent>

      {/* Drawing Canvas */}
      <Box sx={{ flexGrow: 1, width: "100%", cursor: "crosshair" }}>
        <CanvasDraw
          ref={canvasRef}
          brushColor={tool === "brush" ? color : "transparent"} // Only use brush for freehand drawing
          brushRadius={brushSize}
          canvasWidth={window.innerWidth}
          canvasHeight={window.innerHeight - 60} // Adjust for toolbar height
          lazyRadius={0}
        />
      </Box>
    </Box>
  );
};

export default DrawingPage;
