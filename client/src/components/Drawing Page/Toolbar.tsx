import React from "react";
import { ToggleButtonGroup, ToggleButton } from "@mui/material";

interface ToolbarProps {
  onModeChange: (mode: "freehand" | "rectangle" | "text") => void;
  onColorChange: (color: string) => void;
  onTextChange: (text: string) => void;
  text: string;
  mode: "freehand" | "rectangle" | "text";
}

const Toolbar: React.FC<ToolbarProps> = ({
  onModeChange,
  onColorChange,
  onTextChange,
  text,
  mode,
}) => {
  return (
    <div style={{ display: "flex", gap: "10px", marginBottom: "10px" }}>
      <ToggleButtonGroup
        exclusive
        onChange={(_, value) => onModeChange(value)}
        aria-label="drawing modes"
      >
        <ToggleButton value="freehand">Freehand</ToggleButton>
        <ToggleButton value="rectangle">Rectangle</ToggleButton>
        <ToggleButton value="text">Text</ToggleButton>
      </ToggleButtonGroup>

      {/* Color Picker */}
      <input
        type="color"
        onChange={(e) => onColorChange(e.target.value)}
        style={{ marginTop: "10px" }}
        aria-label="Color Picker"
      />

      {/* Text Input for "text" mode */}
      {mode === "text" && (
        <input
          type="text"
          value={text}
          onChange={(e) => onTextChange(e.target.value)}
          placeholder="Enter text"
          style={{ marginTop: "10px" }}
        />
      )}
    </div>
  );
};

export default Toolbar;
