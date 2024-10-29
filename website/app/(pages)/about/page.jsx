import HeadingBodyText from '@/components/HeadingBody'
import { about } from '@/public/data.json'
import { Box } from '@mui/joy'

export default function About() {
  return (
    <Box p={5}>
      <HeadingBodyText heading='about' body={about} color='black' />
    </Box>
  )
}