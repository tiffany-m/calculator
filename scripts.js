let displayText = document.getElementById('display-text');
let displayAnswer = document.getElementById('display-answer');
const btnInputs = document.querySelectorAll('.input');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');

let input = '';
let answer = '';

function displayTextOnScreen(str) {
    displayText.textContent = str;
}

function displayAnswerOnScreen(str) {
    displayAnswer.textContent = str;
}

function checkInputLength(str) {
    if (str.length > 23) {
        let calcError = `ERROR! TO MANY INPUTS`;
        displayTextOnScreen(calcError);
        return;
    } else {
        displayTextOnScreen(input);
    }
}

function clearScreen() {
    input = '';
    answer = '';
    displayTextOnScreen(input);
    displayAnswerOnScreen(answer);
}

function backSpace() {
    let len = input.length;

    if (len < 2) {
        input = '';
        displayTextOnScreen(input);
    }

    input = input.slice(0, len - 1);
    displayTextOnScreen(input);
}

function calculateEquation() {
    // [] - define character set to match, '-' char needs escape next to it so it's not interperted as regex syntax
    // /g - flag indicates it will match all occurrences of the pattern in input string not just first
    let regex = /[+\-*/]/g;
    let operators = input.match(regex);
    let numbers = input.split(regex).map(Number);
    answer = numbers[0];

    if (operators === null) {
        let calcError = "ERROR!";
        displayTextOnScreen(calcError);
    }

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
                if (num === 0) {
                    let calcError = "ERROR! CANNOT DIVIDE BY ZERO!";
                    let answer = '';
                    displayText.style.paddingLeft = "10px";
                    displayText.style.fontSize = "20px";
                    displayTextOnScreen(calcError);
                    return displayAnswerOnScreen(answer);
                } else {
                    answer /= num;
                }
                break;
            default:
                let calcError = "ERROR!";
                displayAnswerOnScreen(calcError);
        }
    }

    let roundedAnswer = Math.round(answer * 100) / 100

    displayAnswerOnScreen(roundedAnswer);
    input = "";
    displayTextOnScreen(input);
}

btnInputs.forEach(button => button.addEventListener('click', (e) => {
    if (answer) {
        answer = "";
        displayAnswerOnScreen(answer);
    }

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
    if (answer) {
        answer = "";
        displayAnswerOnScreen(answer)
    }

    if (e.key === 'c') {
        clearScreen();
        return;
    }

    if (e.key === 'Backspace') {
        backSpace();
        return;
    }

    if (e.key === 'Shift') return;

    if (e.key === '=' || e.key === 'Enter') {
        calculateEquation();
        return;
    }

    input += e.key;
    checkInputLength(input);
};