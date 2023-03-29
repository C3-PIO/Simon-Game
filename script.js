//--------------STARTING NOTES-----------------
// Create 4 blocks each of a different color (green, red, yellow, & blue)
// Audio attached to each block that plays when clicked 

// Create difficulty modes or just one mode??????
// Create start button 

// Create a next level/round button

// Create a reset button 

// Create array to hold computer sequence
// Create function to randomly generate the sequence 

// Click event
// How to display the computer sequence -  Loop through sequence array and highlight color based on each index number?? 
// Create array to hold player's sequence/choice  
// If/else for correct choice - Player's sequence === computer's sequence???
    // How to add new piece to sequence based on IF passed level???
        // Next round becomes visible if correct choice(s) made, otherwise, message displayed indicating game lost and resets game. 

//------------Game flow steps-------------
// 1. Player clicks start. Start button will generate the first sequence number: corresponding block will highlight and corresponding block's audio will play . 
    // green block is 0
    // red block is 1
    // yellow block is 2
    // blue block is 3
// 2. After a delay (research time delay methods), the player will be given opportunity to select the correct sequence. When a color is selected, corresponding audio sound plays, and the corresponding color's index number is pushed to the player's sequence array. Player's sequence and the games sequence are then compared.
// 3. If match, next round button displays, and when clicked, new color index number is added to the sequence and corresponding blocks/audio will again highlight/play, at which point step 2 is then repeated until final level reached. Otherwise, wrong selection was made (player's sequence != game sequence) and the game resets

//-------------BIGGEST OBSTACLES-----------
        // How to assign block variable index number to corresponding number in the game sequence array???
        // How to allow player to create their sequence and then compare within the start and next events???

//--------------CODE---------------------
// Button and color block variables 
const startBtn = document.querySelector('.start')
const nextBtn = document.querySelector('.next')
const resetBtn = document.querySelector('.reset')
const greenBlock = document.querySelector('.green')
const redBlock = document.querySelector('.red')
const yellowBlock = document.querySelector('.yellow')
const blueBlock = document.querySelector('.blue')
const h1El = document.querySelector('h1')
const instEl = document.querySelector('.instructions')

// colorIndex = {
//     greenBlock: 0,
//     redBlock: 1,
//     yellowBlock: 2,
//     blueBlock: 3
// }

// Sequence varaiable and function to generate random sequence 
let gameSequence = []
function createSequence(){
    colorIndexNum = Math.floor(Math.random() * 4)
    gameSequence.push(colorIndexNum)
}
console.log(`Game Sequence \n ${gameSequence}`)

// Player's sequence. Number's added based on color block selection 
let playerSequence = []
console.log(`Player Sequence \n ${playerSequence}`)

// Highlight's block and activates the blocks audio 
function blockActivation(){

}

// Click events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array
greenBlock.addEventListener('click', () => {
    // something that plays green block's audio 
    playerSequence.push(0)
    console.log(`Player Sequence \n ${playerSequence}`)
})

redBlock.addEventListener('click', () => {
    // something that plays red block's audio  
    playerSequence.push(1)
    console.log(`Player Sequence \n ${playerSequence}`)
})

yellowBlock.addEventListener('click', () => {
    // something that plays yellow block's audio  
    playerSequence.push(2)
    console.log(`Player Sequence \n ${playerSequence}`)
})

blueBlock.addEventListener('click', () => {
    // something that plays blue block's audio // plays audio 
    playerSequence.push(3)
    console.log(`Player Sequence \n ${playerSequence}`)
})

// Game over/reset stipulation. Unclear atm where to place condition 
// if (gameSequence.length === 15){
//     alert("Congratulations, you've completed all levels! Click 'OK' to further test your skills...") // leave open for further game development to begin a new game with more levels and less time between block activations 
//     location.reload()
// }

// Click event for next button
nextBtn.addEventListener('click', () => {
    playerSequence = []
    createSequence()
    if (gameSequence.length > 15){
        alert("Congratulations, you've completed all levels! Click 'OK' to further test your skills...") // leave open for further game development to begin a new game with more levels and less time between block activations 
        location.reload()
    }
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    for (i=0; i<gameSequence.length; i++){
        // something to activate the sequence number's corresponding color so it highlights and the color's audio plays.
        // something to delay time between block activations 
    } 
    console.log(`Game Sequence \n ${gameSequence}`)
    console.log(`Player Sequence \n ${playerSequence}`)
})

// Click event for reset button
resetBtn.addEventListener('click', () => {
    location.reload()
})

//Click event for start button. Creates first piece of sequence array to behin game flow 
startBtn.addEventListener('click', () => {
    createSequence()
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    startBtn.style.visibility = 'hidden'
    instEl.style.visibility = 'hidden'
    // something to activate the sequence number's corresponding color so it highlights and the color's audio plays.
    // something to delay time between block activations 
    console.log(`Game Sequence \n ${gameSequence}`)
    // if (playerSequence === gameSequence){
    //     nextBtn.style.visibility = 'visible'
    // } else {
    //     alert("Oops! That wasn't the correct sequence. Click 'OK' to reset the game")
    //     location.reload()
    // }
})
