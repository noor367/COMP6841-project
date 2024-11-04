import React, { useState } from 'react';
import { Box, Button, Input, Typography } from '@mui/joy';

const Base64Encoder = () => {
  const [input, setInput] = useState('');
  const [encoded, setEncoded] = useState('');
  const [decoded, setDecoded] = useState('');

  const handleEncode = () => {
    const base64Encoded = btoa(input);
    setEncoded(base64Encoded);
    setDecoded(''); // Clear previous decoded value
  };

  const handleDecode = () => {
    try {
      const base64Decoded = atob(input);
      setDecoded(base64Decoded);
      setEncoded(''); // Clear previous encoded value
    } catch (error) {
      setDecoded('Invalid Base64 string');
    }
  };

  return (
    <Box p={2}>
      <Typography level="h4" gutterBottom>
        Base64 Encoder/Decoder
      </Typography>
      <Input
        placeholder="Input"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ marginBottom: 2, height: '56px', fontSize: '1.2rem' }} // Increased height and font size
      />
      <Button variant="contained" onClick={handleEncode} sx={{ marginRight: 1 }}>
        Encode
      </Button>
      <Button variant="contained" onClick={handleDecode}>
        Decode
      </Button>

      {encoded && (
        <Box 
          sx={{ 
            marginTop: 2, 
            padding: 2, 
            border: '1px solid', 
            borderColor: 'grey.400', 
            borderRadius: '4px'
          }}
        >
          <Typography level='h5'>Encoded:</Typography>
          <Typography>{encoded}</Typography>
        </Box>
      )}
      {decoded && (
        <Box 
          sx={{ 
            marginTop: 2, 
            padding: 2, 
            border: '1px solid', 
            borderColor: 'grey.400', 
            borderRadius: '4px'
          }}
        >
          <Typography level='h5'>Decoded:</Typography>
          <Typography level='body'>{decoded}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Base64Encoder;