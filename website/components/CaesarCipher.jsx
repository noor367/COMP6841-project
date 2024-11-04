import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Stack } from '@mui/joy';

const CaesarCipher = () => {
  const [input, setInput] = useState('');
  const [shift, setShift] = useState(1);
  const [output, setOutput] = useState('');

  const caesarCipher = (text, shiftAmount, isDecode = false) => {
    const shift = isDecode ? -shiftAmount : shiftAmount;
    return text.replace(/[a-zA-Z]/g, (char) => {
      const baseCode = char >= 'a' ? 97 : 65;
      return String.fromCharCode(
        ((char.charCodeAt(0) - baseCode + shift + 26) % 26) + baseCode
      );
    });
  };

  const handleEncode = () => {
    setOutput(caesarCipher(input, parseInt(shift)));
  };

  const handleDecode = () => {
    setOutput(caesarCipher(input, parseInt(shift), true));
  };

  return (
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        Caesar Cipher Encoder/Decoder
      </Typography>
      <TextField
        label="Input Text"
        variant="outlined"
        fullWidth
        value={input}
        onChange={(e) => setInput(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <TextField
        label="Shift Amount"
        type="number"
        variant="outlined"
        value={shift}
        onChange={(e) => setShift(e.target.value)}
        sx={{ marginBottom: 2 }}
      />
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={handleEncode}>
          Encode
        </Button>
        <Button variant="contained" onClick={handleDecode}>
          Decode
        </Button>
      </Stack>
      {output && (
        <Box>
          <Typography variant="h6">Output:</Typography>
          <Typography>{output}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CaesarCipher;