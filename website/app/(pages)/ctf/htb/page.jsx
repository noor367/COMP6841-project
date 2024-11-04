import React from 'react';
import { Typography, Paper, Box } from '@mui/material';

export default function HackTheBox() {
  return (
    <Box  direction='column' maxWidth='1800px' alignItems='center' margin='auto' pt={10} pb={10} px={10}>
      <Typography variant='h1' gutterBottom>
        HackTheBox
      </Typography>
      <Paper elevation={3} style={{ padding: '16px' }}>
        <p>
          HackTheBox is a platform with a multitude of services, including hosting CTF challenges. The challenges in these writeups are part of the perpetually ongoing "Try Out" CTF event. In walkthorughs, where applicable, specific URLs are never specified since these are launched via docker uniquely when someone starts a challenge. Instead, to indicate the start of the URL, <code>host:port/</code> is used.
        </p>
        
        <Typography variant='h2' gutterBottom>
          Dynastic - Crypto
        </Typography>
        <p>
          You find yourself trapped inside a sealed gas chamber, and suddenly, the air is pierced by the sound of a distorted voice played through a pre-recorded tape. Through this eerie transmission, you discover that within the next 15 minutes, this very chamber will be inundated with lethal hydrogen cyanide. As the tape’s message concludes, a sudden mechanical whirring fills the chamber, followed by the ominous ticking of a clock. You realise that each beat is one step closer to death. Darkness envelops you, your right hand restrained by handcuffs, and the exit door is locked. Your situation deteriorates as you realise that both the door and the handcuffs demand the same passcode to unlock. Panic is a luxury you cannot afford; swift action is imperative. As you explore your surroundings, your trembling fingers encounter a torch. Instantly, upon flipping the switch, the chamber is bathed in a dim glow, unveiling cryptic letters etched into the walls and a disturbing image of a Roman emperor drawn in blood. Decrypting the letters will provide you the key required to unlock the locks. Use the torch wisely as its battery is almost drained out!
        </p>
        
        <Typography variant='h3' gutterBottom>
          Explanation
        </Typography>
        <p>
          The Trithemius cipher is a polyalphabetic substitution cipher that applies a varying shift to the letters based on their position in the plaintext. In its simplest form, it uses a series of Caesar shifts that increment for each subsequent letter.
        </p>

        <Typography variant="h3" gutterBottom>
          Walkthrough
        </Typography>
        
        <Typography variant="h4" gutterBottom>
          Analysis Of Provided Files
        </Typography>
        <p>We are provided with a source.py file and an output.txt file shown below:</p>
        <pre>
            {`# source.py
from secret import FLAG
from random import randint

def to_identity_map(a):
    return ord(a) - 0x41

def from_identity_map(a):
    return chr(a % 26 + 0x41)

def encrypt(m):
    c = ''
    for i in range(len(m)):
        ch = m[i]
        if not ch.isalpha():
            ech = ch
        else:
            chi = to_identity_map(ch)
            ech = from_identity_map(chi + i)
        c += ech
    return c

with open('output.txt', 'w') as f:
    f.write('Make sure you wrap the decrypted text with the HTB flag format :-]\\n')
    f.write(encrypt(FLAG))`}
        </pre>
        <p>And output.txt:</p>
        <pre>
            {`Make sure you wrap the decrypted text with the HTB flag format :-]
DJF_CTA_SWYH_NPDKK_MBZ_QPHTIGPMZY_KRZSQE?!_ZL_CN_PGLIMCU_YU_KJODME_RYGZXL`}
        </pre>
        <p>
          There is a custom encryption scheme that transforms a plaintext flag into a ciphertext. Let's break down the components of the encryption function to understand how it works:
          <br />
          - to_identity_map(a): This function converts an uppercase letter (A-Z) into a numeric representation (0-25) by subtracting 0x41 (65 in decimal, which is the ASCII value of 'A'). For example, 'A' becomes 0, 'B' becomes 1, ..., and 'Z' becomes 25.
          <br />
          - from_identity_map(a): This function does the reverse, converting a number (0-25) back into its corresponding uppercase letter. It takes a number, applies modulo 26, and adds 0x41 to return the appropriate character.
          <br /> <br />
          The encrypt(m) function iterates over each character in the input message:
          <br />
          - If the character is not alphabetic, it is left unchanged.
          <br />
          - If the character is alphabetic, it first converts the character to its identity map value using to_identity_map(ch), then adds the current index i to this value.
          <br />
          - As a result, the sum is then converted back to a character using from_identity_map().
          <br /> <br />
          This means each letter's position in the ciphertext is influenced by its position in the plaintext. Non-alphabetic characters remain the same, while alphabetic characters shift depending on their position.
        </p>
        <Typography variant="h4" gutterBottom>
          Solution
        </Typography>
        <p>
          Now that we have analysed the files and understand our problem, we can craft a script to decrypt the flag. To decrypt, we iterate through the ciphertext and reverse the encryption process.
        </p>
        
        <Box component="pre">
          <code>
            {`def to_identity_map(a):
    return ord(a) - 0x41

def from_identity_map(a):
    return chr(a % 26 + 0x41)

def decrypt(ciphertext):
    plaintext = ''
    for i in range(len(ciphertext)):
        ch = ciphertext[i]
        if not ch.isalpha():
            plaintext += ch  # non-alphabetic characters remain the same
        else:
            chi = to_identity_map(ch)
            # Reverse the shift applied during encryption
            original_index = (chi - i) % 26
            ech = from_identity_map(original_index)
            plaintext += ech
    return plaintext

ciphertext = "DJF_CTA_SWYH_NPDKK_MBZ_QPHTIGPMZY_KRZSQE?!_ZL_CN_PGLIMCU_YU_KJODME_RYGZXL"
decrypted_flag = decrypt(ciphertext)
print(decrypted_flag)`}
          </code>
        </Box>

        <Typography variant="h4" gutterBottom>
          TimeKORP - Web
        </Typography>
        <Typography paragraph>
          Are you ready to unravel the mysteries and expose the truth hidden within KROP's digital domain? Join the challenge and prove your prowess in the world of cybersecurity. Remember, time is money, but in this case, the rewards may be far greater than you imagine.
        </Typography>

        <Typography variant="h5" gutterBottom>
          Explanation
        </Typography>
        <Typography paragraph>
          URLs often include format strings to specify how data should be displayed or processed. These format strings can be manipulated to exploit vulnerabilities if not properly sanitized. For example, you might encounter URLs like:
        </Typography>
        <Box component="pre">
          <code>
            {`http://example.com/?format=%H:%M:%S`}
          </code>
        </Box>
        <Typography paragraph>
          This can allow for URL injection and command execution if not handled correctly.
        </Typography>

        <Typography variant="h4" gutterBottom>
          Flag Command - Web
        </Typography>
        <Typography paragraph>
          Embark on the "Dimensional Escape Quest" where you wake up in a mysterious forest maze that's not quite of this world. Navigate singing squirrels, mischievous nymphs, and grumpy wizards in a whimsical labyrinth that may lead to otherworldly surprises. Will you conquer the enchanted maze or find yourself lost in a different dimension of magical challenges? The journey unfolds in this mystical escape!
        </Typography>
        
        <Typography variant="h5" gutterBottom>
          Walkthrough
        </Typography>
        <Typography paragraph>
          First access the page's HTML file through inspect and see if there is any indication of scripts as this is what we are interested in - the JS code execution.
        </Typography>
      </Paper>
    </Box>
  );
};