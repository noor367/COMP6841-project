import React from 'react'
import { Typography, Stack } from '@mui/joy'

export default function HeadingBodyText({ heading, body }) {
  return (
    <Stack direction='column' alignItems='center' margin='auto' spacing={3} pt={4} pb={10}>
      <Typography level='h1' pt={3}>
        {heading}
      </Typography>
      <Typography level='body' textAlign='left' sx={{textWrap: 'wrap'}}>
        {body}
      </Typography>
    </Stack>
  )
}