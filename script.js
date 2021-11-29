const body = document.querySelector('body')
const btnReset = document.createElement('button')
const btnClear = document.createElement('button')
const options = document.createElement('div')
const board = document.createElement('div')

board.setAttribute('class', 'grid')
options.setAttribute('class', 'options')
btnReset.textContent = 'Reset'
btnClear.textContent = 'Clear'
btnReset.setAttribute('class', 'reset')
btnClear.setAttribute('class', 'clear')
body.appendChild(options)
options.appendChild(btnReset)
options.appendChild(btnClear)
body.appendChild(board)
let height = 16
let width = 16
createGrid()
draw()

function createGrid() {
    for (let i = 0; i < height; i++) {
        const newContainer = document.createElement('div')
        newContainer.setAttribute('class', 'container')
        board.appendChild(newContainer)
        setTimeout(() => {
            for (let j = 0; j < width; j++) {
                const box = document.querySelectorAll('.container')
                const newBox = document.createElement('div')
                newBox.setAttribute('class', 'box')
                box[j].appendChild(newBox);
            }
        }, 1);    
    }
}

let newRed = []
let newGreen = []
let newBlue = []

function draw() {
    setTimeout(() => {
        const board = document.querySelectorAll('.box')
        for (let i = 0; i < board.length; i++) {
            board[i].addEventListener('mouseover', function () {
                red = Math.round(Math.random()*255)
                green = Math.round(Math.random()*255)
                blue = Math.round(Math.random()*255)
                randomRGB = `rgb(${red}, ${green}, ${blue})`
            if (board[i].style.backgroundColor == '') {
                board[i].style.backgroundColor = randomRGB
                newRed[i] = red * 0.105
                newGreen[i] = green * 0.105
                newBlue[i] = blue * 0.105
                }
            else {
                let newRGB = board[i].style.backgroundColor.substring(4, 
                             board[i].style.backgroundColor.length - 1)
                let darkRed = newRGB.substring(0, newRGB.indexOf(','))
                let darkGreen = newRGB.substring(newRGB.indexOf(',') + 2, newRGB.lastIndexOf(','))
                let darkBlue = newRGB.substring(newRGB.lastIndexOf(',') + 2)
                let darken = `rgb(${darkRed - newRed[i]},
                                  ${darkGreen - newGreen[i]},
                                  ${darkBlue - newBlue[i]})`
                board[i].style.backgroundColor = darken
            }
        })   
        }
    }, 1);
}

btnReset.addEventListener('click', reset)

function reset(squares) {
    squares = window.prompt('Chose a number between 1 and 64')
    if (isNaN(squares) || squares % 1 != 0 || squares < 1 || squares > 64) {
        reset(squares)
    }
    else {
        for (let i = 0; i < width; i++) {
            const container = document.querySelectorAll('.container')
            let child = container[i].lastElementChild; 
                while (child) {
                    container[i].removeChild(child);
                    child = container[i].lastElementChild;
                }
            setTimeout(() => {
                const grid = document.querySelector('.grid')
                let child = grid.lastElementChild; 
                while (child) {
                    grid.removeChild(child);
                    child = grid.lastElementChild;
                }
            }, 1);
        }
        setTimeout(() => {
            width = +squares
            height = +squares
            createGrid()
            draw()
        }, 2);
    }
}

btnClear.addEventListener('click', clear)

function clear() {
    for (let i = 0; i < width * height; i++) {
        const boxes = document.querySelectorAll('.box')
        boxes[i].style.backgroundColor = ""
    }
}