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
    if (operator === "+") {return add(a, b);}
    else if (operator === "-") {return subtract(a, b);}
    else if (operator === "*") {return multiply(a, b);}
    else if (operator === "/") {return divide(a, b);}
    else {return NaN}
}

let userInput = new Array();
let buttonNumMap = new Map([
    ["button_7", 7],
    ["button_8", 8],
    ["button_9", 9],
    ["button_4", 4],
    ["button_5", 5],
    ["button_6", 6],
    ["button_1", 1],
    ["button_2", 2],
    ["button_3", 3],
    ["button_0", 0],
]);

let buttonOperMap = new Map([
    ["button_(", "("],
    ["button_)", ")"],
    ["button_/", "/"],
    ["button_*", "*"],
    ["button_-", "-"],
    ["button_.", "."],
    ["button_+", "+"],
]);

let buttonFuncMap = new Map([
    ["button_C", "C"],
    ["button_B", "B"],
    ["button_=", "="],
]);

function appendNumButton(e) {
    userInput.push(buttonNumMap.get(e.target.id));
    updateDisplay();
}

function appendOperButton(e) {
    userInput.push(buttonOperMap.get(e.target.id));
    updateDisplay();
}

function updateDisplay() {
    let display = document.querySelector('#display')
    display.textContent = userInput.join('');
}

function clearDisplay(e) {
    userInput.length = 0;
    updateDisplay();
}

function popDisplay(e) {
    userInput.pop();
    updateDisplay();
}

function equalsOperator(e) {
    let processed = new Array();
    let number = 0;

    for (let index = 0; index < userInput.length; index++) {
        let value = userInput[index];
        if (!(isNaN(value)) && (index !== userInput.length - 1)) {
            number *= 10;
            number += value;
        } else if (!(isNaN(value))) {
            number *= 10;
            number += value;
            processed.push(number);
            number = 0;
        } else {
            processed.push(number);
            processed.push(value);
            number = 0;
        }
    }

    let total = processed.shift();
    while (processed.length !== 0) {
        let operator = processed.shift();
        let b = processed.shift();
        total = operate(operator, total, b);
    }

    userInput = total.toString().split('');
    updateDisplay();
}

let buttons = document.querySelectorAll('.button');

buttons.forEach(button => {
    if (buttonNumMap.has(button.id)) {
        button.addEventListener('click', appendNumButton);
    } else if (buttonOperMap.has(button.id)) {
        button.addEventListener('click', appendOperButton);
    } else if (buttonFuncMap.has(button.id)) {
        if (button.id === 'button_C') {
            button.addEventListener('click', clearDisplay);
        } else if (button.id === 'button_B') {
            button.addEventListener('click', popDisplay);
        } else if (button.id === 'button_=') {
            button.addEventListener('click', equalsOperator);
        }
        else {
            throw 'Unrecognized Function was clicked.';
        }
    } else {
        throw 'Unrecognized Button was clicked.';
    }
});
