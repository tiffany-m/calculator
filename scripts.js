let displayText = document.getElementById('display-text');

const btnNum = document.querySelectorAll('.num');
const btnOperator = document.querySelectorAll('.operator');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');

btnNum.forEach(button => button.addEventListener('click', (e) => {
    if (displayText.textContent === '_') {
        displayText.textContent = e.target.value;
    } else {
        console.log(typeof(displayText.textContent))
        displayText.textContent += e.target.value;
    }   
}))

btnClear.addEventListener('click', () => displayText.textContent = '_');

btnDelete.addEventListener('click', () => {
    let newStr = displayText.textContent;
    let len = newStr.length;

    if (len < 2) {
        return displayText.textContent = '_';
    }

    displayText.textContent = newStr.slice(0, len - 1);
});

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
    if (a === 0 || b === 0) return displayText.textContent = 'ERROR';
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