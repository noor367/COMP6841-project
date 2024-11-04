import { Box, Link, Typography } from '@mui/joy';
import HeadingBodyText from '@/components/HeadingBody';
import { krypton } from '@/public/data.json'
import { Level0, Level1, Level2, Level3, Level4, Level5 } from '@/components/KryptonWriteups';

export default function Otw() {
  const note = 'IMPORTANT TO NOTE: If you are using these writeups as a guide to your own progress, please ensure you double check the host names and port numbers before you try to connect to anything. The information at the time you are reading this may not be the same information that was there when I was completing these tasks.'
  return (
    <Box direction='column' maxWidth='1800px' alignItems='center' margin='auto' pt={4} pb={10} px={10}>
      <HeadingBodyText heading='OverTheWire - Krypton' body={krypton} color='black' />
      <p>
        IMPORTANT TO NOTE: If you are using these writeups as a guide to your own progress, please ensure you double check the host names and port numbers before you try to connect to anything.The information at the time you are reading this may not be the same information that was there when I was completing these tasks.
      </p>
      <Link href='https://overthewire.org/wargames/krypton/krypton0.html' fontSize={'large'} py={5}>Link to OverTheWire</Link>
      <Level0 />
      <Level1 />
      <Level2 />
      <Level3 />
      <Level4 />
      <Level5 />
    </Box>
  );
}