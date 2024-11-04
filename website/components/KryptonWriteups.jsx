import React from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, Link, List, ListItem } from '@mui/joy';

// eslint-disable-next-line react/no-unescaped-entities
export function Level0() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 0-1
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        Welcome to Krypton! The first level is easy. The following string encodes the password using Base64:
        <pre>S1JZUFRPTklTR1JFQVQ=</pre>
        Use this password to log in to krypton.labs.overthewire.org with username krypton1 using SSH on port 2231.
        You can find the files for other levels in /krypton/
      </Typography>
      <Typography level='h3' py={3}>
        Helpful Information
      </Typography>
      <Typography fontSize='lg' color='black' display='block' pb={3}>
        Although this problem is about base64, this is considered an encoding scheme rather than a secure encryption. <br/>
        <b>Encoding</b> is about transforming data into a different format to ensure it's safely transmitted and properly understood by various systems. Think of it as converting data into a "safe language" that all systems can read without errors. It's not meant to hide data or make it secret. <br />
        <b>Encryption</b>, on the other hand, involves transforming data to keep it secret and secure. It uses algorithms and keys to convert plaintext into ciphertext, making it unreadable to anyone who doesn't have the proper decryption key.
      </Typography>
      <Typography level='body'>
        Base64 is an encoding/decoding scheme that transforms binary data into a sequence of human-readable characters. As the naming suggests, this is limited to 64 characters and can be thought of as an alphabet. From the binary source, every 6 bits is mapped to one of the 64 values. There is a standard Base64 cipher covered in <Link href='https://datatracker.ietf.org/doc/html/rfc4648'>RFC 4648</Link>. This version uses the alphabet <code>ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/</code> as well as the equals sign (=) for padding. However, there are lots of variants to this as people can customise and produce their own versions. <br/> <br/>

        If this sounds complicated, let's walk it back a little bit to think of why Base64 is used. Think of it as a way to take complex, raw data and transform it into a simpler form that can be easily moved around.
        Here's how it works:

        <ListItem color='black'>
          - Binary Data: You start with binary data (like a file or an image). These are the base levels of 0s and 1s considered to be bits.
        </ListItem>
        <ListItem color='black'> - Group Bits: These bits are grouped into chunks of 6.</ListItem>
        <ListItem color='black'>
          - Encode: Each 6-bit group is then mapped to a specific ASCII character using a Base64 table. This table contains 64 characters: A-Z, a-z, 0-9, +, and /.
        </ListItem>
        <ListItem color='black'>
          - Substep: If there are not enough bits to match 6, then the equals sign `=` is introduced as padding
        </ListItem>
        <br />
        If you ever stumble upon long strings of seemingly random text—often ending in one or two equal signs — you're likely looking at Base64-encoded data!
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel1-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            A problem like this can be trivially solved with the built-in Linux tool commands. 
            I used <code>echo S1JZUFRPTklTR1JFQVQ= | base64 -d</code>.
            You can read the man page for base64 <Link href="S1JZUFRPTklTR1JFQVQ=" target="_blank" rel="noopener">here</Link>, but basically the base64 command can encode/decode data and print it to standard output. By adding the <code>-d</code> I specified that I wanted it to be decoded; not including this would automatically have the provided string encoded.
            This gave me the necessary password to log into <code>ssh krypton1@krypton.labs.overthewire.org -p 2231</code> and I was able to gain access to Level 1.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export function Level1() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 1-2
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        The password for level 2 is in the file 'krypton2'. It is 'encrypted' using a simple rotation and is in a non-standard ciphertext format. When using alpha characters for cipher text, it is normal to group the letters into 5-letter clusters, which helps obfuscate any patterns. Enjoy!
      </Typography>
      <Typography level='h3' py={3}>
        Explanation
      </Typography>
      <Typography level='body'>
        You can learn more about rotation ciphers in the research docs on [Rot ciphers](https://en.wikipedia.org/wiki/Rotation_cipher).
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel1-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            First, `cd /krypton/`, which is where all the files are (mentioned in the Level 0-1 instructions). Then move into the level 1 directory `krypton1`. There is a README in this folder that provides the same instructions as the website with an added clue: the file has been encrypted with a Rot13 cipher.
            <br /><br />
            I used the Linux <Link href="https://linux.die.net/man/1/tr" target="_blank" rel="noopener">tr</Link> command for this since it was already built-in at my disposal. The command translates characters from one specified alphabet to another:
            <code>cat krypton2 | tr '[A-Za-z]' '[N-ZA-Mn-za-m]'</code>.
            <br />
            The first set of letters is the alphabet A-Z including lowercase whihc is what I want my phrase to be translated to. The second set of letters is the range of Rot13 letters, so instead of starting with 'A' we start with 'N' and go to the end of the alphabet before starting up and goin back to the middle.
          </Typography>
          <Typography level='body'>
            Other methods include using an online decoder or using Python:
            <pre>
              python -c "with open('krypton2') as f: ROT = 13; print(''.join([chr((ord(char)- ord('a') + ROT)%26+ord('a')) for char in f.read().strip()]))"
            </pre>
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function Level2() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 2-3
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        ROT13 is a simple substitution cipher.
        Substitution ciphers are a simple replacement algorithm. In this example of a substitution cipher, we will explore a 'monoalphebetic' cipher. Monoalphebetic means, literally, “one alphabet” and you will see why.
        This level contains an old form of cipher called a 'Caesar Cipher'. A Caesar cipher shifts the alphabet by a set number. For example:
        plain: a b c d e f g h i j k ... cipher: G H I J K L M N O P Q ... In this example, the letter 'a' in plaintext is replaced by a 'G' in the ciphertext so, for example, the plaintext 'bad' becomes 'HGJ' in ciphertext.
        The password for level 3 is in the file krypton3. It is in 5 letter group ciphertext. It is encrypted with a Caesar Cipher. Without any further information, this cipher text may be difficult to break. You do not have direct access to the key, however you do have access to a program that will encrypt anything you wish to give it using the key. If you think logically, this is completely easy.
        One shot can solve it!
        Have fun.
        The password for level 3 is in the file 'krypton3'. It is in 5-letter group ciphertext and is encrypted with a Caesar Cipher.
      </Typography>
      <Typography level='h3' py={3}>
        Explanation
      </Typography>
      <Typography level='body'>
        The Caesar Cipher is a substitution cipher where each letter in the plaintext is 'shifted' a certain number of places down or up the alphabet. It is one of the oldest and simplest ciphers.
      </Typography>
      <Typography level='h4' py={2}>
        How It Works:
      </Typography>
      <Typography level='body'>
        <ul>
          <li><b>Shift Letters:</b> It works by shifting the letters in the plaintext a fixed number of positions down or up the alphabet. For example, with a shift of 3:</li>
          <ul>
            <li>A becomes D</li>
            <li>B becomes E</li>
            <li>C becomes F</li>
            <li>And so on...</li>
          </ul>
        </ul>
      </Typography>
      <Typography level='h4' py={2}>
        Example:
      </Typography>
      <Typography level='body'>
        Let’s say we want to encrypt the word "HELLO" with a shift of 3:
        <ul>
          <li>H (shifted by 3) becomes K</li>
          <li>E becomes H</li>
          <li>L becomes O</li>
          <li>L becomes O</li>
          <li>O becomes R</li>
        </ul>
        So, "HELLO" becomes "KHOOR".
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel2-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            First, navigate to the /krypton/krypton2 directory. Inside, you'll find the executable file called <code>encrypt</code> and the password in the krypton3 file.
            <br /><br />
            To determine the shift, I used:
            <pre>
              echo AA {'>'} example.txt
              /krypton/krypton2/encrypt example.txt
              cat ciphertext
            </pre>
            This showed that A maps to M, meaning the shift is 12.
            <br /><br />
            To decode the password, you can use:
            <code>cat krypton3 | tr 'A-Za-z' 'O-ZA-No-za-n'</code>.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function Level3() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 3-4
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        The main weakness of a simple substitution cipher is repeated use of a simple key. In the previous exercise you were able to introduce arbitrary plaintext to expose the key. In this example, the cipher mechanism is not available to you, the attacker.
        However, you have been lucky. You have intercepted more than one message. The password to the next level is found in the file 'krypton4'. You have also found 3 other files. (found1, found2, found3)
        You know the following important details:
        The message plaintexts are in American English (very important) - They were produced from the same key (even better!)
        The password for level 4 is found in the file 'krypton4' along with 3 other files: found1, found2, found3.
      </Typography>
      <Typography level='h3' py={3}>
        Explanation
      </Typography>
      <Typography level='body'>
        The English language contains a lot of clues from the way that phrases are constructed. This includes the length of words, grammar, and frequency of letters. From the way that we use English, we can inuitively fill in the gaps when reading sentences. Take this for example: "Yuo cna siltl raed waht I ma syanig" Despite none of the words being spelled correctly, the meaning can still be deciphered. To gameify pattern recognition and letter frequency analysis, you can check out <Link href='https://decipher.wtf '>Deciper Game </Link>
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel3-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            There are many approaches to this problem. What we want to do is conduct a frequency analysis of the foundx files and then map the frequency of those letters to the English alphabet. You can check the existing frequency of letters online. To analyse the frequency, you could write a simple script looping the alphabet and utilising cat, tr, wc, and sort commands. Additionally there are many online tools that can be used. I created a tool in this website to analyse the letter frequency of what is typed in the textbox for this activity. After finding out the most frequent letters, I correlated them to the list of most frequent letters. This was not an immediately correct solution. So I used some pattern recognition to switch out some of the letters that did not fit and then fiddled around with this until I found the correct password.Use commands like:
            <pre>
              cat krypton4 | tr 'SQJUBNGCDZVWMYTXKELAFIORHP' 'EATSORNIHCLDUPYFWGMBKVXQJZ'
            </pre>
             (The first alphabet set is the letters in frequency order and then the second set of letters is the frequency list altered a little. I didn't bother with the lowercase options because the files did not have any).
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function Level4() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 4-5
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        The password for level 5 is encrypted with a Vigenère Cipher using a key length of 6.
      </Typography>
      <Typography level='h3' py={3}>
        Explanation
      </Typography>
      <Typography level='body'>
        The Vigenère Cipher is a more complex form of encryption compared to previous levels. It is a method of encrypting alphabetic text by using a simple form of polyalphabetic substitution. It is named after Blaise de Vigenère, a 16th-century French diplomat.
      </Typography>
      <Typography level='h3' py={2}>
        How It Works:
      </Typography>
      <Typography level='body'>
        <ul>
          <li><b>Keyword:</b> The cipher uses a keyword to determine the shift for each letter. Each letter of the keyword corresponds to a shift in the alphabet. For example, if the keyword is "KEY", the shifts would be based on the positions of K (10), E (4), and Y (24) in the alphabet.</li>
          <li><b>Repeating the Keyword:</b> The keyword is repeated to match the length of the plaintext. For instance, if the plaintext is "HELLO" and the keyword is "KEY", it becomes "KEYKE".</li>
          <li><b>Letter Shifting:</b> Each letter of the plaintext is shifted according to the corresponding letter in the keyword. For example, to encrypt "H" (8) using "K" (10), you would calculate (8 + 10) % 26 = 18, which corresponds to "S".</li>
        </ul>
      </Typography>
      <Typography level='h3' py={2}>
        Example:
      </Typography>
      <Typography level='body'>
        Let's say we want to encrypt the word "ATTACK" with the keyword "LEMON":
        <ul>
          <li>A (shifted by L) becomes L</li>
          <li>T (shifted by E) becomes Y</li>
          <li>T (shifted by M) becomes E</li>
          <li>A (shifted by O) becomes O</li>
          <li>C (shifted by N) becomes N</li>
          <li>K (shifted by L) becomes V</li>
        </ul>
        So, "ATTACK" becomes "LYEONV".
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel4-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            Here is my plan for this task. I want to separate the letters into groups of 6 letters. Then, I will group together all the 1st, 2nd, 3rd, 4th, 5th, and 6th letters to perform frequency analysis on those letters. This is the encrypted krypton5 file contents: HCIKV RJOX Here is how I used python to achieve this:
            <pre>
              # Function to split text into n groups
              def split_text(text, key_length):
                  groups = [''] * key_length
                  for i in range(len(text)):
                      groups[i % key_length] += text[i]
                  return groups
            </pre>
            <br />
            I then analysed the letter frequencies for each letter and came up with this:

            found1: FREKEY
            found2: FRTKEY
            In my research, I also found this useful site that can crack Vigenère ciphers with given pieces of information. 
            <Link href='https://f00l.de/hacking/vigenere.php'>(Cracking Tool)</Link> <br />
            Now that I had two options for the key, I tried both out on the password file to see which made the most sense. This can be done using a Vigenère square, online tools, or just mapping out the letters by hand. With this, I found that the FREKEY was correct and I was able to use the password to enter the next level.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}

export function Level5() {
  return (
    <Box>
      <Typography level='h2' py={3}>
        Level 5-6
      </Typography>
      <Typography level='body' fontSize='lg' color='black'>
        FA can break a known key length as well. Lets try one last polyalphabetic cipher, but this time the key length is unknown. Note: the text is writen in American English
      </Typography>
      <Typography level='h3' py={3}>
        Explanation
      </Typography>
      <Typography level='body'>
        FA refers to frequency analysis and it is the process we have been doing these past few levels to find our solutions.
      </Typography>
      <Accordion>
        <AccordionSummary aria-controls="panel5-content">
          <Typography level='h3' py={3}>Walkthrough ↓</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography level='body'>
            In this instance, I simply just used the website I found in the previous level's walkthrough. There are a couple of Vigenère Cipher solvers. Something interesting I noticed with all these frequency analysis activities is that you have to analyse each file separately rather than as a whole text. These online solvers were able to correctly decipher the keylength accurately with even just the first found file. I ran all three through just to make sure then decoded the password to move on to the next level.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
}