// DOM variable assignments 
const startBtn = document.querySelector('#start')
const nextBtn = document.querySelector('#next')
const resetBtn = document.querySelector('#reset')
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

// Click event for mute button to turn block audio on/off based on a click counter. Odd count # = muted. Even count # = unmuted  
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
disableBtn() // Blocks must start disabled so that user cannot begin player sequence until start btn is clicked 

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
    let delayMultiplier = 600 // time variable used to create delay between each blocks activation 
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
        case 2: // index 2 corresponds with the yellow block
            setTimeout(()=>{yellowBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                yellowBlock.audio.volume = .25
                yellowBlock.playAudio()
                yellowBlock.element.style.boxShadow = '-20px 20px 15px white'
                yellowBlock.element.style.backgroundColor = 'yellow'
            }, delayMultiplier - 300)
            break;
        case 3: // index 3 corresponds with the blue block
            setTimeout(()=>{blueBlock.clearEffect()}, delayMultiplier)
            setTimeout(()=>{
                blueBlock.audio.volume = .25
                blueBlock.playAudio()
                blueBlock.element.style.boxShadow = '20px 20px 15px white'
                blueBlock.element.style.backgroundColor = 'blue'
            }, delayMultiplier - 300)
            break;
        }
        delayMultiplier += 600 // increases delay multiplier each game sequence iteration so that the enable btn and timer function will only activate once the entire game sequence has played through 
    }
    setTimeout(()=>{enableBtn()}, delayMultiplier - 600) // returns block access after game sequence is finished playing through. 600 millisecond deduction needed to prevent slight delay between game sequence play through and blocks being accessible  
    setTimeout(()=>{timer()}, delayMultiplier - 600) // starts 5 second timer. 600 millisecond deduction needed to prevent slight delay between game sequence play through and timer starting. Removal of the slight delay was needed to correct a bug that would occur in the very beginning of the game if the player selected the first block in the sequence too quickly, causing the clearInterval(time) function to fire before the timer was ever called. 
}

// Checks that the last number of each sequence matches AND that each sequence is the same length. If parameters not met, then wrong sequence selection was made and alert fires to reset game
function checkSequence(){
    if (playerSequence[playerSequence.length - 1] === gameSequence[playerSequence.length - 1]){
        if (playerSequence.length === gameSequence.length){
            nextBtn.style.visibility = 'visible'
        }
        if (playerSequence.length === gameSequence.length && gameSequence.length === 15){ // Win state based on sequence length of 15
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
    console.log(gameSequence)
    h1El.textContent = `Level ${gameSequence.length} of 15`
})

// Click event for next button. Clears player sequence from previoius round and adds new block to the game sequence. 
nextBtn.addEventListener('click', () => {
    playerSequence = []
    randomBlock()
    h1El.textContent = `Level ${gameSequence.length} of 15` 
    activateGameSequence()
    console.log(gameSequence)
})

// Click events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array. Block highlight and shadow effect occur through CSS hover & active styling. 
greenBlock.element.addEventListener('click', () => {
    greenBlock.audio.volume = 1.0
    greenBlock.playAudio()
    playerSequence.push(greenBlock.index)
    clearInterval(time) // stops timer
    // setTimeout(()=>{timer()}, 500) // Originally included to start the timer again between block selections, but desired functionality does not occur. 
    console.log(playerSequence)
    checkSequence()
})

redBlock.element.addEventListener('click', () => {
    redBlock.audio.volume = .25
    redBlock.playAudio() 
    playerSequence.push(redBlock.index)
    clearInterval(time)
    // setTimeout(()=>{timer()}, 500)
    console.log(playerSequence)
    checkSequence()
})

yellowBlock.element.addEventListener('click', () => {
    yellowBlock.audio.volume = .25
    yellowBlock.playAudio() 
    playerSequence.push(yellowBlock.index)
    clearInterval(time)
    // setTimeout(()=>{timer()}, 500)
    console.log(playerSequence)
    checkSequence()
})

blueBlock.element.addEventListener('click', () => {
    blueBlock.audio.volume = .25
    blueBlock.playAudio()
    playerSequence.push(blueBlock.index)
    clearInterval(time)
    // setTimeout(()=>{timer()}, 500)
    console.log(playerSequence)
    checkSequence()
})

// Click event for reset button
resetBtn.addEventListener('click', () => {
    location.reload()
})