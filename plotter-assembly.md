# The Plotter Assembly language
The plotter assembly language is the low-level subset of commands to the plotter. It will be compiled directly into a binary, that can the plotter can interpret and run. It will be based on linear commands, one command per line.

## Commands
These are all the commands the plotter assembly language supports.
### goto  
The `goto` command is used to move the print head to a location. It will be run with two arguments - X and Y, both being float numbers in millimeters not exceeding the maximum dimenstions of the plotter.  
Example: 
```
goto 12.345534 14.323553
```
### home
The `home` command is used to get the print head to the home position [0, 0] and optionaly calibrate the axies.  
Example:
```
home
```

### push
The `push` command is used to push the print head down thus start printing. If this command is called when the print head is not retracted, it should be ignored.  
Example:  
```
push
```

### pull 
The `pull` command is used to retract the print head thus stopping the printing. If this command is called when the print head is retracted, it should be ignored.  
Example:  
```
pull
```

### end
The `end` command is used to end the print and tell the plotter to terminate the action.  
Example:  
```
end
```

### speed
The `speed` command is used to change the movement speed of the print head. It is called with one argument - V (the speed multiplier). V is an absolute multiplier of the plotter speed. To reset the speed to default, call `speed 1`.  
Example:  
```
speed 2.5
```
