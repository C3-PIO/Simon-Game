# Simon-Game
## Summary
This game was created to complete a project during my Per Scholas software engineering bootcamp. The game demonstrates implementation of loops, if/else & switch statements, object oriented programming, as well as DOM manipulation.  

## How to Play
------------**Game flow**------------
1. Player clicks `start game`. Start button will generate the first game sequence number: corresponding block will highlight and corresponding block's audio will play. 
    - green block corresponds with 0 in the game sequence 
    - red block corresponds with 1
    - yellow block corresponds with 2
    - blue block corresponds with 3
2. After the game sequence plays, the player will be given an opportunity to select the correct sequence. When a color is selected, it highlights and its audio plays, then the corresponding color's index number is pushed into the player's sequence array. Player's sequence and the game sequence are then compared.
    - If sequences *match*: `next round` button displays, and when clicked, a new color index number is randomly generated and added to the game sequence, at which point step 2 is then repeated until the final level is reached. 
    - If sequences *don't match*: Wrong selection was made by the user (player's sequence != game sequence) and the game resets. 

## Technology
HTML, CSS, & Javascript 

## Building Process 
My starting notes and biggest obstacle were the original thoughts I jotted down as I was brainstorming how the game would operate. I used these notes as the coding blueprint and built upon the code as I progressed through each piece. 

--------------**STARTING NOTES**--------------
 - Create 4 blocks each of a different color (green, red, yellow, & blue)
 - Audio attached to each block that plays when clicked 

 - Create difficulty modes or just one mode??????
 - Create start button 

 - Create a next level/round button

 - Create a reset button 

 - Create array to hold computer sequence
 - Create function to randomly generate the sequence 

 - Click event
 - How to display the computer sequence -  Loop through sequence array and highlight color based on each index number?? 
 - Create array to hold player's sequence/choice  
 - If/else for correct choice - Player's sequence === computer's sequence???
   - How to add a new piece to the sequence based on IF passed level???
     - Next round becomes visible if correct choice(s) made, otherwise, message displayed indicating game lost and resets game.

------------**BIGGEST OBSTACLE**------------
 - How to allow user to create their sequence and then compare within the start and next events???

## Credits
 - Tishana Trainor for the inspiration to create this game
 - Kasper Kain and Dylan Comeau for assistance through my "Biggest Obstacle" and other code errors 
 - Free Code Map for the audio used 

