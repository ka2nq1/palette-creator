const cols = document.querySelectorAll('.col');

document.addEventListener('keydown', (e) => {
    if (e.code.toLowerCase() === 'space' || e.code.toLocaleLowerCase() === 'enter') {
        e.preventDefault()
        setRandomColors()
    } 
})

document.addEventListener('click', e => {
    const type = e.target.dataset.type
    if (type === 'lock') {
        const node = e.target.tagName.toLowerCase() === 'i' ?
            e.target
            :
            e.target.children[0]
        node.classList.toggle('fa-lock-open')
        node.classList.toggle('fa-lock')
    } else if (type === 'copy') {
        copyToClipboard(e.target.textContent)
    }
})

// const generateRandomColor = () => {
//     const hexCodes = '0123456789ABCDEF'
//     let color = ''
//     for (let i = 0; i < 6; i++) {
//         color += hexCodes[Math.floor(Math.random() * hexCodes.length)]
//     }
//     return '#' + color
// }

const copyToClipboard = (text) => {
    return navigator.clipboard.writeText(text)
}

const setRandomColors = (isInitial) => {
    const colors = isInitial ? getColorFromHash() : []
    cols.forEach((col, index) => {
        const islocked = col.querySelector('i').classList.contains('fa-lock')
        const text = col.querySelector('h2')
        const button = col.querySelector('button')
        
        if (islocked) {
            colors.push(text.textContent)
            return
        }

        const color = isInitial
        ? colors[index] ?
            colors[index]
            :
            chroma.random()
        : chroma.random()

        if (!isInitial) {
            colors.push(color)
        }

        text.textContent = color
        col.style.background = color

        setTextColor(text, color)
        setTextColor(button, color)

        updateColorsHash(colors)
    })
}

const setTextColor = (text, color) => {
    const luminance = chroma(color).luminance()
    text.style.color = luminance > 0.5 ? 'black' : 'white'
}

const updateColorsHash = (colors =[]) => {
    document.location.hash = colors.map(color => color.toString().substring(1)).join('-')
}

const getColorFromHash = () => {
    if (document.location.hash.length > 1) {
        return document.location.hash.substring(1).split('-').map(color => '#' + color)
    }
    return []
}

setRandomColors(true)