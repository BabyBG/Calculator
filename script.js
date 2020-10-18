//Set variables and fetches
const numberButton = document.querySelectorAll('.number') 
const display = document.getElementById('display')
const operatorButton = document.querySelectorAll('.operator')
const equalButton = document.getElementById('equal')
const clearButton = document.getElementById('clear')
let workingNumber = 0;
let tempNumber = ''
let x = 0;
let y = '';
let operator = '';
display.textContent = 0
  
//Click number button adds to display & sets 'workingNumber'.
numberButton.forEach((numberButton) => {
    numberButton.addEventListener('click', (e) => {
        const addNumber = document.createTextNode(numberButton.value);
        if ((display.textContent == '0') || (operator !== '' && tempNumber === '') || (operator === '' && x != 0)) {
            display.textContent = '';
        }
        if (display.textContent.length >= 11) {
            alert('Too many numbers!')
        }
        else if (numberButton.value === '.' && display.textContent.includes('.')) {
            alert('Display already has 1 decimal place!')
        }
        else {
            display.appendChild(addNumber);
            tempNumber += numberButton.value;
            workingNumber = parseFloat(tempNumber);
        }
    });
});

//Click operator to set 'operator'. If ?????, run equals function.
operatorButton.forEach((operatorButton) => {
    operatorButton.addEventListener('click', (d) => {
        if ((operator !== '') && (tempNumber !== '')) {
            x = equals(workingNumber, operator, x);
            workingNumber = x;
            operator = operatorButton.id;
        }
        if (operator === '') {
            operator = operatorButton.id;
            x = workingNumber;
            tempNumber = '';
        }
    })
})

//Equals button. Calls 'function equals'.
equalButton.addEventListener('click', (e) => {
    x = equals(workingNumber, operator, x);
    workingNumber = x;
    operator = '';
})

//All clear button. Resets all variables.
clearButton.addEventListener('click', (f) => {
    workingNumber = 0;
    x = 0;
    y = '';
    operator = '';
    display.textContent = '0'
    tempNumber = '';
})

//Equals Function. Calls 'function operate' and assigns/resets variables.
function equals(workingNumber, operator, x) {
    //this y = workingNumber ... maybe problematic?
    y = workingNumber;
    x = operate(operator, x, y);
    if (x.toString().length > 11) {
        for (i = 0; x.toString().length > 11; i++) {
        x = x.toString().substr(0, x.toString().length - 1);
        }
        alert('11 digit limit, result has been truncated!')
    }
    x = parseFloat(x);
    display.textContent = x;
    y = ''
    tempNumber = '';
    return x;
}

//Central calculator function
function operate(operator, x, y) {
    switch(operator) {
        case "add":
            return add(x, y);
            break;
        case "subtract":
            return subtract(x, y);
            break;
        case "multiply":
            return multiply(x, y);
            break;
        case "divide":
            if (y == 0) {
                alert("Sorry, cannot divide by zero!");
                return x;
            }
            else {
                return divide(x, y);
            }
            break;
        default: 
        x = workingNumber;
        return x;
    }
}

//Sub-functions used by central calculator function
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    return x / y;
}


//console.log('x = ' + x + ' y = ' + y + ' workingNumber = ' + workingNumber + ' tempNumber = ' + tempNumber + ' AT OPERATOR PRESS')