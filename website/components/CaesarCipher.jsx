import React, { useState } from 'react';
import { Box, Button, Typography, Stack } from '@mui/joy';

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
      <Typography level="h2" gutterBottom>
        Caesar Cipher Encoder/Decoder
      </Typography>
      <div>
        <label htmlFor="inputText">Input Text:</label>
        <input
          id="inputText"
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ width: '100%', marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div>
        <label htmlFor="shiftAmount">Shift Amount:</label>
        <input
          id="shiftAmount"
          type="number"
          value={shift}
          onChange={(e) => setShift(e.target.value)}
          style={{ width: '100%', marginBottom: '16px', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={handleEncode}>
          Encode
        </Button>
        <Button variant="contained" onClick={handleDecode}>
          Decode
        </Button>
      </Stack>
      {output && (
        <Box
          sx={{ 
            marginTop: 2, 
            padding: 2, 
            border: '1px solid', 
            borderColor: 'grey.400', 
            borderRadius: '4px'
          }}>
          <Typography variant="h6">Output:</Typography>
          <Typography>{output}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default CaesarCipher;