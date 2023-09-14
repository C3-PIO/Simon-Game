# [Simon-Game](https://c3-pio.github.io/Simon-Game/)
## Summary
This game was created to complete a project during my Per Scholas software engineering bootcamp. The game demonstrates implementation of loops, if/else & switch statements, object oriented programming, as well as DOM manipulation.  

## How to Play
------------**Game flow and Description**------------
1. Player selects their desired difficulty then clicks `start game`. Start button will generate the first game sequence number, at which point, the corresponding block will highlight and it's sound will play. 
    - green block corresponds with 0 in the game sequence 
    - red block corresponds with 1
    - yellow block corresponds with 2
    - blue block corresponds with 3
2. After the game sequence plays, the player will be given an opportunity to select the correct sequence. When a color is selected, it highlights and its sound plays, then the corresponding color's index number is pushed into the player's sequence array. Player's sequence is then compared with the game sequence.
    - If sequences *match*: `next round` button displays, and when clicked, a new color index number is randomly generated and added to the game sequence, at which point step 2 is then repeated until the final level is reached. 
    - If sequences *don't match*: Wrong selection was made by the user (player's sequence != game sequence) and the game resets. 

## Technology
HTML, CSS, & Javascript 

## Building Process 
The "Starting Notes" and "Biggest Obstacle" sections below were my first thoughts as I was brainstorming how the game would look and operate. These notes acted as my original blueprint. I built upon that starting blueprint up until I hit a wall in javascript related to the game flow functionality I was hoping to achieve. After discussing my code with an instructor, the "Back to the Drawing Board" notes were steps provided as a means to guide me through creating the game flow functionality I envisioned. After I eventually fixed the functionality, additional features like screen responsiveness, sound control, text-box pop-ups (opposed to screen alerts), and difficulty selection were then added. 

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
 - How to allow user to create their sequence and then compare between the start and next events???

----------**BACK TO THE DRAWING BOARD**----------
1. Make all squares individual objects with their respective properties. EG. Color, index, etc
2. Push all objects into an array for easy tracking. (This avoids having to do math stuff)
3. Make a function that randomly selects an object from the array, and queues the next move
4. Use setInterval to call the function multiple times after a delay
5. When the setInterval is finished, release controls to the player with a boolean
6. Lock the controls while the computer is playing with the same boolean

## Credits
 - Tishana Trainor for the inspiration to create this game
 - Kasper Kain and Dylan Comeau for assistance through my "Biggest Obstacle" and other code errors 
 - Free Code Map for the audio used 
