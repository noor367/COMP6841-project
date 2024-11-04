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
          <br />
          For each character in the ciphertext:
          <br />
          - If it's a letter, find its position in the alphabet using to_identity_map.
          <br />
          - Subtract the index i from this position.
          <br />
          - Apply modulo 26 to ensure it wraps around if necessary.
          <br />
          - Convert it back to a character using from_identity_map.
          <br /> <br />
        </p>
        <pre>
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
        </pre>
        <Typography variant='h2' gutterBottom>
          TimeKORP - Web
        </Typography>
        <p>
          Are you ready to unravel the mysteries and expose the truth hidden within KROP's digital domain? Join the challenge and prove your prowess in the world of cybersecurity. Remember, time is money, but in this case, the rewards may be far greater than you imagine.
        </p>
        
        <Typography variant='h3' gutterBottom>
          Explanation
        </Typography>
        <p>
          URLs often include format strings to specify how data should be displayed or processed. These format strings can be manipulated to exploit vulnerabilities if not properly sanitized. For example, you might encounter URLs like:
          <code>http://example.com/?format=%H:%M:%S</code>
          <br />
          Here, `format` is a query parameter that specifies a time format string.
          <br /> <br />
          Why is this important? Because we can then manipulate the url to display information it is not intended to.
          <br /> <br />
          URL Injection is a technique where attackers change the URL parameters to inject commands or scripts. This can happen due to inadequate input validation or escaping mechanisms in the web application.
          <br /> <br />
          How it works:
          - Identify Entry Points: Find URLs with parameters that can be manipulated.
          <br />
          - Craft Payloads: Create payloads that exploit the lack of sanitization in these parameters.
          <br />
          - Inject Commands: Inject commands through these payloads to gain control over the application.
          <br /> <br />
          <b>Example:</b> Suppose we have a URL with a format parameter: <code>http://example.com/time?format=%H:%M:%S</code>
          <br />
          Following the process we described above:
          <br />
          - Identify: The format parameter isn't sanitized. We can exploit this by injecting commands:
          <br />
          - Construct Payload: Inject a command to list files in the directory: `format=';ls;'`
          <br />
          - Inject: http://example.com/time?format=%H;%20ls;%20echo%20%H:%M:%S
          <br /> <br />
          This command insertion might exploit the application's functionality, allowing us to run arbitrary commands.
        </p>

        <Typography variant="h3" gutterBottom>
          Walkthrough
        </Typography>
        We are provided with a zip folder with many files inside. We can ignore everything in the root of the folder and go straight to <code>challenge</code>. We are interested in the PHP files since they control the website's display. PHP (Hypertext Preprocessor) is a popular server-side scripting language designed for web development. It's embedded within HTML and executes on the server, generating HTML to be sent to the client's web browser. It is relatively straightforward to read if you are familiar with code.
        <br /> <br />
        The index file leads us to the TimeController file. From this, we can understand that the GET request being used to set a value to the $format variable, however, it is not being sanitised or checked which makes it ideal for an injection location. This can already be seen as a red flag in the url of the Docker site. <code>http://host:port/?format=%H:%M:%S</code>
        <br /> <br />
        We can run a few commands to see how this alters the webpage's display. I played around with some echo and ls commands. What we are really after is the flag, which we know is just called `flag` because of the files we were provided with. We can craft our payload as `format=';cat ../flag'`. We enter this into that part of the URL which shows the flag. It was a bit long so I had to zoom out a bit to copy the entire thing.
        <Typography variant='h2' gutterBottom>
          Flag Command - Web
        </Typography>
        <p>
          Embark on the "Dimensional Escape Quest" where you wake up in a mysterious forest maze that's not quite of this world. Navigate singing squirrels, mischievous nymphs, and grumpy wizards in a whimsical labyrinth that may lead to otherworldly surprises. Will you conquer the enchanted maze or find yourself lost in a different dimension of magical challenges? The journey unfolds in this mystical escape!
        </p>
        
        <Typography variant='h3' gutterBottom>
          Explanation
        </Typography>
        <p>
          Webpages we visit on the internet are formatted with HTML (hypertext markup language) which can be accessed by right-clicking and inspecting the page you are on. This opens a browser's developer tools which allow you to edit and analyse the page you are currently viewing. Editing the page here won't affect the code of the hosted website but it will affect how the page loads on your specific machine.

        </p>

        <Typography variant="h3" gutterBottom>
          Walkthrough
        </Typography>
        <p>
          First access the page's HTML file through inspect and see if there is any indication of scripts as this is what we are interested in - the JS code execution.
          <br />
          <pre>
            {`<script src="/static/terminal/js/commands.js" type="module"></script>
<script src="/static/terminal/js/main.js" type="module"></script>
<script src="/static/terminal/js/game.js" type="module"></script>
<script type="module">
    import { startCommander, enterKey, userTextInput } from "/static/terminal/js/main.js";
    startCommander();

    window.addEventListener("keyup", enterKey);

    // event listener for clicking on the terminal
    document.addEventListener("click", function () {
      userTextInput.focus();
    });


</script>`}
          </pre>
          <br />
          From these script elements, we can see that the site deals with user input in the main.js script. We can add this to the end of our url to access the file. <code>host:port/static/terminal/js/main.js</code>
          <br /> <br />
          The file is long so I used ctrl+f to search for key words that would be of use. Searching for "htb" led me to this section
          <pre>
            {`if (availableOptions[currentStep].includes(currentCommand) || availableOptions['secret'].includes(currentCommand)) {
        await fetch('/api/monitor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ 'command': currentCommand })
        })
            .then((res) => res.json())
            .then(async (data) => {
                console.log(data)
                await displayLineInTerminal({ text: data.message });

                if(data.message.includes('Game over')) {
                    playerLost();
                    fetchingResponse = false;
                    return;
                }

                if(data.message.includes('HTB{')) {
                    playerWon();
                    fetchingResponse = false;

                    return;
                }`}
          </pre>
          <br />
          This gives us a hint to look into how the api works and to find what the "secret" is. We can see at the bottom of the script that all the options for user input can be found at '/api/options' so we add that to our url to find the static file:
          <br />
          <pre>
            {`{
  "allPossibleCommands": {
    "1": [
      "HEAD NORTH",
      "HEAD WEST",
      "HEAD EAST",
      "HEAD SOUTH"
    ],
    "2": [
      "GO DEEPER INTO THE FOREST",
      "FOLLOW A MYSTERIOUS PATH",
      "CLIMB A TREE",
      "TURN BACK"
    ],
    "3": [
      "EXPLORE A CAVE",
      "CROSS A RICKETY BRIDGE",
      "FOLLOW A GLOWING BUTTERFLY",
      "SET UP CAMP"
    ],
    "4": [
      "ENTER A MAGICAL PORTAL",
      "SWIM ACROSS A MYSTERIOUS LAKE",
      "FOLLOW A SINGING SQUIRREL",
      "BUILD A RAFT AND SAIL DOWNSTREAM"
    ],
    "secret": [
      "Blip-blop, in a pickle with a hiccup! Shmiggity-shmack"
    ]
  }
}`}
          </pre>
          <br />
          Now that we have the secret, we can just type it into the website's input which then gives us the flag!
        </p>
      </Paper>
    </Box>
  );
};