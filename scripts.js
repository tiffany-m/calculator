let displayInput = document.getElementById("display-input");
let displayAnswer = document.getElementById("display-answer");
const btnInputs = document.querySelectorAll(".input");
const btnClear = document.getElementById("btn-clear");
const btnDelete = document.getElementById("btn-delete");
const btnEquals = document.getElementById("btn-equals");
let input = "";
let answer = "";
let errorDisplayed = false;

function displayInputOnScreen(str) {
    displayInput.textContent = str;
}

function displayAnswerOnScreen(str) {
    displayAnswer.textContent = str;
}

function checkInputLength(str) {
    if (str.length > 23) {
        let calcError = `ERROR! TO MANY INPUTS`;
        errorDisplayed = true;
        displayInputOnScreen(calcError);
        return;
    } else {
        displayInputOnScreen(input);
    }
}

function clearScreen() {
    input = "";
    answer = "";
    displayInputOnScreen(input);
    displayAnswerOnScreen(answer);
}

function backSpace() {
    let len = input.length;

    if (len < 2) {
        input = "";
        displayInputOnScreen(input);
    }

    input = input.slice(0, len - 1);
    displayInputOnScreen(input);
}

function calculateEquation() {
    // [] - define character set to match, "-" char needs escape next to it so it"s not interperted as regex syntax
    // /g - flag indicates it will match all occurrences of the pattern in input string not just first
    let regex = /[+\-*/]/g;
    let operators = input.match(regex);
    let numbers = input.split(regex).map(Number);
    answer = numbers[0];

    if (operators === null) {
        displayAnswerOnScreen(input);
        input = "";
        displayInputOnScreen(input);
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
                    answer = "";
                    errorDisplayed = true;
                    displayInputOnScreen(calcError);
                    return displayAnswerOnScreen(answer);
                } else {
                    answer /= num;
                }
                break;
            default:
                let calcError = "ERROR!";
                errorDisplayed = false;
                displayAnswerOnScreen(calcError);
        }
    }

    let roundedAnswer = Math.round(answer * 100) / 100

    displayAnswerOnScreen(roundedAnswer);
    input = "";
    displayInputOnScreen(input);
}

btnInputs.forEach(button => button.addEventListener("click", (e) => {
    if (errorDisplayed) {
        errorDisplayed = false;
        input = "";
        answer = "";
        displayInputOnScreen(input);
        displayAnswerOnScreen(answer);
    }

    if (answer) {
        answer = "";
        displayAnswerOnScreen(answer);
    }

    input += e.target.value;

    checkInputLength(input);
}))

btnClear.addEventListener("click", () => {
    clearScreen();
});

btnDelete.addEventListener("click", () => {
    backSpace();
});

btnEquals.addEventListener("click", () => {
    calculateEquation();
})

// keyboard support
document.onkeydown = function (e) {
    let charNotAllowed = "abdefghijklmnopqrstuvwxyzABDEFGHIJKLMNOPQRSTUVWXYZ,?!@#$%^&()_;:'<>~|";
    let otherKeysNotAllowed = ["Tab", "Capslock", "Control", "Alt", "NumLock", "Home", "ArrowUp", "PageUp", "ArrowLeft", "ArrowRight", "ArrowDown", "PageDown", "Clear", "End", "Insert"];
    // for the forward slash button used for division
    e.preventDefault()

    if(charNotAllowed.includes(e.key) || otherKeysNotAllowed.includes(e.key)) return;

    if (answer) {
        answer = "";
        displayAnswerOnScreen(answer);
    }

    if (e.key === "c" || e.key === "C") {
        clearScreen();
        return;
    }

    if (e.key === "Backspace") {
        backSpace();
        return;
    }

    if (e.key === "Shift") return;

    if (e.key === "=" || e.key === "Enter") {
        calculateEquation();
        return;
    }

    input += e.key;
    checkInputLength(input);
};