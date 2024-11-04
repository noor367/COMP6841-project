# Over The Wire CTF - Krypton

NOTE TO SELF: REMOVE ALL PWD BEFORE PUSHING

The bandit CTF challenges on [OverTheWire](https://overthewire.org/wargames) are used to gain familiarity and introduce oneself to common CTF tools and procedures. This is an introductory hands-on experience that builds skills and confidence before I move on to HackTheBox CTF challenges.

This writeup and guide is not meant to spoil the learning experience for anyone else interested in these wargames challenges. This is a warning that the following content will analyse and describe aspects of the challenges as well as my approach and how I "captured the flag".

OverTheWire wargames are levelled and require the password from solving one level to progress to the next level. This is why the level names are portrayed as Level n -> Level n + 1 as solving each of these sends you to the next problem.

The games are accessible via SSH where the flag is the password to log in. More details for how these games work can be found in OverTheWire's introductory wargame, Bandit.

IMPORTANT TO NOTE: If you are using these writeups as a guide to your own progress, please ensure you double check the host names and port numbers before you try to connect to anything. The information at the time you are reading this may not be the same information that was there when I was completing these tasks.

## Level 0 -> 1

Welcome to Krypton! The first level is easy. The following string encodes the password using Base64:
S1JZUFRPTklTR1JFQVQ=
Use this password to log in to krypton.labs.overthewire.org with username krypton1 using SSH on port 2231. You can find the files for other levels in /krypton/

### Helpful Information

link to the research docs Base64

- Although this problem is about base64, this is considered an encoding scheme rather than a secure encryption.
  Base64 is more of an encoding scheme rather than a cipher.

Encoding is about transforming data into a different format to ensure it's safely transmitted and properly understood by various systems. Think of it as converting data into a "safe language" that all systems can read without errors. It's not meant to hide data or make it secret.

Encryption, on the other hand, involves transforming data to keep it secret and secure. It uses algorithms and keys to convert plaintext into ciphertext, making it unreadable to anyone who doesn't have the proper decryption key.

### Walkthrough

A problem like this can be trivially solved with the built-in linux tool commands.
I used `echo S1JZUFRPTklTR1JFQVQ= | base64 -d`.
You can read the man page for base 64 [here](S1JZUFRPTklTR1JFQVQ=) but basically the base64 command can encode/decode data and print it to standard output. By adding the `-d` I specified that I wanted it to be decoded, not including this would automatically have the provided string encoded.
This gave me the necessary password to log into `ssh krypton1@krypton.labs.overthewire.org -p 2231` and I was able to gain access to Level 1.

Another way to solve this would be to use online decoders for base64 (which can be easily found with just a simple web search).

Activity (only include if you can make the encoder/decoder that shows mapping to each alphabet letter)
Here is a base64 encoder/decoder.

## Level 1 -> 2

The password for level 2 is in the file 'krypton2'. It is 'encrypted' using a simple rotation. It is also in non-standard ciphertext format. When using alpha characters for cipher text it is normal to group the letters into 5 letter clusters, regardless of word boundaries. This helps obfuscate any patterns. This file has kept the plain text word boundaries and carried them to the cipher text. Enjoy!

### Helpful Information

link to the research docs Rot ciphers

### Walkthrough

First, `cd /krypton/` which is where all the files are (mentioned in the Level 0->1 instructions) and then move into the level 1 direction krypton1. There is a README in this folder that provides the same instructions as the website with an added clue. The clue is that the file has been encrypted with a Rot13 cipher, which is one of the most common ciphers.

There are multiple methods of completing this task so let's first go through how I did this:

I used the linux [tr](https://linux.die.net/man/1/tr) command for this since it was already built-in at my disposal. Basically this command translates characters from one specified alphabet to another. This is shown in how I solved the problem by using `cat krypton2 | tr '[A-Za-z]' '[N-ZA-Mn-za-m]'`.
The first set of letters is the alphabet A-Z including lowercase whihc is what I want my phrase to be translated to. The second set of letters is the range of Rot13 letters, so instead of starting with 'A' we start with 'N' and go to the end of the alphabet before starting up and goin back to the middle.

Other ways of solving this problem could include using an online decoder, the sed command, or using python like so:

```
python -c "with open('krypton2') as f: ROT = 13; print(''.join([chr((ord(char)- ord('a') + ROT)%26+ord('a')) for char in f.read().strip()]))"
```

## Level 2 -> 3

ROT13 is a simple substitution cipher.

Substitution ciphers are a simple replacement algorithm. In this example of a substitution cipher, we will explore a 'monoalphebetic' cipher. Monoalphebetic means, literally, “one alphabet” and you will see why.

This level contains an old form of cipher called a 'Caesar Cipher'. A Caesar cipher shifts the alphabet by a set number. For example:

plain: a b c d e f g h i j k ...
cipher: G H I J K L M N O P Q ...
In this example, the letter 'a' in plaintext is replaced by a 'G' in the ciphertext so, for example, the plaintext 'bad' becomes 'HGJ' in ciphertext.

The password for level 3 is in the file krypton3. It is in 5 letter group ciphertext. It is encrypted with a Caesar Cipher. Without any further information, this cipher text may be difficult to break. You do not have direct access to the key, however you do have access to a program that will encrypt anything you wish to give it using the key. If you think logically, this is completely easy.

One shot can solve it!

Have fun.

### Helpful Information

The Caeser Cipher is another substitution cipher similar to Rot13 except instead of shifting 13 places, we are unaware how many places this has shifted. The easy part about Rot13 is that because the English alphabet is only 26 letters, the encoding and decoding of Rot13 is the same transformation.

### Walkthrough

First let's understand the files given to us in /krypton/krypton2 directory. We have the executable file called `encrypt` which will encrypt a give file using the cipher. We have the password in the krypton3 file and then a README with the same instructions given on the website. Opening this README shows that we should create a temp directory to ensure anything we create and change will not affect the challenge for others.

It would be possible but illogical for us to just try out every single alphabet shift in order to solve this challenge.
Because we have been given an executable that allows us to encrypt strings, we can easily feed it a very simple string such as `AA` just to see the difference in letters.
`echo AA > example.txt`
`/krypton/krypton2/encrypt example.txt`
`cat ciphertext`
The output we can see is "MM". This shows that the alphabet has switched A -> M for encoding which is 12 spaces.
We could also just encrypt the whole alphabet `abcdefghijklmnopqrstuvwxyz` to get the entire letter set match.

Now, to decode the password, we can't just use a Rot12 method. The easiest way to figure out the decoding scheme is just 26-12=14. For other circumstances you can change 12 to the relevant number. To decode the file, we can use a similar method to the previous level using 'tr'.
We can move back to the directory with the krypton3 file and then use `cat krypton3 | tr 'A-Za-z' 'O-ZA-No-za-n'`
(or any of the other methods disclosed in the previous level's walkthrough)

## Level 3 -> 4

The main weakness of a simple substitution cipher is repeated use of a simple key. In the previous exercise you were able to introduce arbitrary plaintext to expose the key. In this example, the cipher mechanism is not available to you, the attacker.

However, you have been lucky. You have intercepted more than one message. The password to the next level is found in the file 'krypton4'. You have also found 3 other files. (found1, found2, found3)

You know the following important details:

The message plaintexts are in American English (very important) - They were produced from the same key (even better!)

### Helpful Information

The English language contains a lot of clues from the way that phrases are constructed. This includes the length of words, grammar, and frequency of letters. From the way that we use English, we can inuitively fill in the gaps when reading sentences.
Take this for example: "Yuo cna siltl raed waht I ma syanig" Despite none of the words being spelled correctly, the meaning can still be deciphered. Let's also take a look at [use decipher.wtf as example]

### Walkthrough

There are many approaches to this problem. What we want to do is conduct a frequency analysis of the foundx files and then map the frequency of those letters to the English alphabet. We can see the existing frequency of letters outlined (here)[https://www3.nd.edu/~busiforc/handouts/cryptography/letterfrequencies.html].
To analyse the frequency, you could write a simple script looping the alphabet and utilising cat, tr, wc, and sort commands.
Additionally there are many online tools that can be used.
I created a tool in this website to analyse the letter frequency of what is typed in the textbox for this activity.
After finding out the most frequent letters, I correlated them to the list of most frequent letters.
This was not an immediately correct solution. So I used some pattern recognition to switch out some of the letters that did not fit and then fiddled around with this until I found the correct password.
`cat krypton4 | tr 'SQJUBNGCDZVWMYTXKELAFIORHP' 'EATSORNIHCLDUPYFWGMBKVXQJZ'` (The first alphabet set is the letters in frequency order and then the second set of letters is the frequency list altered a little. I didn't bother with the lowercase options because the files did not have any).

## Level 4 -> 5

This level is a Vigenère Cipher. You have intercepted two longer, english language messages (American English). You also have a key piece of information. You know the key length!

For this exercise, the key length is 6. The password to level five is in the usual place, encrypted with the 6 letter key.

### Helpful Information

In the previous levels, we have used simple substitution ciphers that require just swapping out one letter for another. They are "monoalphebetic" which is just a one to one fixed mapping of plaintext to ciphertext. The Vignere Cipher is "polyalphabetic" which means one plaintext character maps to multiple ciphertext characters.
Read more on this cipher - link to the research docs

### Walkthrough

Here is my plan for this task. I want to separate the letters into groups of 6 letters. Then, I will group together all the 1st, 2nd, 3rd, 4th, 5th, and 6th letters to perform frequency analysis on those letters.
This is the encrypted krypton5 file contents: HCIKV RJOX
Here is how I used python to achieve this:

```
# Function to split text into n groups
def split_text(text, key_length):
    groups = [''] * key_length
    for i in range(len(text)):
        groups[i % key_length] += text[i]
    return groups

# Function to count character frequencies in each group
def frequency_analysis(text):
    freq = {}
    for char in text:
        if char in freq:
            freq[char] += 1
        else:
            freq[char] = 1
    return freq

ciphertext = "" # This is where I put the contents of the found files but they're very longs so I won't include them here.
key_length = 6

# Remove spaces
ciphertext = ciphertext.replace(' ', '')

# Split text into groups
groups = split_text(ciphertext, key_length)

# Perform frequency analysis on each group
for i, group in enumerate(groups):
    freq = frequency_analysis(group)
    print(f"Group {i+1}: {freq}")
```

I then analysed the letter frequencies for each letter and came up with this:

- found1: FREKEY
- found2: FRTKEY

In my research, I also found this useful site that can crack Vigenère ciphers with given pieces of information.
https://f00l.de/hacking/vigenere.php or https://www.dcode.fr/vigenere-cipher

Now that I had two options for the key, I tried both out on the password file to see which made the most sense.
This can be done using a Vigenère square, online tools, or just mapping out the letters by hand. With this, I found that the FREKEY was correct and I was able to use the password to enter the next level.

## Level 5 -> 6

FA can break a known key length as well. Lets try one last polyalphabetic cipher, but this time the key length is unknown. Note: the text is writen in American English

### Helpful Information

FA refers to frequency analysis and it is the process we have been doing these past few levels to find our solutions.

### Walkthrough

In this instance, I simply just used the website I found in the previous level's walkthrough. There are a couple of Vigenère Cipher solvers.
Something interesting I noticed with all these frequency analysis activities is that you have to analyse each file separately rather than as a whole text. These online solvers were able to correctly decipher the keylength accurately with even just the first found file. I ran all three through just to make sure then decoded the password to move on to the next level.
RANDOM

## Level 6 -> 7

From this example forward, we will be working with bytes, not ASCII text, so a hex editor/dumper like hexdump is a necessity. Now is the right time to start to learn to use tools like cryptool.

In this example, the keyfile is in your directory, however it is not readable by you. The binary ‘encrypt6’ is also available. It will read the keyfile and encrypt any message you desire, using the key AND a ‘random’ number. You get to perform a ‘known ciphertext’ attack by introducing plaintext of your choice. The challenge here is not simple, but the ‘random’ number generator is weak.

As stated, it is now that we suggest you begin to use public tools, like cryptool, to help in your analysis. You will most likely need a hint to get going. See ‘HINT1’ if you need a kicktstart.

If you have further difficulty, there is a hint in ‘HINT2’.

The password for level 7 (krypton7) is encrypted with ‘encrypt6’.

Helpful Information

## Activities

Move this to a separate activities page

### Base64

### Caeser's Cipher

### Substitution Cipher visual

# Reflection
