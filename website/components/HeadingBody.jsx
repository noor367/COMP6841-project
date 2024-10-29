import React from 'react'
import { Typography, Stack } from '@mui/joy'

export default function HeadingBodyText({ heading, body, color }) {
  return (
    <Stack direction='column' maxWidth='1800px' alignItems='center' margin='auto' spacing={3} pt={4} pb={10} px={{ sm: 0, md: 5, lg: 10 }}>
      <Typography className={color} level='h1' pt={3}>
        {heading}
      </Typography>
      <Typography className={color} level='body' textAlign='center' px={3} sx={{textWrap: 'wrap'}}>
        {body}
      </Typography>
    </Stack>
  )
}