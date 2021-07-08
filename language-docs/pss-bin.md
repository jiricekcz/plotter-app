# Plotter Assembly to binary compiler
The only reason behind a binary compiler is to reduce the size of the plotter instruction directvite and thus the binary will fully represent the assembly code with some minor specifications of the plotter.
## Translations
### goto
The `goto` command is translated into the byte `0x20` and is followed by 8 bytes representing two unsigend LE integers - one for each axis, where 0 is 0 and 10000 is one millimeter.
### home
The `home` command is translated into the byte `0x1F`.
### push
The `push` command is translated into the byte `0xF0`.
### pull
The `pull` command is translated into the byte `0xF1`.
### end
The `end` command is translated into the byte `0xAA`.
### speed
The `speed` command is translated into the byte `0xB0` followed by 1 byte representing one unsigned char - percentage of the speed multiplier.
