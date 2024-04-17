
let array = new Array(20)
let isPlayerFirst = true
let cellsWin = []

function start() {
    showSuccessToastPlay()
    cellsWin = []
    for(let i = 0; i < array.length; i++) {
        array[i] = new Array(20)
        for(let j = 0; j < array[i].length; j++) {
            array[i][j] = ""
        }
    }
    display();
    
    hours = 0
    minutes = 0
    seconds = 0
    clearInterval(timer)
    timer = setInterval(function() {
        updateTimer('timer')
    }, 1000)

    document.querySelector('.btn_play').innerText = "Chơi lại"
}

function display() {
    let tableString = `<table>`
    for(let i = 0; i < 10; i++) {
        tableString += `<tr>`
        for(let j = 0; j < 12; j++) {
            if(cellsWin.includes(`${i}-${j}`)) {
                if(array[i][j] === "X"){
                    tableString += `<td style="color: blue; background-color: lightgreen" onclick="play(${i}, ${j})">${array[i][j]}</td>`
                } else if(array[i][j] === "O") {
                    tableString += `<td style="color: red; background-color: lightgreen" onclick="play(${i}, ${j})">${array[i][j]}</td>`
                } else {
                    tableString += `<td  onclick="play(${i}, ${j})">${array[i][j]}</td>`
                }
            } else {
                if(array[i][j] === "X"){
                    tableString += `<td style="color: blue;" onclick="play(${i}, ${j})">${array[i][j]}</td>`
                } else if(array[i][j] === "O") {
                    tableString += `<td style="color: red;" onclick="play(${i}, ${j})">${array[i][j]}</td>`
                } else {
                    tableString += `<td  onclick="play(${i}, ${j})">${array[i][j]}</td>`
                }
            }
            
        }
        tableString += `</tr>`
    }
    tableString += `</table>`
   
    document.querySelector('.result').innerHTML = tableString

    if(isPlayerFirst) {
        document.querySelector(".player").innerText = 'X'
    } else {
        document.querySelector(".player").innerText = 'O'
    }

    console.log("tst", tableString)
}

function play(i, j) {
    // alert(i + ":" + j)
    if(cellIsEmpty(i, j)) {
        if(isPlayerFirst) {
            array[i][j] = "X"
            isPlayerFirst = !isPlayerFirst
            if(checkWin("X")) {
                // alert("X đã thắng")
                showSuccessToastWin("X")
            }
        } else {
            array[i][j] = "O"
            isPlayerFirst = !isPlayerFirst
            if(checkWin("O")) {
                // alert("O đã thắng")
                showSuccessToastWin("O")
            }
        }
    }else {
        // alert("Ô này đã đánh rồi, hãy chọn lại")
        showWarnToastTick()
    }
    
    //render lai du lieu
    display();
}

//check tai o do co trong hay ko 
function cellIsEmpty(i, j) {
    return array[i][j] === ""
}
function checkWin(value) {
    for(let i = 0; i < array.length; i++) {
        for(let j = 0; j < array[i].length; j++) {
            let checkCol = array[i][j] ===  value
                        && array[i+1][j] ===  value
                        && array[i+2][j] ===  value
                        && array[i+3][j] ===  value
            
            let checkRow = array[i][j] ===  value
                        && array[i][j+1] ===  value
                        && array[i][j+2] ===  value
                        && array[i][j+3] ===  value
            
            let checkRowRight = array[i][j] ===  value
                        && array[i+1][j+1] ===  value
                        && array[i+2][j+2] ===  value
                        && array[i+3][j+3] ===  value

            let checkRowLeft = array[i][j]==value
                        && array[i+1][j-1]== value
                        && array[i+2][j-2]==value
                        && array[i+3][j-3]==value
            
            if(checkCol) {
                cellsWin.push(`${i}-${j}`)
                cellsWin.push(`${i+1}-${j}`)
                cellsWin.push(`${i+2}-${j}`)
                cellsWin.push(`${i+3}-${j}`)
                return true
            }
            if(checkRow) {
                cellsWin.push(`${i}-${j}`)
                cellsWin.push(`${i}-${j+1}`)
                cellsWin.push(`${i}-${j+2}`)
                cellsWin.push(`${i}-${j+3}`)
                return true
            }
            if(checkRowRight) {
                cellsWin.push(`${i}-${j}`)
                cellsWin.push(`${i+1}-${j+1}`)
                cellsWin.push(`${i+2}-${j+2}`)
                cellsWin.push(`${i+3}-${j+3}`)
                return true
            }
            if(checkRowLeft) {
                cellsWin.push(`${i}-${j}`)
                cellsWin.push(`${i+1}-${j-1}`)
                cellsWin.push(`${i+2}-${j-2}`)
                cellsWin.push(`${i+3}-${j-3}`)
                return true
            }
        }

        
    }
    return false
}


let hours = 0
let minutes = 0
let seconds = 0
function updateTimer(idTag) {
    seconds++
    if(seconds >= 60) {
        seconds = 0;
        minutes++
    }
    if(minutes >= 60) {
        minutes = 0
        hours++
    }

    let formattedHours = hours < 10 ? "0" + hours : hours;
    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById(idTag).innerHTML = formattedHours + ":" + formattedMinutes + ":" + formattedSeconds;
}

function toast (
    {
        title = '', 
        message = '',
        type = '', 
        duration = '',
    }
) {

    const main = document.getElementById('toast')
    if(main)
    {
        const toast = document.createElement('div')

        const delayAdd = 1000;
        const autoRemoveId = setTimeout(() => {
            main.removeChild(toast);
        }, duration + delayAdd);

        toast.onclick = (e) => {
            if(e.target.closest('.toast__close'))
            {
                toast.classList.add('disable');
            }
        }

        const anima = (duration/1000).toFixed(2)
        toast.style.animation = `sliderInleft ease .3s, fadeOut linear 1s ${anima}s forwards`;
    
        
        const icons = {
            success: 'fas fa-solid fa-check',
            warning: 'fas fa-circle-exclamation',
        }

        const icon = icons[type]

        toast.classList.add("toast", `toast__${type}`);
        toast.innerHTML = `
            <div class="toast__icon">
                <i class="${icon}"></i>
            </div>
            <div class="toast__body">
                <h3 class="toast__title">${title}</h3>
                <p class="toast__msg">${message}</p>
            </div>
            <div class="toast__close">
                <i class="fa-solid fa-xmark"></i>
            </div>
            </div>
        `
        main.appendChild(toast)
    }
    

}

// toast({
//     title: 'success', 
//     message: 'you look so good',
//     type:'success',
//     duration: 3000
// })

// toast({
//     title: 'warning', 
//     message: 'you look so good',
//     type:'warning',
//     duration: 3000
// })


function showSuccessToastPlay() {
    toast({
        title: 'Thành công', 
        message: 'Bạn đã bắt đầu trò chơi',
        type:'success',
        duration: 5000
    })
}

function showSuccessToastWin(value) {
    toast({
        title: 'Chiến thắng', 
        message: `Chúc mừng ${value} đã chiến thắng`,
        type:'success',
        duration: 10000
    })
}


function showWarnToastTick() {
    toast({
        title: 'Cảnh báo', 
        message: 'Ô này đã được đánh rồi, hãy chọn lại',
        type:'warning',
        duration: 3000
    })
}
