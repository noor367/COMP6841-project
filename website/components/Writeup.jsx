import React from 'react'
import { Typography, Stack, Accordion, AccordionSummary, AccordionDetails } from '@mui/joy'

export default function Writeup({ heading, background, challenge, answer }) {
  return (
    <Stack direction='column' maxWidth='1800px' alignItems='center' margin='auto' spacing={3} pt={4} pb={10} px={{ sm: 0, md: 5, lg: 10 }}>
      <Typography level='h1' pt={3}>
        {heading}
      </Typography>
      <Typography level='h2' pt={3}>
        Technical Background
      </Typography>
      <Typography level='body' pt={3}>
        {background}
      </Typography>
      <Typography level='h2' textAlign='center' px={3} sx={{textWrap: 'wrap'}}>
        Challenge
      </Typography>
      <Typography level='body' textAlign='center' px={3} sx={{textWrap: 'wrap'}}>
        {challenge}
      </Typography>
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowDropDownIcon />}
        >
          <Typography>Reveal Walkthrough</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            {answer}
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Stack>
  )
}