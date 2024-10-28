import { Box, Typography, Stack, Sheet } from '@mui/joy';
import Link from 'next/link';
import Image from 'next/image';
import {socialsData} from '@/app/data';
import React from 'react';

export default function Footer() {
  return (
    <Sheet>
      <Box className='bg-dark-blue' py={2} px={4} />
    </Sheet>
  );
}