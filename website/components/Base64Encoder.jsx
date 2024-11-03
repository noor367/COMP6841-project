import React, { useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/joy';

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Base64 Encoder/Decoder
      </Typography>
      <TextField
        label="Input"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleEncode} sx={{ marginRight: 1 }}>
        Encode
      </Button>
      <Button variant="contained" onClick={handleDecode}>
        Decode
      </Button>

      {encoded && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Encoded:</Typography>
          <Typography>{encoded}</Typography>
        </Box>
      )}
      {decoded && (
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h6">Decoded:</Typography>
          <Typography>{decoded}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default Base64Encoder;