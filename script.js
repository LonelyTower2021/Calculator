let a = '';
let op = '';
let b = '';

function appendOperator(e) {
    clearError();
    let operator = '';
    if (e.type === "keydown") {
        let button_id = `button_${e.key}`;
        operator = buttonOperMap.get(button_id);
    } else {
        operator = buttonOperMap.get(e.target.id);
    }
    let error = document.querySelector('#error');

    if (operator === '-') {
        try {
            appendMinus();
        } catch (err) {
            error.textContent = err.message;
        }
    } else if (operator === '.') {
        try {
            appendDecimalSeparator();
        } catch (err) {
            error.textContent = err.message;
        }
    } else if (a && !isNaN(a) && operator !== '=' && !op && a.at(-1) !== '.') {
        op = operator;
    } else if (b && !isNaN(b) && b.at(-1) !== '.') {
        evaluateExpression(operator);
    } else {
        error.textContent = 'Error: Malformed Expression!';
    }

    updateDisplay();
}

function evaluateExpression(operator) {
    let errorFlag = false;
    try {
        let result = operate(op, Number.parseFloat(a), Number.parseFloat(b));
        a = result.toString();
    } catch (err) {
        error.textContent = 'Error: Division by Zero!';
        errorFlag = true;
    }

    if (!errorFlag) {
        if (operator !== '=') {
            op = operator;
        } else {
            op = '';
        }
        b = '';
    }
}

function appendDecimalSeparator() {
    if (!a || a === '-') {
        a += '.';
    } else if (!isNaN(a) && !op && !a.includes('.')) {
        a += '.';
    } else if (op && (!b || b === '-')) {
        b += '.';
    } else if (op && !isNaN(b) && !b.includes('.')) {
        b += '.';
    } else {
        throw new Error("Error: Malformed Expression by Decimal Separator!")
    }
}

function appendMinus() {
    if (!a) {
        a += '-';
    } else if (!op) {
        op = '-';
    } else if (!b) {
        b += '-';
    } else if (!isNaN(b) && b.at(-1) !== '.') {
        evaluateExpression('-');
    } else {
        throw new Error("Error: Malformed Expression caused by Minus!");
    }
}

function appendNumber(e) {
    let number = '';
    if (e.type === "keydown") {
        let button_id = `button_${e.key}`;
        number = buttonNumMap.get(button_id);
    } else {
        number = buttonNumMap.get(e.target.id);
    }

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

function clearValues(e) {
    a = '';
    op = '';
    b = '';
    updateDisplay();
    clearError();
}

function popValues(e) {
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
    let result = 0;
    if (operator === "+") {
        result = add(left, right);
    }
    else if (operator === "-") {
        result = subtract(left, right);
    }
    else if (operator === "*") {
        result = multiply(left, right);
    }
    else if (operator === "/") {
        if (right === 0) {
            throw new Error("Error: Division by Zero!");
        } else {
            result = divide(left, right);
        }
    }
    else {
        throw new Error("Unknown operator encountered!");
    }

    if (!Number.isInteger(result)) {
        result = round(result, 6);
    }
    return result;

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
    ["button_.", "."],
]);

let buttonFuncMap = new Map([
    ["button_C", "C"],
    ["button_B", "B"],
]);

let buttons = document.querySelectorAll('.button');
buttons.forEach(button => {
    if (buttonNumMap.has(button.id)) {
        button.addEventListener('click', appendNumber);
    } else if (buttonOperMap.has(button.id)) {
        button.addEventListener('click', appendOperator);
    } else if (buttonFuncMap.has(button.id)) {
        if (button.id === 'button_C') {
            button.addEventListener('click', clearValues);
        } else {
            button.addEventListener('click', popValues);
        }
    }
});

function appendKeyboardValue(e) {
    console.log(e);
    let button_id = `button_${e.key}`;
    if (buttonNumMap.has(button_id)) {
        appendNumber(e);
    } else if (buttonOperMap.has(button_id)) {
        appendOperator(e);
    } else if (e.key === 'Backspace') {
        popValues(e);
    } else if (e.key === 'Escape') {
        clearValues(e);
    }
}

document.addEventListener('keydown', appendKeyboardValue);
