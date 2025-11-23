// Footer.tsx
import { Box, Typography, Link, Stack } from "@mui/material";

const FooterBar: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#22222a",
        borderRadius: 4,
        color: "text.primary",
        py: 4,
        mt: 8,
      }}
    >
      {/* Container */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={4}
        justifyContent="space-between"
        alignItems={{ xs: "center", sm: "flex-start" }}
        sx={{ maxWidth: 1200, mx: "auto", px: 3 }}
      >
        {/* Brand */}
        <Box textAlign={{ xs: "center", sm: "left" }}>
          <Typography variant="h6" fontWeight="bold">
            Motorsports website
          </Typography>
          <Typography variant="body2">
            Passion for racing. Engineered for performance.
          </Typography>
        </Box>

        {/* Links */}
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Quick Links
          </Typography>

          <Link href="/" color="grey.300" underline="hover">
            <Typography variant="subtitle2">Home</Typography>
          </Link>
          <Link href="/teams" color="grey.300" underline="hover">
            <Typography variant="subtitle2">Teams</Typography>
          </Link>
          <Link href="/TrackModel" color="grey.300" underline="hover">
            <Typography variant="subtitle2">3D Model</Typography>
          </Link>
        </Stack>

        {/* Socials */}
        <Stack spacing={1}>
          <Typography variant="subtitle1" fontWeight="bold">
            Follow Us
          </Typography>

          <Link href="#" color="grey.300" underline="hover">
            <Typography variant="subtitle2">Instagram</Typography>
          </Link>
          <Link href="#" color="grey.300" underline="hover">
            <Typography variant="subtitle2">Facebook</Typography>
          </Link>
          <Link href="#" color="grey.300" underline="hover">
            <Typography variant="subtitle2">Reddit</Typography>
          </Link>
        </Stack>
      </Stack>

      {/* Bottom line */}
      <Typography variant="body2" textAlign="center" mt={4} color="grey.500">
        © {new Date().getFullYear()} Motorsports website. All rights reserved.
      </Typography>
    </Box>
  );
};

export default FooterBar;
