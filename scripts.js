let displayText = document.getElementById('display-text');
let displayAnswer = document.getElementById('display-answer');
const btnInputs = document.querySelectorAll('.input');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');

let answer = '';
let input = '';

btnInputs.forEach(button => button.addEventListener('click', (e) => {
    input += e.target.value;
    displayText.textContent = input;
}))

btnClear.addEventListener('click', () => {
    input = '';
    displayText.textContent = input;
});

btnDelete.addEventListener('click', () => {
    let len = input.length;

    if (len < 2) {
        input = '';
        displayText.textContent = input;
    }

    input = input.slice(0, len - 1);
    displayText.textContent = input;
});

function add(a, b) {
    return displayText.textContent = a + b;
}

function subtract(a, b) {
    return displayText.textContent = a - b;
}

function multiply(a, b) {
    return displayText.textContent = a * b;
}

function divide(a, b) {
    if (a === 0 || b === 0) return displayText.textContent = 'ERROR';
    return displayText.textContent = a / b;
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