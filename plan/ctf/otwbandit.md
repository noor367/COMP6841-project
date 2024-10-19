# Over The Wire CTF - Bandit

NOTE TO SELF: REMOVE ALL PWD BEFORE PUSHING

The bandit CTF challenges on [OverTheWire](https://overthewire.org/wargames) are used to gain familiarity and introduce oneself to common CTF tools and procedures. This is an introductory hands-on experience that builds skills and confidence. I am starting this as my base point to finish then move on to cryptogrpahy based CTF with OverTheWire's krypton CTF.

This writeup and guide is not meant to spoil the learning experience for anyone else interested in these wargames challenges. This is a warning that the following content will analyse and describe aspects of the challenges as well as my approach and how I "captured the flag".

## Summary

Initial levels were extremely easy, making use of basic linux commands to find and read files that contained the passwords. These were made to get the user familiar with
0-7: Finding files
7-: Finding content within files

### Level 0 -> 1

The first level was a simple setup to ssh into the provided server, and find the password in the `readme` file. The way this (and presumably every other) challenge is setup is to find the password and use it to access the next level. In this case it was using a simple `cat` command to read the file.

ZjLjTmM6FvvyRnrb2rfNWOZOTa6ip5If

### Level 1 -> 2

Finding the next password was a similar process as the previous one, except the file was named with a hyphen making it a slightly different command, having to specify the pathname to correctly `cat` it.

263JGJPfgU6LtdEvgfWU1XP5yac29mFx

### Level 2 -> 3

Spaces in this filename

MNk8KNH3Usiio41PRUEoDFPqfxLPlSmx

### Level 3 -> 4

.
./...Hiding-From-You

2WmrDFRmJIq3IPxneAaMGhap0pFhF3NJ

### Level 4 -> 5

4oQYVPkxZOOEOO5pTW81FB8j8lxXGUQw
only readable human file -file00 to file09

### Level 5 -> 6

HWasnPhtq9AVKe0dmk45nxy20cvUa6EG
In the 'inhere' directory and has the following properties: human-readable, 1033 bytes in size, not executable
Use the `find` command: `find inhere/ -type f -readable -size 1033c ! -executable`
Then `cat` the file

### Level 6 -> 7

morbNTDkSW6jIlUc0ymOdMaLnOlFVAaj

Somewhere on the server with the following properties: owned by user bandit7, owned by group bandit6, 33 bytes in size.
Initially `find / -user bandit7 -group bandit6 -size 33c` then added `2>/dev/null` due to all the perms errors clogging up the results.

### Level 7 -> 8

in data.txt next to the word millionth... `grep -E "millionth" data.txt
dfwvzFQi4mU0wfNbFOe9RoWskMLg7eEc

### Level 8 -> 9

in data.txt the only unique line.
cat data.txt | sort | uniq -c | sort | tail -1
4CKMh1JI91bUIZZPXDqGanal4xvAg0JM

### Level 9 -> 10

The password for the next level is stored in the file data.txt in one of the few human-readable strings, preceded by several ‘=’ characters.
strings data.txt | grep -E "="
FGUW5ilLVJrxX9kMYMmlN4MgbpfMiqey

### Level 10 -> 11

The password for the next level is stored in the file data.txt, which contains base64 encoded data
base64 -d data.txt
dtR173fZKb0RRsDFSGsg2RWnpNVj3qRr

### Level 11 -> 12

The password for the next level is stored in the file data.txt, where all lowercase (a-z) and uppercase (A-Z) letters have been rotated by 13 positions
` cat data.txt | tr '[A-Za-z]' '[N-ZA-Mn-za-m]'`
7x16WNeHIi5YkIhWsfFIqoognUTyj9Q4

### Level 12 -> 13

The password for the next level is stored in the file data.txt, which is a hexdump of a file that has been repeatedly compressed. For this level it may be useful to create a directory under /tmp in which you can work. Use mkdir with a hard to guess directory name. Or better, use the command “mktemp -d”. Then copy the datafile using cp, and rename it using mv (read the manpages!)

```
mktemp -d
cp data.txt dir
mv data.txt dump
mv data.txt dump
xxd -r dump newdata
file newdata
# shows us
newdata: gzip compressed data, was "data2.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 574
mv newdata data.gz
gzip -d data.gz
# now the file is just data.
file data
# shows us data: bzip2 compressed data, block size = 900k
# We know the file is a bzip2.
mv data data.bz2
bzip2 -d data.bz2
# Then again file data shows us
data: gzip compressed data, was "data4.bin", last modified: Thu Sep 19 07:08:15 2024, max compression, from Unix, original size modulo 2^32 20480
# So we know the file is gzip
mv data data.gz
gzip -d data.gz
file data shows us data: POSIX tar archive (GNU)
mv data data.tar
tar -xf data.tar
# we now have data5.bin which we can use file on to find it is also a tar archive. so we do the same thing
tar -xf data5.bin
# Which leads us to getting data6.bin
# which using file on shows us it is back as a bzip2

bzip2 -d data6.bin
bzip2: Can't guess original name for data6.bin -- using data6.bin.out

# When we use file on data6.bin.out which is another tar archive
tar -xf data6.bin.out
# We now have data8.bin which is a compressed gzip
mv data8.bin data8.gz
gzip -d data8.gz
# Now we have the final ASCII text file with the password that we can get using cat.
FO5dwFsc0cbaIiH0h8J2eUks2vdTDwAn
```

### Level 14 -> 15

The password for the next level is stored in /etc/bandit_pass/bandit14 and can only be read by user bandit14. For this level, you don’t get the next password, but you get a private SSH key that can be used to log into the next level. Note: localhost is a hostname that refers to the machine you are working on.

`scp -P 2220 bandit13@bandit.labs.overthewire.org:sshkey.private .`
`ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220`
have to change permissions
`chmod 700 sshkey.private`
`ssh -i sshkey.private bandit14@bandit.labs.overthewire.org -p 2220`
