# Table of Contents

1. [Cryptography](#cryptography)
   1. [Key Concepts](#key-concepts)
   2. [History Examples](#history-examples)
   3. [Common Encoding Schemes](#common-encoding)
      1. [Base64](#base64)
      2. [Caeser's Cipher](#caeser-cipher)
2. [CTF](#ctf)
3. [About project](#about)

# Cryptography

- aka cryptology
- nomenclature -> Ancient Greek: κρυπτός, romanized: kryptós "hidden, secret"; and γράφειν graphein, "to write", or λογία -logia, "study", respectively
- integral to information security
- involves obscuring the true meaning of a message so that only the intended recipient can read it
- achieved via ciphers: symmetric, asymmetric
- ciphers: substitution or transposition

Cryptography is the science and art of securing communication and information by transforming it into a format that is unreadable to unauthorized users. Its primary purpose is to ensure confidentiality, integrity, authentication, and non-repudiation of data. By using cryptographic techniques, sensitive information can be protected from eavesdroppers, hackers, and other malicious entities.

## Key Concepts

- Encryption: The process of converting plaintext into ciphertext to prevent unauthorized access.

- Decryption: The process of converting ciphertext back into plaintext using the appropriate key.

- Key: A piece of information that determines the output of a cryptographic algorithm. Keys must be kept secure to maintain the integrity of the encryption.

- Cipher: The algorithm used for encryption and decryption. Different ciphers have different strengths and weaknesses.

- Salt: Random data added to input before hashing to ensure that identical inputs produce different hashes, enhancing security against dictionary attacks.

Symmetric Cryptography

- This type involves the use of a single key for both encryption and decryption. The sender and receiver must share this key in a secure manner.

- Examples: AES (Advanced Encryption Standard), DES (Data Encryption Standard), and RC4.

- Advantages: Fast and efficient for large amounts of data.

- Disadvantages: Key distribution can be challenging; if the key is compromised, the security is lost.

Asymmetric Cryptography

- Also known as public-key cryptography, it uses two keys—a public key for encryption and a private key for decryption. The public key can be shared openly, while the private key is kept secret.

- Examples: RSA (Rivest-Shamir-Adleman), DSA (Digital Signature Algorithm), and ECC (Elliptic Curve Cryptography).

- Advantages: Solves the key distribution problem and enhances security.

- Disadvantages: Slower than symmetric encryption, making it less suitable for encrypting large data volumes.

Hash Functions

- A hash function takes an input (or message) and produces a fixed-size string of characters, which is typically a digest that represents the data. Hash functions are one-way functions, meaning they cannot be reversed to retrieve the original input.

- e.g. SHA-256 (Secure Hash Algorithm), MD5 (Message-Digest Algorithm), and SHA-1.

- adv: Useful for data integrity verification and password storage.

- disadv: Vulnerable to collision attacks if not designed correctly (i.e., different inputs producing the same hash)

## Uses

Cryptography is widely used in various fields, including:

- Secure Communication: Email encryption, messaging apps, and secure web browsing (HTTPS).
- Data Protection: Encrypting files, databases, and backups to protect sensitive information.
- Authentication: Verifying the identity of users and devices through methods such as digital signatures and certificates.
- Blockchain and Cryptocurrency: Securing transactions and maintaining the integrity of the blockchain.

## History Examples

Despite the rise of global technologies, encrypting data is something that goes back thousands of years. Here are some historic cases of ciphers:

Caesar's Cipher: The Caesar Cipher, named after Julius Caesar, is one of the simplest and most well-known forms of encryption. This substitution cipher shifts each letter in the alphabet by a predetermined number of places. For example, with a shift of three, A becomes D, B becomes E, and so forth.

Caesar used this method to secure his military communications during his campaigns in Gaul. Roman historian Suetonius noted that Caesar’s letters were deliberately obfuscated to protect sensitive information. This method was so effective that it inspired future encryption techniques, though it was eventually deemed insecure as it could be easily broken through frequency analysis and brute force methods.

Scytale: The Scytale was an ancient encryption tool used by the Spartans, characterized by its simple yet effective design. It consisted of a wooden rod around which a strip of parchment was wound. A message was written on the parchment in such a way that when it was unwound, the letters would appear jumbled and unreadable. To decrypt the message, the recipient would need a rod of the same diameter to rewind the parchment, aligning the letters correctly.

Plutarch's accounts reveal the practical application of the Scytale in military communication, emphasizing the need for secrecy in warfare. However, its simplicity was also its weakness; once the circumference of the rod was known, anyone could decrypt the message easily. The Scytale was primarily used for short messages due to its limitations in length.

Enigma Machine: The Enigma Machine was a complex encryption device used by the German military during World War II. Designed by Arthur Scherbius in 1918 for business communications, it became infamous for its use by the Nazis to encrypt military messages. The machine employed a series of rotors and scrambler disks that generated millions of potential letter combinations, making it one of the most secure encryption systems of its time.

Breaking the Enigma Code was a monumental challenge, tackled by Polish cryptographers and later by the British team at Bletchley Park, including Alan Turing. The development of mechanical bombes and, ultimately, early computers, allowed the Allies to decrypt Enigma messages, significantly contributing to the war effort and potentially shortening the conflict by years.

Summarise:

1. Scytale

The Scytale was an ancient Spartan tool used for sending encrypted messages over long distances. It consisted of a wooden rod around which a strip of parchment was wound, on which the message was written. When unwound, the message appeared as gibberish. To read it, one would need a rod of the same circumference to rewind the parchment. Plutarch, in the first century, described this method, noting its simplicity and effectiveness, though it was vulnerable once the circumference became known.

2. Caesar Cipher

Named after Julius Caesar, this cipher involves shifting each letter of the alphabet by a fixed number of places. Caesar used it for secure correspondence during his campaigns in Gaul. Roman writer Suetonius described how Caesar would obscure messages by shifting letters, ensuring that intercepted letters would be unintelligible. This method was simple but effective, laying the groundwork for future encryption techniques.

3. Freemason Cipher (Pigpen Cipher)

The Pigpen Cipher, also known as the Freemason Cipher, was used by 18th-century Freemasons to encrypt messages. It involves placing letters within a grid and using the shapes created by the grid's lines to represent each letter. Its origins are somewhat obscure, but it gained popularity among Freemasons and was used extensively during the American War of Independence.

4. Great Cipher of Louis XIV

Developed by Antoine and Bonaventure Rossignol for King Louis XIV, the Great Cipher employed 587 symbols to encode French syllables, making it much more complex than typical ciphers of the time. It remained unbroken for 200 years and was used for sensitive political messages. One notable decoded message related to the identity of the Man in the Iron Mask.

5. The Jefferson Wheel Cipher

Thomas Jefferson created the Jefferson Wheel Cipher during his time as American Ambassador to France. This device featured 36 wooden discs, each marked with letters in random order. The sender would write a message normally, then use the wheels to create an encoded message by selecting random letters. This innovative tool was designed to thwart interception by "black chambers" that decrypted mail.

6. Morse Code

Invented in the early 19th century, Morse Code is a binary system that uses dots and dashes to represent letters and numbers. Developed by Samuel Morse, it allowed for rapid long-distance communication via telegraph. However, it also raised concerns about privacy, prompting a resurgence in cipher use as users sought ways to encode their messages before transmission.

7. The Enigma Code

The Enigma Machine, used by the Germans during World War II, was a sophisticated device that encrypted messages using a series of rotating disks. Its complexity made manual decryption almost impossible, but Polish codebreakers and later the British team at Bletchley Park, led by Alan Turing, developed methods to crack the code, ultimately decoding millions of messages and significantly aiding the Allied war effort.

8. Navajo Code Talkers

During World War II, the U.S. Marine Corps employed Navajo speakers to create an unbreakable code based on their native language. Known as the Navajo Code Talkers, they participated in key operations in the Pacific Theater, and their code remained unbroken throughout the war, significantly contributing to the Allied victory.

9. Alberti’s Disk

Invented by Leon Battista Alberti in 1467, this device consists of two concentric disks, allowing for a more complex method of encryption by rotating the inner disk to align different letters for encoding messages, enhancing the difficulty of decryption.

10. The Vigenère Square

This 16th-century cipher employs a keyword to create a series of Caesar shifts within the same message. Although initially simple, it resisted attempts to break it for over 300 years, earning the nickname “le chiffre indéchiffrable” or the undecipherable cipher.

11. The Shugborough Inscription

On the Shepherds’ Monument in Shugborough Hall, a mysterious inscription of eight letters—OUOSVAVV—has puzzled codebreakers for centuries. Its meaning remains a subject of speculation, with theories ranging from religious significance to hidden treasure.

12. The Voynich Manuscript

This 15th-century codex contains bizarre illustrations and an undeciphered text written in an unknown alphabet, continuing to intrigue scholars and cryptographers alike. Its purpose and content remain a mystery, leading to theories of it being a hoax or a secret text.

13. Hieroglyphs

The ancient Egyptian hieroglyphs became a lost code until the discovery of the Rosetta Stone, which allowed scholars to finally decode this intricate writing system and unlock the history of one of civilization's greatest cultures.

14. Kryptos

Installed at CIA headquarters in 1990, Kryptos is a sculpture featuring a complex four-part code. While three parts have been solved, the final segment remains a tantalizing mystery, inviting cryptographers to decode its secrets.

15. RSA Encryption

Developed in the 1970s, RSA encryption introduced the concept of public-key cryptography, allowing secure communication without the need to share a private key beforehand. This innovation is foundational to modern digital security, safeguarding much of today's electronic communications.

16. The Pioneer Plaques

Attached to the Pioneer 10 and 11 spacecraft, these gold-aluminum plaques encode information about humanity and our solar system, designed to communicate with potential extraterrestrial life. They represent our efforts to share knowledge across the cosmos.

## Common Encoding

### Base64

Base64 is an encoding/decoding scheme that transforms binary data into a sequence of human-readable characters. As the naming suggests, this is limited to 64 characters and can be thought of as an alphabet. From the binary source, every 6 bits is mapped to one of the 64 values. There is a standard Base64 cipher covered in [RFC 4648](https://datatracker.ietf.org/doc/html/rfc4648). This version uses the alphabet `ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/` as well as `=` the equals sign for padding.

However, there are lots of variants to this as people can customise and produce their own versions.

If this sounds complicated, let's walk it back a little bit to think of why Base64 is used. Think of it as a way to take complex, raw data and transform it into a simpler form that can be easily moved around.
Here’s how it works:

- Binary Data: You start with binary data (like a file or an image). These are the base levels of 0s and 1s considered to be bits.

- Group Bits: These bits are grouped into chunks of 6.

- Encode: Each 6-bit group is then mapped to a specific ASCII character using a Base64 table. This table contains 64 characters: A-Z, a-z, 0-9, +, and /.

- Substep: If there are not enough bits to match 6, then the equals sign `=` is introduced as padding

If you ever stumble upon long strings of seemingly random text—often ending in one or two equal signs—you’re likely looking at Base64-encoded data!

_Example_
When Base64 transforms a string like "Hello, World!", it actually converts that string to its binary equivalent first.

Here's how it works:

- Text to Binary: Each character in "Hello, World!" is converted to its ASCII binary form.

  - Example: "H" becomes 01001000.

- Group the Bits: These binary bits are then grouped into 6-bit chunks.

  - Example: 010010 000110 010110 010011 000110 110011.

- Encode to Base64: Each 6-bit chunk is mapped to a Base64 character using the Base64 table.

  - Example: 010010 (18) maps to "S", 000110 (6) maps to "G", and so on.

- The end result: "SGVsbG8sIFdvcmxkIQ==" for "Hello, World!".

### Caeser Cipher

THIS IS THE SAME AS A ROTATION CIPHER.
Shifting the alphabet a fixed number of times

## Common Techniques

When deciphering ... context is an important clue that can be used to interpret a lot of messages. This can be the size of words, layout of a sentence, knowledge of the subject matter, punctuation, and letter frequency.

Frequency analysis

# CTF

Capture the flag (CTF) challenges are common exercises in computer security where a program is purposefully vulnerable to allow the challenge participant to find exploits and recover the "flag" text string. The term comes from the playground sport of the same name. Much like this entire project, CTF challenges are educational and offer hands-on technical applications of concepts learned.

# About

This website was created as part of the COMP6841 Something Awesome Project. The purpose of my project is to educate the general public about Cryptography specifically. However, it has grown from solely focusing on cryptography to be more of a catch-all for common CTF challenges.

In my project, I have completed several CTF challenges ranging from low to high level and written up my process in extensive detail. Additionally, I have created similar examples of these challenges as well as tools that can be used for solving.
