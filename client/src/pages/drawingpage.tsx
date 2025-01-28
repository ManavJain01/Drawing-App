import React, { useState } from "react";
import LazyComponent from "../components/LazyComponent";
import { Box } from "@mui/material";

const Toolbar = React.lazy(() => import("../components/Drawing Page/Toolbar"));
const DrawingCanvas = React.lazy(
  () => import("../components/Drawing Page/DrawingCanvas")
);

export default function DrawingPage() {
  const [mode, setMode] = useState<"freehand" | "rectangle" | "text">(
    "freehand"
  );
  const [color, setColor] = useState<string>("#000000");
  const [text, setText] = useState<string>("");

  return (
    <Box>
      <LazyComponent>
        <Toolbar
          onModeChange={setMode}
          onColorChange={setColor}
          onTextChange={setText}
          text={text}
          mode={mode}
        />
      </LazyComponent>
      <LazyComponent>
        <DrawingCanvas mode={mode} color={color} text={text} />
      </LazyComponent>
    </Box>
  );
}
