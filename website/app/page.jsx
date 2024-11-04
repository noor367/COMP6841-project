'use client'
import { Box, Typography } from "@mui/joy";
import HeadingBodyText from "@/components/HeadingBody";
import { about } from '@/public/data.json'

export default function Home() {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: 2, md: 4 },
    }}>
      <HeadingBodyText heading='about' body={about} color='black' />
      <Typography>
        
      </Typography>
    </Box>
  );
}
