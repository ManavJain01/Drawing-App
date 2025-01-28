import React, { useState, useRef } from "react";
import { Box, Button } from "@mui/material";

// The TextComponent allows adding text and dragging it
const TextComponent: React.FC<{
  x: number;
  y: number;
  text: string;
  onMove: (x: number, y: number) => void;
  onDelete: () => void;
}> = ({ x, y, text, onMove, onDelete }) => {
  // useState
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false); // State to control visibility of delete button
  const textRef = useRef<HTMLDivElement | null>(null);

  // Handle mouse down event for dragging
  /**
   * Handles the mousedown event for dragging.
   * Sets the dragging state to true and stores the initial
   * drag position relative to the text component's position.
   * @param {React.MouseEvent} e - The mouse event.
   */
  const handleMouseDown = (e: React.MouseEvent) => {
    setDragging(true);
    setDragStart({ x: e.clientX - x, y: e.clientY - y });
  };

  // Handle mouse move event for dragging
  /**
   * Handle mouse move event for dragging
   * @param {React.MouseEvent} e - mouse event
   */
  const handleMouseMove = (e: React.MouseEvent) => {
    if (dragging) {
      /**
       * Calculate the new position of the text component
       * using the current mouse position and the initial
       * drag position
       */
      const newX = e.clientX - dragStart.x;
      const newY = e.clientY - dragStart.y;
      onMove(newX, newY);
    }
  };

  // Handle mouse up event for stopping the drag
  /**
   * Handles the mouse up event for stopping the drag
   * of the text component.
   */
  const handleMouseUp = () => {
    setDragging(false);
  };

  return (
    <Box
      ref={textRef}
      sx={{
        position: "absolute",
        left: `${x}px`,
        top: `${y}px`,
        cursor: "move",
        zIndex: 10,
        userSelect: "none",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseEnter={() => setHovered(true)} // Show delete button on hover
      onMouseLeave={() => setHovered(false)} // Hide delete button when not hovered
    >
      <div
        style={{
          backgroundColor: "transparent",
          color: "#000",
          fontSize: "20px",
        }}
      >
        {text}
      </div>
      {hovered && ( // Render delete button only if hovered
        <Button
          onClick={onDelete}
          size="small"
          sx={{ fontSize: "10px", marginTop: "5px", color: "red" }}
        >
          Delete
        </Button>
      )}
    </Box>
  );
};

export default TextComponent;
