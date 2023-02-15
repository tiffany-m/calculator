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

btnEquals.addEventListener('click', () => {
    let regex = /[+\-*/]/g;
    console.log("input", input)
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
                answer /= num;
                break;
            default:
                console.log("ERROR");
        }
    }

    displayAnswer.textContent = answer;
    input = "";
})