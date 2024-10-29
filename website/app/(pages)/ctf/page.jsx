'use client'
import { Box, Typography } from '@mui/joy';
import HeadingBodyText from '@/components/HeadingBody';
import { ctf } from '@/public/data.json'

export default function Ctf() {
  
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: 2, md: 4 },
    }}>
      <Typography variant='h1'>
        Chat TF
      </Typography>
      <HeadingBodyText heading='Chat TF?' body={ctf.explain} color='black' />
    </Box>
  );
}