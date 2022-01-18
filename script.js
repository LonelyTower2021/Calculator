let userInput = new Array();

function equalsOperator(e) {

    let processedInput = parseUserInput();

    let total = processedInput.shift();
    while (processedInput.length !== 0) {
        let operator = processedInput.shift();
        let b = processedInput.shift();
        total = operate(operator, total, b);
    }
    
    updateUserInput(total);
    updateDisplay();
}

function parseUserInput() {
    let processedInput = new Array();
    let inputLength = userInput.length;
    let number = 0;

    for (let index = 0; index < inputLength; index++) {
        let value = userInput[index];
        if (!(isNaN(value)) && (index !== inputLength - 1)) {
            number *= 10;
            number += value;
        } else if (!(isNaN(value))) {
            number *= 10;
            number += value;
            processedInput.push(number);
            number = 0;
        } else {
            processedInput.push(number);
            processedInput.push(value);
            number = 0;
        }
    }

    return processedInput;
}

function updateUserInput(total) {
    userInput = total.toString().split('').map(strNum => parseInt(strNum));
    updateDisplay();
}

function appendNumButton(e) {
    let number = buttonNumMap.get(e.target.id);
    userInput.push(number);
    updateDisplay();
}

function appendOperButton(e) {
    let operator = buttonOperMap.get(e.target.id);
    let mathOperators = ['*', '-', '+', '/'];
    if (!userInput.some(input => mathOperators.includes(input))) {
        userInput.push(operator);
        updateDisplay();
    } else {
        let processedInput = parseUserInput();

        let total = processedInput.shift();
        while (processedInput.length !== 0) {
            let operator = processedInput.shift();
            let b = processedInput.shift();
            total = operate(operator, total, b);
        }
        
        updateUserInput(total);
        userInput.push(operator);
        updateDisplay();
    }

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

let buttonNumMap = new Map([
    ["button_0", 0],
    ["button_1", 1],
    ["button_2", 2],
    ["button_3", 3],
    ["button_4", 4],
    ["button_5", 5],
    ["button_6", 6],
    ["button_7", 7],
    ["button_8", 8],
    ["button_9", 9],
]);

let buttonOperMap = new Map([
    // ["button_(", "("],
    // ["button_)", ")"],
    // ["button_.", "."],
    ["button_/", "/"],
    ["button_*", "*"],
    ["button_-", "-"],
    ["button_+", "+"],
    ["button_=", "="],
]);

let buttonFuncMap = new Map([
    ["button_C", "C"],
    ["button_B", "B"],
]);

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    if (buttonNumMap.has(button.id)) {
        button.addEventListener('click', appendNumButton);
    } else if (buttonOperMap.has(button.id)) {
        if (button.id === "button_=") {
            button.addEventListener('click', equalsOperator);
        } else {
            button.addEventListener('click', appendOperButton);
        }
    } else if (buttonFuncMap.has(button.id)) {
        if (button.id === 'button_C') {
            button.addEventListener('click', clearDisplay);
        } else {
            button.addEventListener('click', popDisplay);
        }
    } else {
        console.log(`Button: ${button.id} not recognized.`)
    }
});
