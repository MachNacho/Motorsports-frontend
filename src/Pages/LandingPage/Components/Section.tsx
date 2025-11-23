import { Box, Typography } from "@mui/material";

interface SectionProps {
  title: string;
  text: string;
  img: string;
  imgLeft?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, text, img, imgLeft }) => {
  return (
    <Box sx={{ mb: 4 }}>
      {/* Section Heading */}
      <Typography variant="h4" color="white" sx={{ mb: 2, fontWeight: 600 }}>
        {title}
      </Typography>

      {/* Image + Text Layout */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: imgLeft ? "row" : "row-reverse" },
          gap: 2,
          alignItems: "center",
        }}
      >
        {/* Image */}
        <Box
          component="img"
          src={img}
          alt={`${title} image`}
          sx={{
            width: { xs: "100%", md: "35%" },
            borderRadius: 2,
            objectFit: "cover",
          }}
        />

        {/* Text */}
        <Typography
          sx={(theme) => ({
            ...theme.typography.body1,
            color: "white",
            lineHeight: 1.6,
            fontSize:25
          })}

        >
          {text}
        </Typography>
      </Box>
    </Box>
  );
};

export default Section;
