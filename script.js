let userInput = new Array();

function evaluateOperator(e) {
    let operator = buttonOperMap.get(e.target.id);

    if (userInput.length) {
        if (!userInputHasOperator() && operator !== '=') {
            userInput.push(operator);
        } else if (userInputHasOperator() && isOperator(userInput.at(-1))) {
            let error = document.querySelector('#error');
            error.textContent = "Error: Malformed expression!";
        } else {
            let processedInput = parseUserInput();
            if (processedInput.length) {
                let total = Number.parseFloat(processedInput.shift());
                let op = processedInput.shift();
                let b = Number.parseFloat(processedInput.shift());
                try {
                    let result = operate(op, total, b);
                    updateUserInput(result);
                    if (operator !== '=') {
                        userInput.push(operator);
                    }
                    clearError();
                } catch (err) {
                    let error = document.querySelector('#error');
                    error.textContent = "Error: Division by Zero!";
                }
            }

        }

        updateDisplay();
    }
}

function parseUserInput() {
    let processedInput = new Array();
    let inputLength = userInput.length;
    let number = '';

    for (let index = 0; index < inputLength; index++) {
        let value = userInput[index];
        if (!(isNaN(value)) || value === '.') {
            if (index === 0) {
                number = value;
            } else if (index !== inputLength - 1) {
                number += value;
            } else {
                number += value;
                processedInput.push(number);
                number = '';
            }
        } else {
            processedInput.push(number);
            processedInput.push(value);
            number = '';
        }
    }

    return processedInput;
}

function updateUserInput(total) {
    let strTotal = total.toString();
    userInput = strTotal.split('');
}

function appendNumButton(e) {
    let number = buttonNumMap.get(e.target.id);
    userInput.push(number);
    updateDisplay();
    clearError();
}

function isOperator(input) {
    let mathOperators = ['*', '-', '+', '/'];
    return mathOperators.includes(input);
}

function userInputHasOperator() {
    return userInput.some(input => isOperator(input))
}

function updateDisplay() {
    let output = document.querySelector('#output')
    output.textContent = userInput.join('');
}

function clearError() {
    let error = document.querySelector('#error');
    error.textContent = '';
}

function clearDisplay(e) {
    userInput.length = 0;
    updateDisplay();
    clearError();
}

function popDisplay(e) {
    userInput.pop();
    updateDisplay();
    clearError();
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
    if (b !== 0) {
        return a / b;
    } else {
        throw "Division by zero";
    }
}

function operate(operator, a, b) {
    if (operator === "+") {return add(a, b);}
    else if (operator === "-") {return subtract(a, b);}
    else if (operator === "*") {return multiply(a, b);}
    else if (operator === "/") {
        if (b === 0) {
            throw new Error("Error: Division by Zero!");
        } else {
            let quotient = divide(a, b);
            if (!Number.isInteger(quotient)) {
                quotient = round(quotient, 6);
            }
            return quotient;
        }
    }
    else {return NaN}
}

// Credit to https://www.jacklmoore.com/notes/rounding-in-javascript/
function round(value, decimals) {
    return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

let buttonNumMap = new Map([
    ["button_0", '0'],
    ["button_1", '1'],
    ["button_2", '2'],
    ["button_3", '3'],
    ["button_4", '4'],
    ["button_5", '5'],
    ["button_6", '6'],
    ["button_7", '7'],
    ["button_8", '8'],
    ["button_9", '9'],
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
        button.addEventListener('click', evaluateOperator);
    } else if (buttonFuncMap.has(button.id)) {
        if (button.id === 'button_C') {
            button.addEventListener('click', clearDisplay);
        } else {
            button.addEventListener('click', popDisplay);
        }
    } else {
    }
});
