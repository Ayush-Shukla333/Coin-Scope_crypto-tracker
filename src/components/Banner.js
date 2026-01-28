import React from "react";
import { Container, Typography, Box } from "@mui/material";
import Carousel from "./Carousel";

const Banner = () => {
  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: 380, md: 400 }, // reduced height
        overflow: "hidden",
      }}
    >
      <iframe
        src="/banner.html"
        title="banner-animation"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
          zIndex: 0,
          pointerEvents: "none",
        }}
      />

      <Container
        sx={{
          position: "relative",
          zIndex: 1,
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          py: { xs: 3, md: 4 },
        }}
      >
        {/* Text block */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{
              fontFamily: "Montserrat",
              fontWeight: "bold",
              lineHeight: 1.1,
              fontSize: { xs: "2.6rem", sm: "3.4rem", md: "4rem" }, // responsive heading
              mb: 1,
            }}
          >
            Crypto Tracker
          </Typography>

          <Typography
            // variant="subtitle2"
            sx={{
              color: "darkgrey",
              // textTransform: "capitalize",
              fontFamily: "Montserrat",
              fontSize: { xs: "1rem", sm: "1.15rem", md: "1.3rem" },
              maxWidth: 700,
            }}
          >
            Track Prices, News & Trends for Your Favorite Cryptocurrencies in Real Time
          </Typography>
        </Box>

        {/* Carousel block */}
        <Box sx={{ width: "100%", maxWidth: 1100 }}>
          <Carousel />
        </Box>
      </Container>
    </Box>
  );
};

export default Banner;