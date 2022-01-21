let a = '';
let op = '';
let b = '';

function evaluateOperator(e) {
    let operator = buttonOperMap.get(e.target.id);
    let error = document.querySelector('#error');

    if (!a && operator === '-') {
        a += '-';
        clearError();
    } else if (a && !isNaN(a) && operator !== '=' && !op) {
        op = operator;
    } else if (!b && operator === '-') {
        b += '-';
    } else if (b && !isNaN(b)) {
        try {
            let result = operate(op, Number.parseFloat(a), Number.parseFloat(b));
            a = result.toString();
            if (operator !== '=') {
                op = operator;
            } else {
                op = '';
            }
            b = '';
            clearError();
        } catch (err) {
            error.textContent = 'Error: Division by Zero!';
        }
    } else {
        error.textContent = 'Error: Malformed Expression!';
    }

    updateDisplay();
}

function appendNumButton(e) {
    let number = buttonNumMap.get(e.target.id);
    if (!op) {
        a += number;
    } else {
        b += number;
    }
    updateDisplay();
    clearError();
}

function updateDisplay() {
    let output = document.querySelector('#output')
    output.textContent = a + op + b;
}

function clearError() {
    let error = document.querySelector('#error');
    error.textContent = '';
}

function clearDisplay(e) {
    a = '';
    op = '';
    b = '';
    updateDisplay();
    clearError();
}

function popDisplay(e) {
    if (b) {
        b = b.slice(0, -1);
    } else if (op) {
        op = '';
    } else {
        a = a.slice(0, -1);
    }
    updateDisplay();
    clearError();
}

function add(left, right) {
    return left + right;
}

function subtract(left, right) {
    return left - right;
}

function multiply(left, right) {
    return left * right;
}

function divide(left, right) {
    if (right !== 0) {
        return left / right;
    } else {
        throw new Error("Division by zero");
    }
}

function operate(operator, left, right) {
    if (operator === "+") {return add(left, right);}
    else if (operator === "-") {return subtract(left, right);}
    else if (operator === "*") {return multiply(left, right);}
    else if (operator === "/") {
        if (right === 0) {
            throw new Error("Error: Division by Zero!");
        } else {
            let quotient = divide(left, right);
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
