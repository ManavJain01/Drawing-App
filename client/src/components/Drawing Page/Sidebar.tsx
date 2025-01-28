import React, { useState } from "react";
import {
  Box,
  IconButton,
  Slider,
  TextField,
  Toolbar,
  Typography,
  InputAdornment,
  Drawer,
  Button,
} from "@mui/material";
import {
  ColorLens,
  Undo,
  Redo,
  Clear,
  Brush,
  CropSquare,
  Circle,
  Menu,
} from "@mui/icons-material";

const Sidebar: React.FC = ({
  brushSize,
  tool,
  setBrushSize,
  setTool,
  setColor,
  handleUndo,
  handleRedo,
  handleClear,
  saveDrawing,
}) => {
  const [open, setOpen] = useState(true); // State to control the sidebar visibility

  /**
   * Toggles the visibility of the sidebar.
   * When called, it will switch the sidebar between open and closed states.
   */
  const toggleSidebar = () => {
    setOpen(!open); // Toggle the sidebar visibility
  };

  if (!open)
    return (
      <IconButton
        onClick={toggleSidebar}
        sx={{
          position: "absolute",
          left: 20,
          top: 10,
          zIndex: 1300, // Higher z-index to ensure it's above other elements
        }}
      >
        <Menu />
      </IconButton>
    );
  else
    return (
      <Box sx={{ display: "flex" }}>
        {/* Sidebar Drawer */}
        <Drawer
          variant="persistent"
          anchor="left"
          open={open}
          sx={{
            width: 240,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 240,
              boxSizing: "border-box",
            },
          }}
        >
          <Toolbar
            sx={{ backgroundColor: "#f1f1f1", justifyContent: "space-between" }}
          >
            <Typography variant="h6">Drawing Page</Typography>
            <IconButton onClick={toggleSidebar}>
              <Clear />
            </IconButton>
          </Toolbar>

          <Box sx={{ padding: 2 }}>
            {/* Color Picker */}
            <TextField
              type="color"
              onChange={(e) => setColor(e.target.value)}
              label="Color"
              size="small"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <ColorLens fontSize="small" />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 100, marginBottom: 2 }}
            />

            {/* Undo/Redo */}
            <IconButton onClick={handleUndo} sx={{ marginRight: 1 }}>
              <Undo />
            </IconButton>
            <IconButton onClick={handleRedo} sx={{ marginRight: 1 }}>
              <Redo />
            </IconButton>

            {/* Brush Size */}
            <Slider
              value={brushSize}
              onChange={(e) => setBrushSize(e.target.value as number)}
              min={1}
              max={20}
              step={1}
              valueLabelDisplay="auto"
              sx={{ width: "100%", marginBottom: 2 }}
            />

            {/* Clear Canvas */}
            <IconButton onClick={handleClear} sx={{ marginBottom: 2 }}>
              <Clear />
            </IconButton>

            {/* Tools */}
            <IconButton
              color={tool === "brush" ? "primary" : "default"}
              onClick={() => setTool("brush")}
              sx={{ marginBottom: 2 }}
            >
              <Brush />
            </IconButton>
            <IconButton
              color={tool === "rectangle" ? "primary" : "default"}
              onClick={() => setTool("rectangle")}
              sx={{ marginBottom: 2 }}
            >
              <CropSquare />
            </IconButton>
            <IconButton
              color={tool === "circle" ? "primary" : "default"}
              onClick={() => setTool("circle")}
              sx={{ marginBottom: 2 }}
            >
              <Circle />
            </IconButton>
          </Box>

          <Button
            sx={{
              marginTop: "auto",
              background: "linear-gradient(45deg, green, lightgreen)",
              borderRadius: "30px",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              padding: "10px",
              marginX: "20px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
              transition: "all 0.3s ease",
              "&:hover": {
                boxShadow: "0 6px 12px rgba(0, 0, 0, 0.3)",
                transform: "translateY(-3px)",
              },
            }}
            onClick={saveDrawing}
          >
            Save Drawing
          </Button>
        </Drawer>
      </Box>
    );
};

export default Sidebar;
