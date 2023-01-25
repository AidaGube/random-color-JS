const cols = document.querySelectorAll('.col');
// addewentlistener это событие какое событие передали у event  есть метод code  в которой хранятся все коды нашей клавиатуры
// меняем цвет при нажатии на пробел  event он отслеживает действия в браузере через клавиатуру 
document.addEventListener('keydown', (event) => {
    event.preventDefault()
    if (event.code.toLocaleLowerCase() === 'space') {
        setRandomColors()
    }
})

//при нажатии на замок , код для работы с замком метод classList
// сначала создаем аш2 и создаем надпись через textcontent
// таргет это элемент h2 как узнать? мы передаем copy мы передаем и он лежит в h2
document.addEventListener('click', (event) => {
    const type = event.target.dataset.type
    if (type === 'lock') {
        const node = event.target.tagName.toLocaleLowerCase() === 'i'
            ? event.target : event.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyText(event.target.textContent)
    }
})
 
function copyText(text) {
    return navigator.clipboard.writeText(text)
}

// обьект который называется ньюдейт работа с матиматическими действия и округляет Math.floor
function generateRandomColor() {
    const randColor = '0123456789ABCDEF'
    let color = ''
    for (let i = 0; i < 6; i++) {
        // #FFFFF rgb
        color += randColor[Math.floor(Math.random() * randColor.length)] // генерация чисел math random
    }
    return '#' + color
}

// самая большая фишка фунции это то что мы можем ее кажды0
function setRandomColors() {
    cols.forEach(col => {
        const isLocked = col.querySelector('i').classList.contains('fa-lock')
        const color = generateRandomColor()
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        // const color2 = chroma.random()
        if (isLocked) {
            return
        } // результат всегда будет возвращать тру 
        text.textContent = color
        col.style.background = color
        setTextColor(text, color)
        setTextColor(button, color)
    })
}

function setTextColor(text, color) {
    const luminance = chroma(color).luminance()  //люминансе метод
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

function getColorsFromHash() {
    if (document.location.hash.length > 1){
        return document.location.hash.substring(1).split('-').map(col => '#' + col)
    }
    return []
}

setRandomColors()