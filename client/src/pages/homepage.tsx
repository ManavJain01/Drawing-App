import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "../store/store";
import { motion } from "framer-motion";

// Feature icons (you can replace these with your own icons)
import BrushIcon from "@mui/icons-material/Brush";
import ColorLensIcon from "@mui/icons-material/ColorLens";
import LayersIcon from "@mui/icons-material/Layers";

const HomePage: React.FC = () => {
  const { t } = useTranslation();
  const authdata = useAppSelector((store) => store.auth);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 4,
        textAlign: "center",
        p: 3,
        // background: "linear-gradient(135deg, #6E7E8D, #D9D6D2)", // Subtle gradient background
      }}
    >
      {/* Hero Section with Animated Heading */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <Typography variant="h3" component="h1" gutterBottom>
          {t("home page.welcome")}
        </Typography>
      </motion.div>

      {/* Description */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
      >
        <Typography variant="h6" gutterBottom>
          {t("home page.description")}
        </Typography>
      </motion.div>

      {/* Feature Icons Section */}
      <Grid container spacing={4} justifyContent="center">
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          >
            <BrushIcon sx={{ fontSize: 40, color: "#6E7E8D" }} />
            <Typography variant="body1">Brush Tool</Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            <ColorLensIcon sx={{ fontSize: 40, color: "#6E7E8D" }} />
            <Typography variant="body1">Color Palette</Typography>
          </motion.div>
        </Grid>
        <Grid item xs={12} sm={4}>
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
          >
            <LayersIcon sx={{ fontSize: 40, color: "#6E7E8D" }} />
            <Typography variant="body1">Layering</Typography>
          </motion.div>
        </Grid>
      </Grid>

      {/* Call to Action */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 1 }}
      >
        <Button variant="outlined" component={Link} to="/drawing">
          Start Drawing
        </Button>
      </motion.div>

      {/* Conditional Button for Non-Authenticated Users */}
      {!authdata.isAuthenticated && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
        >
          <Button variant="outlined" component={Link} to="/signup">
            Get Started
          </Button>
        </motion.div>
      )}
    </Box>
  );
};

export default HomePage;
