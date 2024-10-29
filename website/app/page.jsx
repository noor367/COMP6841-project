'use client'
import { Box, Typography } from "@mui/joy";
import HeadingBodyText from "@/components/HeadingBody";

export default function Home() {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: 2, md: 4 },
    }}>
      <HeadingBodyText heading='Cryptography' body='hello' color='black' />
    </Box>
  );
}
