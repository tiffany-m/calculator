let displayText = document.getElementById('display-text');
let btnClicked = document.querySelectorAll('.btn')

btnClicked.forEach(button => button.addEventListener('click', (e) => {
    displayText.textContent = displayText.textContent + e.target.value;
}))


function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}

function operate(operator, a, b) {
    switch(operator) {
        case '+':
            add(a, b);
            break;
        case '-':
            subtract(a, b);
            break;
        case 'x':
            multiply(a, b);
            break;
        case '/':
            divide(a, b);
            break;
        default:
            console.log("ERROR");
    }
}