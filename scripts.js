let displayText = document.getElementById('display-text');
let displayAnswer = document.getElementById('display-answer');
const btnInputs = document.querySelectorAll('.input');
const btnClear = document.getElementById('btn-clear');
const btnDelete = document.getElementById('btn-delete');
const btnEquals = document.getElementById('btn-equals');

let answer = '';
let input = '';

btnInputs.forEach(button => button.addEventListener('click', (e) => {
    if (answer) displayAnswer.textContent = "";
    input += e.target.value;
    displayText.textContent = input;
}))

btnClear.addEventListener('click', () => {
    input = '';
    displayText.textContent = input;
    displayAnswer.textContent = "";
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

btnEquals.addEventListener('click', () => {
    // [] - define character set to match, '-' char needs escape next to it so it's not interperted as regex syntax
    // /g - flag indicates it will match all occurrences of the pattern in input string not just first
    let regex = /[+\-*/]/g;
    let operators = input.match(regex);
    let numbers = input.split(regex).map(Number);
    answer = numbers[0];

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
                console.log(typeof(num))
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
})