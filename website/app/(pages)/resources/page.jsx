import React from 'react'
import { Typography, Stack, Box } from '@mui/joy'
import Base64Encoder from '@/components/Base64Encoder'
import HeadingBodyText from '@/components/HeadingBody'

function base64Info() {
  return (
    <Stack>
      This activity relates to OTW Krypton activity Level 0 - 1.
      Here is a tool that can encode/decode base64 strings.
      Try decipher this to give it a start: 
      <Base64Encoder />
    </Stack>
  )
}

function Additional() {
  return (
    <Box>
      <Typography variant='h1'>
        Additional Resources
      </Typography>
      <Typography variant='body'>
        [CryptoTool](https://www.cryptool.org/en/cto/) - An variety of online (and downloadable) tools
        [CyberChef](https://gchq.github.io/CyberChef/) - Online encoder/decoder for a lot of popular and common ciphers
        [CTF Handbook](https://ctf101.org/) - Useful wiki of information
      </Typography>
    </Box>
  )
}

export default function Resources() {
  const body = 'Here are some tools that can be used in cryptography exercises.'
  return (
    <Stack>
      <HeadingBodyText heading={'Resources and Tools'} body={body} />
      <base64Info />
      <Additional />
    </Stack>
  )
}