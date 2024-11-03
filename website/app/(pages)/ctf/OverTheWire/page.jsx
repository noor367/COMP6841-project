import { Box, Typography } from '@mui/joy';
import HeadingBodyText from '@/components/HeadingBody';
import { krypton } from '@/public/data.json'

function level0() {
  <Box>
    <Typography variant='h2'>
      Level 0-1
    </Typography>
    <Typography variant='body'>
      Welcome to Krypton! The first level is easy. The following string encodes the password using Base64:
      <code>S1JZUFRPTklTR1JFQVQ=</code>
      Use this password to log in to krypton.labs.overthewire.org with username krypton1 using SSH on port 2231.
      You can find the files for other levels in /krypton/
    </Typography>
    <Typography variant='h3'>
      Helpful Information
    </Typography>
    <Typography>
      
    </Typography>
  </Box>
}

export default function Otw() {
  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      padding: { xs: 2, md: 4 },
    }}>
      <HeadingBodyText heading='OverTheWire - Krypton' body={krypton} color='black' />
      <a href='https://overthewire.org/wargames/krypton/krypton0.html'>Link to OverTheWire</a>
      <level0 />
    </Box>
  );
}