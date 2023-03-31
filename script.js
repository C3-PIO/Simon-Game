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
// HTML variable assignments 
const startBtn = document.querySelector('#start')
const nextBtn = document.querySelector('#next')
const resetBtn = document.querySelector('#reset')
const h1El = document.querySelector('h1')
const instEl = document.querySelector('.instructions')
const blockContainer = document.querySelector('#blocks')
const blocksEl = blockContainer.querySelectorAll('button')

//Block objects
const greenBlock = {
    element: document.getElementById('green'),
    index: 0,
    audio: document.querySelector('#green-audio'),  
    playAudio(){
        this.audio.playbackRate = 1.3
        this.audio.play()
    },
    // Clear block activation effect
    clearEffect(){
        this.element.style.boxShadow = ''
        this.element.style.backgroundColor = ''
    }
}

const redBlock = {
    element: document.getElementById('red'),
    index: 1,
    audio: document.querySelector('#red-audio'), 
    playAudio(){
        this.audio.playbackRate = 1.3
        this.audio.play()
    },
    clearEffect(){
        this.element.style.boxShadow = ''
        this.element.style.backgroundColor = ''
    }
}

const yellowBlock = {
    element: document.getElementById('yellow'),
    index: 2,
    audio: document.querySelector('#yellow-audio'), 
    playAudio(){
        this.audio.playbackRate = 1.3
        this.audio.play()
    },
    clearEffect(){
        this.element.style.boxShadow = ''
        this.element.style.backgroundColor = ''
    }
}

const blueBlock = {
    element: document.getElementById('blue'),
    index: 3,
    audio: document.querySelector('#blue-audio'), 
    playAudio(){
        this.audio.playbackRate = 1.3
        this.audio.play()
    }, 
    clearEffect(){ 
        this.element.style.boxShadow = ''
        this.element.style.backgroundColor = ''
    }
}

// Array of block objects 
blocksArr = [greenBlock, redBlock, yellowBlock, blueBlock]

// Game sequence array and function to generate random block for the sequence  
let gameSequence = []
function randomBlock(){
    block = blocksArr[Math.floor(Math.random() * blocksArr.length)].index
    gameSequence.push(block)
}
console.log(`Game Sequence \n ${gameSequence}`)

// Player's sequence. Number's added based on block selection 
let playerSequence = []
console.log(`Player Sequence \n ${playerSequence}`)

// Disable buttons 
function disableBtn(){
    for(i=0;i<blocksEl.length;i++){
        blocksEl[i].disabled = true
    }
}

// Enable buttons
function enableBtn(){
    for(i=0;i<blocksEl.length;i++){
        blocksEl[i].disabled = false
    }
}

function checkSequence(){
    if (playerSequence[playerSequence.length - 1] === gameSequence[playerSequence.length - 1] && playerSequence.length != 0){
        if (playerSequence.length === gameSequence.length){
            nextBtn.style.visibility = 'visible'
        }
        if (playerSequence.length === gameSequence.length && gameSequence.length === 15){
            alert("Congratulations, you've completed all levels! Click 'OK' to play again!") 
            location.reload()
        }
    } else {
        alert("Oops! That wasn't the correct sequence. Click 'OK' to try again.")
        location.reload()
    }
} 

// Loops through game sequence and highlight's block and activates the blocks audio based on objects index number 
function activateGameSequence(){
    nextBtn.style.visibility = 'hidden'
    disableBtn()
    let delayMultiplier = 600
    for (let i=0; i<gameSequence.length; i++){
        switch (gameSequence[i]){
        case 0:
            setTimeout(()=>{greenBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                greenBlock.playAudio()
                greenBlock.element.style.boxShadow = '-20px -20px 15px white'
                greenBlock.element.style.backgroundColor = 'rgb(0, 180, 0)'
            }, delayMultiplier - 200)
            break;
        case 1:
            setTimeout(()=>{redBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                redBlock.audio.volume = .25
                redBlock.playAudio()
                redBlock.element.style.boxShadow = '20px -20px 15px white'
                redBlock.element.style.backgroundColor = 'red'
            }, delayMultiplier - 300)
            break;
        case 2:
            setTimeout(()=>{yellowBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                yellowBlock.audio.volume = .25
                yellowBlock.playAudio()
                yellowBlock.element.style.boxShadow = '-20px 20px 15px white'
                yellowBlock.element.style.backgroundColor = 'yellow'
            }, delayMultiplier - 300)
            break;
        case 3:
            setTimeout(()=>{blueBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                blueBlock.audio.volume = .25
                blueBlock.playAudio()
                blueBlock.element.style.boxShadow = '20px 20px 15px white'
                blueBlock.element.style.backgroundColor = 'blue'
            }, delayMultiplier - 300)
            break;
        }
        delayMultiplier += 600
    }
    setTimeout(()=>{enableBtn()}, delayMultiplier)
}

// Game over/reset stipulation. Unclear atm where to place condition 
// if (gameSequence.length > 15){
//     alert("Congratulations, you've completed all levels! Click 'OK' to further test your skills...") // leave open for further game development to begin a new game with more levels and less time between block activations 
//     location.reload()
// }

//Click event for start button. Creates first piece of sequence array to begin game flow 
startBtn.addEventListener('click', () => {
    startBtn.style.visibility = 'hidden'
    instEl.style.visibility = 'hidden'
    randomBlock()
    activateGameSequence()
    h1El.textContent = `Level ${gameSequence.length} of 15`
    console.log(`Game Sequence \n ${gameSequence}`)
})

// Click event for next button
nextBtn.addEventListener('click', () => {
    playerSequence = []
    randomBlock()
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    activateGameSequence()
    console.log(`Game Sequence \n ${gameSequence}`)
    console.log(`Player Sequence \n ${playerSequence}`)
})

// Click event for reset button
resetBtn.addEventListener('click', () => {
    location.reload()
})

// Click events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array
greenBlock.element.addEventListener('click', () => {
    greenBlock.audio.volume = 1.0
    greenBlock.playAudio()
    playerSequence.push(greenBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
    checkSequence()
})

redBlock.element.addEventListener('click', () => {
    redBlock.audio.volume = .25
    redBlock.playAudio() 
    playerSequence.push(redBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
    checkSequence()
})

yellowBlock.element.addEventListener('click', () => {
    yellowBlock.audio.volume = .25
    yellowBlock.playAudio() 
    playerSequence.push(yellowBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
    checkSequence()
})

blueBlock.element.addEventListener('click', () => {
    blueBlock.audio.volume = .25
    blueBlock.playAudio()
    playerSequence.push(blueBlock.index)
    console.log(`Player Sequence \n ${playerSequence}`)
    checkSequence()
})