let displayText = document.getElementById('display-text');
let displayAnswer = document.getElementById('display-answer');
const btnInputs = document.querySelectorAll('.input');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');

let answer = '';
let input = '';

function checkInputLength(str) {
    if (str.length > 23) {
        displayText.textContent = `ERROR! TO MANY INPUTS`;
        return;
    } else {
        displayText.textContent = input;
    }
}

function clearScreen() {
    input = '';
    displayText.textContent = input;
    displayAnswer.textContent = "";
}

function backSpace() {
    let len = input.length;

    if (len < 2) {
        input = '';
        displayText.textContent = input;
    }

    input = input.slice(0, len - 1);
    displayText.textContent = input;
}

function calculateEquation() {
    // [] - define character set to match, '-' char needs escape next to it so it's not interperted as regex syntax
    // /g - flag indicates it will match all occurrences of the pattern in input string not just first
    let regex = /[+\-*/]/g;
    let operators = input.match(regex);
    let numbers = input.split(regex).map(Number);
    answer = numbers[0];

    if (operators === null) return displayText.textContent = "ERROR!";

    for (let i = 0; i < operators.length; i++) {
        let op = operators[i];
        let num = numbers[i + 1];
        switch (op) {
            case "+":
                answer += num;
                break;
            case "-":
                answer -= num;
                break;
            case "*":
                answer *= num;
                break;
            case "/":
                console.log(num);
                console.log(typeof (num))
                if (num === 0) {
                    displayText.style.paddingLeft = "10px";
                    displayText.style.fontSize = "20px";
                    displayText.textContent = "ERROR! CANNOT DIVIDE BY ZERO!";
                    return displayAnswer.textContent = "";
                } else {
                    answer /= num;
                }
                break;
            default:
                displayAnswer.textContent = "ERROR!"
        }
    }

    let roundedAnswer = Math.round(answer * 100) / 100

    displayAnswer.textContent = roundedAnswer;
    input = "";
    displayText.textContent = input;
}

btnInputs.forEach(button => button.addEventListener('click', (e) => {
    if (answer) displayAnswer.textContent = "";
    input += e.target.value;

    checkInputLength(input);
}))

btnClear.addEventListener('click', () => {
    clearScreen();
});

btnDelete.addEventListener('click', () => {
    backSpace();
});

btnEquals.addEventListener('click', () => {
    calculateEquation();
})

document.onkeydown = function (e) {
    console.log(e)
    if (answer) displayAnswer.textContent = "";

    if (e.key === 'c') {
        clearScreen();
        return;
    }

    if (e.key === 'Backspace') {
        backSpace();
        return;
    }

    if (e.key === 'Shift') return;

    if (e.key === '=') {
        calculateEquation();
        return;
    }

    input += e.key;
    checkInputLength(input);
};