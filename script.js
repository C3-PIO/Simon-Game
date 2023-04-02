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
// DOM variable assignments 
const startBtn = document.querySelector('#start')
const nextBtn = document.querySelector('#next')
// const resetBtn = document.querySelector('#reset')
const muteBtn = document.querySelector('#mute')
const h1El = document.querySelector('h1')
const instEl = document.querySelector('.instructions')
const blockContainer = document.querySelector('#blocks')
const blocksEl = blockContainer.querySelectorAll('.block')
const audioEl = document.querySelectorAll('audio')

// Object for each colored block 
const greenBlock = {
    element: document.getElementById('green'),
    index: 0,
    audio: document.querySelector('#green-audio'),  
    playAudio(){
        this.audio.playbackRate = 1.3
        this.audio.play()
    },
    // Removes block activation effects
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

// Click event for mute button to toggle block audio on/off
let counter = 0
muteBtn.addEventListener('click', ()=>{
    counter ++
    for (i=0; i<audioEl.length; i++){
        if (counter % 2 != 0){
            audioEl[i].muted = true
            muteBtn.textContent = 'Sound ON'
        } else {
            audioEl[i].muted = false 
            muteBtn.textContent = 'Sound OFF'
        }
    }
})

// Array of block objects 
blocksArr = [greenBlock, redBlock, yellowBlock, blueBlock]

// Game sequence array and function to generate random block index for the sequence  
let gameSequence = []
function randomBlock(){
    block = blocksArr[Math.floor(Math.random() * blocksArr.length)].index
    gameSequence.push(block)
}

// Player's sequence. Number's added based on user's block selection 
let playerSequence = []

// Disables blocks 
function disableBtn(){
    for(i=0;i<blocksEl.length;i++){
        blocksEl[i].disabled = true // disables block clicks
        blocksEl[i].classList.add('disabled') // adds disabled class to each block to null the CSS hover and active styling (block highlight and shadow can't happen during game sequence no matter what user does with their mouse)
    }
}

// Enable button function to remove disable button effects 
function enableBtn(){
    for(i=0;i<blocksEl.length;i++){
        blocksEl[i].disabled = false
        blocksEl[i].classList.remove('disabled')
    }
}

// Timer to reset game if player takes more than 5 seconds to begin playing 
function timer(){
    secs = 0
    time = setInterval(()=>{
        this.secs++
        if (this.secs>5){
            clearInterval(time)
            alert("Simon doesn't have all day...")
            location.reload()
        }
    }, 1000)
}

// This is where the magic happens. The for loop and switch statement loop through and check the game sequence index array to fire the corresponding block's "activation effect", i.e. play the block audio, add the block shadow effect, and highlight the block. 
function activateGameSequence(){
    nextBtn.style.visibility = 'hidden' // re-hide next round button
    disableBtn() // Disables blocks so player cannot interrupt the game sequence 
    let delayMultiplier = 600 // variable used to create delay between each blocks activation 
    for (let i=0; i<gameSequence.length; i++){
        switch (gameSequence[i]){ // switch parameter set to each element of the game sequence thanks to the for loop. Each case is based on the blocks index number 
        case 0: // index 0 corresponds with the green block, so the green blocks animation will begin  
            setTimeout(()=>{greenBlock.clearEffect()}, delayMultiplier) // clears animation effect soon after it fires  
            setTimeout(()=>{
                greenBlock.playAudio()
                greenBlock.element.style.boxShadow = '-20px -20px 15px white' // add's shadow effect 
                greenBlock.element.style.backgroundColor = 'rgb(0, 180, 0)' // add's highlight effect 
            }, delayMultiplier - 300) 
            break;
        case 1: // index 1 corresponds with the red block
            setTimeout(()=>{redBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                redBlock.audio.volume = .25
                redBlock.playAudio()
                redBlock.element.style.boxShadow = '20px -20px 15px white'
                redBlock.element.style.backgroundColor = 'red'
            }, delayMultiplier - 300)
            break;
        case 2: // index 1 corresponds with the yellow block
            setTimeout(()=>{yellowBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                yellowBlock.audio.volume = .25
                yellowBlock.playAudio()
                yellowBlock.element.style.boxShadow = '-20px 20px 15px white'
                yellowBlock.element.style.backgroundColor = 'yellow'
            }, delayMultiplier - 300)
            break;
        case 3: // index 1 corresponds with the blue block
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
    setTimeout(()=>{enableBtn()}, delayMultiplier - 500) // returns block access after game sequence is finished playing through 
    setTimeout(()=>{timer()}, delayMultiplier) // starts 5 second timer 
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

//Click event for start button. Hides start button and instructions and creates first piece of game sequence array to begin game flow 
startBtn.addEventListener('click', () => {
    startBtn.style.visibility = 'hidden'
    instEl.style.visibility = 'hidden'
    randomBlock()
    activateGameSequence()
    h1El.textContent = `Level ${gameSequence.length} of 15`
})

// Click event for next button. Clears player sequence from previoius round and adds new block to the game sequence. 
nextBtn.addEventListener('click', () => {
    playerSequence = []
    randomBlock()
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    activateGameSequence()
})

// Click events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array. Block highlight and shadow effect occur through CSS hover & active styling. 
greenBlock.element.addEventListener('click', () => {
    greenBlock.audio.volume = 1.0
    greenBlock.playAudio()
    playerSequence.push(greenBlock.index)
    clearInterval(time) // stops timer 
    checkSequence()
})

redBlock.element.addEventListener('click', () => {
    redBlock.audio.volume = .25
    redBlock.playAudio() 
    playerSequence.push(redBlock.index)
    clearInterval(time)
    checkSequence()
})

yellowBlock.element.addEventListener('click', () => {
    yellowBlock.audio.volume = .25
    yellowBlock.playAudio() 
    playerSequence.push(yellowBlock.index)
    clearInterval(time)
    checkSequence()
})

blueBlock.element.addEventListener('click', () => {
    blueBlock.audio.volume = .25
    blueBlock.playAudio()
    playerSequence.push(blueBlock.index)
    clearInterval(time)
    checkSequence()
})

// Click event for reset button
// resetBtn.addEventListener('click', () => {
//     location.reload()
// })