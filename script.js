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

//----------BACK TO THE DRAWING BOARD------------
// 1. Make all squares individual objects with their respective properties. EG. Color, index, etc
// 2. Push all objects into an array for easy tracking. (This avoids having to do math stuff)
// 3. Make a function that randomly selects an object from the array, and queues the next move
// 4. Use setInterval to call the function multiple times after a delay
// 5. When the setInterval is finished, release controls to the player with a boolean
// 6. Lock the controls while the computer is playing with the same boolean

//--------------CODE---------------------
// HTML variables 
const startBtn = document.querySelector('.start')
const nextBtn = document.querySelector('.next')
const resetBtn = document.querySelector('.reset')
const h1El = document.querySelector('h1')
const instEl = document.querySelector('.instructions')

//Block objects
greenBlock = {
    element: document.querySelector('.green'),
    index: 0,
    audio: document.querySelector('#green-audio'),  
    playAudio(){
        this.audio.play()
    },
    clearShadow(){
        this.element.style.boxShadow = ''
    }
}

redBlock = {
    element: document.querySelector('.red'),
    index: 1,
    audio: document.querySelector('#red-audio'), 
    playAudio(){
        this.audio.play()
    },
    clearShadow(){
        this.element.style.boxShadow = ''
    }
}

yellowBlock = {
    element: document.querySelector('.yellow'),
    index: 2,
    audio: document.querySelector('#yellow-audio'), 
    playAudio(){
        this.audio.play()
    },
    clearShadow(){
        this.element.style.boxShadow = ''
    }
}

blueBlock = {
    element: document.querySelector('.blue'),
    index: 3,
    audio: document.querySelector('#blue-audio'), 
    playAudio(){
        this.audio.play()
    },
    clearShadow(){
        this.element.style.boxShadow = ''
    }
}

// Blocks Array
blocksArr = [greenBlock, redBlock, yellowBlock, blueBlock]

// Sequence varaiable and function to generate random sequence 
let gameSequence = []
function randomBlock(){
    block = blocksArr[Math.floor(Math.random() * blocksArr.length)].index
    gameSequence.push(block)
}
console.log(`Game Sequence \n ${gameSequence}`)

// Player's sequence. Number's added based on color block selection 
let playerSequence = []
console.log(`Player Sequence \n ${playerSequence}`)

// Highlight's block and activates the blocks audio 
function activateBlock(){
    for (let i=0; i<gameSequence.length; i++){
        if (gameSequence[i] === 0){
            greenBlock.playAudio()
            greenBlock.element.style.boxShadow = '-20px -20px 15px white'
            // setTimeout(greenBlock.clearShadow(), 3000)
        } else if (gameSequence[i] === 1){
            redBlock.audio.volume = .25
            redBlock.playAudio()
            redBlock.element.style.boxShadow = '20px -20px 15px white'
            // setTimeout(redBlock.clearShadow(), 3000)
        } else if (gameSequence[i] === 2){
            yellowBlock.audio.volume = .25
            yellowBlock.playAudio()
            yellowBlock.element.style.boxShadow = '-20px 20px 15px white'
            // setTimeout(yellowBlock.clearShadow(), 3000)
        } else {
            blueBlock.audio.volume = .25
            blueBlock.playAudio()
            blueBlock.element.style.boxShadow = '20px 20px 15px white'
            // setTimeout(blueBlock.clearShadow(), 3000)
        }
    }
}

// Click events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array
greenBlock.element.addEventListener('click', () => {
    greenBlock.audio.volume = 1.0
    greenBlock.playAudio()
    playerSequence.push(greenBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
})

redBlock.element.addEventListener('click', () => {
    redBlock.audio.volume = .25
    redBlock.playAudio() 
    playerSequence.push(redBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
})

yellowBlock.element.addEventListener('click', () => {
    yellowBlock.audio.volume = .25
    yellowBlock.playAudio() 
    playerSequence.push(yellowBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
})

blueBlock.element.addEventListener('click', () => {
    blueBlock.audio.volume = .25
    blueBlock.playAudio()
    playerSequence.push(blueBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
})

// Game over/reset stipulation. Unclear atm where to place condition 
// if (gameSequence.length > 15){
//     alert("Congratulations, you've completed all levels! Click 'OK' to further test your skills...") // leave open for further game development to begin a new game with more levels and less time between block activations 
//     location.reload()
// }

// Click event for next button
nextBtn.addEventListener('click', () => {
    playerSequence = []
    randomBlock()
    if (gameSequence.length > 15){
        alert("Congratulations, you've completed all levels! Click 'OK' to further test your skills...") // leave open for further game development to begin a new game with more levels and less time between block activations 
        location.reload()
    }
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    setInterval(activateBlock(), 2000)
    console.log(`Game Sequence \n ${gameSequence}`)
    console.log(`Player Sequence \n ${playerSequence}`)
})

// Click event for reset button
resetBtn.addEventListener('click', () => {
    location.reload()
})

//Click event for start button. Creates first piece of sequence array to begin game flow 
startBtn.addEventListener('click', () => {
    startBtn.style.visibility = 'hidden'
    instEl.style.visibility = 'hidden'
    randomBlock()
    h1El.textContent = `Level ${gameSequence.length} of 15`
    console.log(`Game Sequence \n ${gameSequence}`)
    gameInterval = setInterval(activateBlock(), 1500)
    clearInterval(gameInterval)
    // if (playerSequence === gameSequence){
    //     nextBtn.style.visibility = 'visible'
    // } else {
    //     alert("Oops! That wasn't the correct sequence. Click 'OK' to reset the game")
    //     location.reload()
    // }
})

