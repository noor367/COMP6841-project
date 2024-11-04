'use client'
import React from 'react'
import { Typography, Stack, Box, Link } from '@mui/joy'
import Base64Encoder from '@/components/Base64Encoder'
import HeadingBodyText from '@/components/HeadingBody'
import CaesarCipher from '@/components/CaesarCipher'

function Base64Info() {
  const body = "This activity relates to OTW Krypton activity Level 0 - 1. Here is a tool that can encode/decode base64 strings. Try decipher this to give it a start: ";
  const string = "VGhleSBzYXkgYWxsIGZveGVzIGFyZSBzbGlnaHRseSBhbGxlcmdpYyB0byBsaW5vbGV1bSwgYnV0IGl0J3MgY29vbCB0byB0aGUgcGF3IC0gdHJ5IGl0LiBUaGV5IHNheSBteSB0YWlsIG5lZWRzIHRvIGJlIGRyeSBjbGVhbmVkIHR3aWNlIGEgbW9udGgsIGJ1dCBub3cgaXQncyBmdWxseSBkZXRhY2hhYmxlIC0gc2VlPyBUaGV5IHNheSBvdXIgdHJlZSBtYXkgbmV2ZXIgZ3JvdyBiYWNrLCBidXQgb25lIGRheSwgc29tZXRoaW5nIHdpbGwuIFllcywgdGhlc2UgY3JhY2tsZXMgYXJlIG1hZGUgb2Ygc3ludGhldGljIGdvb3NlIGFuZCB0aGVzZSBnaWJsZXRzIGNvbWUgZnJvbSBhcnRpZmljaWFsIHNxdWFiIGFuZCBldmVuIHRoZXNlIGFwcGxlcyBsb29rIGZha2UgLSBidXQgYXQgbGVhc3QgdGhleSd2ZSBnb3Qgc3RhcnMgb24gdGhlbS4gSSBndWVzcyBteSBwb2ludCBpcywgd2UnbGwgZWF0IHRvbmlnaHQsIGFuZCB3ZSdsbCBlYXQgdG9nZXRoZXIuIEFuZCBldmVuIGluIHRoaXMgbm90IHBhcnRpY3VsYXJseSBmbGF0dGVyaW5nIGxpZ2h0LCB5b3UgYXJlIHdpdGhvdXQgYSBkb3VidCB0aGUgZml2ZSBhbmQgYSBoYWxmIG1vc3Qgd29uZGVyZnVsIHdpbGQgYW5pbWFscyBJJ3ZlIGV2ZXIgbWV0IGluIG15IGxpZmUuIFNvIGxldCdzIHJhaXNlIG91ciBib3hlcyAtIHRvIG91ciBzdXJ2aXZhbC4=";

  return (
    <Stack>
      <Typography level='h2'>
        Base64 Tool
      </Typography>
      <Typography level='body' p={2}>{body}</Typography>
      <Box display='flex-wrap'>
        <Typography p={3}
          sx={{ whiteSpace: 'pre-wrap', overflowWrap: 'break-word', fontSize: 'large', color: 'black', backgroundColor: 'lightgrey' }}
        >
          {string}
        </Typography>
      </Box>
      <p> As a bonus, where is this quote from? </p>
      <Base64Encoder />
    </Stack>
  );
}

function Additional() {
  return (
    <Box>
      <Typography level='h1'>
        Additional Resources
      </Typography>
      <Typography level='body'>
        <Link href='https://www.cryptool.org/en/cto/'>CryptoTool</Link> - An variety of online (and downloadable) tools
        <br />
        <Link href='https://gchq.github.io/CyberChef/'>CyberChef</Link> - Online encoder/decoder for a lot of popular and common ciphers
        <br />
        <Link href='https://ctf101.org/'>CTF Handbook</Link> - Useful wiki of information
        <br />
        <Link href='https://cryptohack.org/'>CryptoHack</Link> - A learning platform with step-by-step challenges
      </Typography>
    </Box>
  )
}

export default function Resources() {
  const body = 'Here are some tools that can be used in cryptography exercises.'
  return (
    <Box direction='column' maxWidth='1800px' alignItems='center' margin='auto' pt={4} pb={10} px={10}>
      <HeadingBodyText heading={'Resources and Tools'} body={body} />
      <Base64Info />
      <CaesarCipher />
      <Additional />
    </Box>
  )
}