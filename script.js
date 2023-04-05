// DOM variable assignments 
const resetBtn = document.querySelector('#reset')
const nextBtn = document.querySelector('#next')
const h1El = document.querySelector('h1')
const blockContainer = document.querySelector('#blocks')
const blocksEl = blockContainer.querySelectorAll('.block')

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

// Re-enables blocks and block effects    
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
            clearInterval(time) // stops timer
            alert("Simon doesn't have all day...")
            location.reload()
        }
    }, 1000)
}

// Event for mute button to turn block audio on/off based on a click counter. Odd count # = muted. Even count # = unmuted  
const muteBtn = document.querySelector('#mute')
let counter = 0
muteBtn.addEventListener('click', ()=>{
    const audioEl = document.querySelectorAll('audio')
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

// This is where the magic happens. For loop/switch statement loop through and check the game sequence array to fire the corresponding block's "activation effect", i.e. play the block audio, add the block shadow effect, and highlight the block. 
function activateGameSequence(){
    nextBtn.style.visibility = 'hidden' // re-hide next round button
    disableBtn() 
    let delayMultiplier = 600 // time variable used to create delay between each blocks activation 
    for (let i=0; i<gameSequence.length; i++){
        switch (gameSequence[i]){ // Parameter set to the game sequence loop. Each case is based on the blocks index number 
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
        delayMultiplier += 600 // increases delay multiplier each game sequence iteration so that the enable btn and timer functions won't be called until the entire game sequence has played through 
    }
    // 600 millisecond deductions needed to prevent slight delays between game sequence end and each function. Removal of the slight delay was needed to correct a bug that would occur in the very beginning of the game if the player selected the first block in the sequence too quickly, causing the clearInterval(time) method to fire before the timer was called. 
    setTimeout(()=>{enableBtn()}, delayMultiplier - 600)  
    setTimeout(()=>{timer()}, delayMultiplier - 600) 
}

// Event for difficulty selection. Difficulty based on click count 
const difficultyBtn = document.querySelector('#difficulty')
let count = 0
let difficulty = []
difficultyBtn.addEventListener('click', ()=>{
    const easy = 5
    const medium = 10
    const hard = 15
    count ++
    if (count === 1){
        difficulty.push(easy)
        difficultyBtn.textContent = 'Easy'
        console.log(difficulty)
    } else if (count === 2){
        difficulty.pop()
        difficulty.push(medium)
        difficultyBtn.textContent = 'Medium'
        console.log(difficulty)
    } else if (count === 3){
        difficulty.pop()
        difficulty.push(hard)
        difficultyBtn.textContent = 'Hard'
        console.log(difficulty)
    } else {
        difficulty.pop()
        count = 0
        difficultyBtn.textContent = 'Select Difficulty'
        console.log(difficulty)
    }
})

// Checks that the last number of each sequence matches AND that each sequence is the same length. If match, next button becomes available, otherewise, game over text box is shown to rest the game
function checkSequence(){
    if (playerSequence[playerSequence.length - 1] === gameSequence[playerSequence.length - 1]){
        if (playerSequence.length === gameSequence.length){
            nextBtn.style.visibility = 'visible'
            disableBtn()
        }
        if (playerSequence.length === gameSequence.length && gameSequence.length === difficulty[0]){ // Win state based on sequence length of 15
            document.querySelector('#game-won').style.visibility = 'visible' // Shows hidden game-won div
            resetBtn.style.visibility = 'hidden'
            nextBtn.style.visibility = 'hidden'
            difficultyBtn.style.visibility = 'hidden'
            h1El.textContent = `YOU WIN!!` 
            document.querySelector('.reset1').addEventListener('click', ()=>{
                location.reload()
            })
        }
    } else {
        document.querySelector('#game-over').style.visibility = 'visible' // Shows hidden game-over div
        resetBtn.style.visibility = 'hidden'
        document.querySelector('.reset').addEventListener('click', ()=>{
            location.reload()
        })
    }
} 

// Event for start button. Hides start button and instructions and creates first piece of game sequence array to begin game flow 
const startBtn = document.querySelector('#start')
startBtn.addEventListener('click', () => {
    startBtn.style.visibility = 'hidden'
    difficultyBtn.style.visibility = 'hidden'
    if (difficulty[0] === undefined){
        difficulty[0] = 10
    }
    document.querySelector('.instructions').style.visibility = 'hidden'
    randomBlock()
    activateGameSequence()
    console.log(gameSequence)
    h1El.textContent = `Level ${gameSequence.length} of ${difficulty[0]}`
})

// Event for next button. Clears player sequence from previoius round and adds new block to the game sequence. 
nextBtn.addEventListener('click', () => {
    playerSequence = []
    randomBlock()
    h1El.textContent = `Level ${gameSequence.length} of ${difficulty[0]}` 
    activateGameSequence()
    console.log(gameSequence)
})

// Events for each block. Corresponding block's audio plays and block index number is pushed into the playerSequence array. Block highlight and shadow effect occur through CSS hover & active styling. 
greenBlock.element.addEventListener('click', () => {
    greenBlock.audio.volume = 1.0
    greenBlock.playAudio()
    playerSequence.push(greenBlock.index)
    clearInterval(time)
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

// Click event for reset button to reset game at any time
resetBtn.addEventListener('click', () => {
    location.reload()
})