const inputField = document.getElementById('inputField');

const addNumber = function(number) {
    inputField.value += number;
};

const backSpace = function() {
    inputField.value = inputField.value.slice(0, -1);
};

const reset = function() {
    inputField.value = '';
    document.getElementById('results').value = '';
};

const addParanthesis = function() {
    const open = (inputField.value.split('(').length <= inputField.value.split(')').length) ? '(' : ')';
    inputField.value += open;
};

const addSymbol = function(symbol) {
    inputField.value += symbol;
};


const arrToNumbers = function(array) {
    const returnArray = [];
    let currentNumber = "";

    for (let i = 0; i < array.length; i++) {
        const char = array[i];
        const prev = array[i - 1];
        const next = array[i + 1];

        
        const isUnaryMinus = char === '-' && 
            (i === 0 || ['+', '-', '*', '/', '^', '(', 'u-'].includes(prev));

        if (isUnaryMinus) {
            
            if (currentNumber !== "") {
                returnArray.push(Number(currentNumber));
                currentNumber = "";
            }
            returnArray.push('u-');
        }
        else if ('+-*/^()'.includes(char)) {
            if (currentNumber !== "") {
                returnArray.push(Number(currentNumber));
                currentNumber = "";
            }
            returnArray.push(char);
        }
        else {
            currentNumber += char;
            if (i === array.length - 1 || '+-*/^()'.includes(array[i + 1])) {
                returnArray.push(Number(currentNumber));
                currentNumber = "";
            }
        }
    }

    return returnArray;
};


const calculate = function(array) {
    
    const pemdas = [
    ['^'],        
    ['u-'],       
    ['*', '/'],   
    ['+', '-']    
    ];
    
    const operations = {
        'u-': (a) => -a, 
        '^': (a, b) => Math.pow(a, b),
        '*': (a, b) => a * b,
        '/': (a, b) => a / b,
        '+': (a, b) => a + b,
        '-': (a, b) => a - b
    };

    for (let ops of pemdas) {
        let i = 0;
        while (i < array.length) {
            if (ops.includes(array[i])) {
                if (array[i] === 'u-') {
                    
                    array.splice(i, 2, operations['u-'](array[i + 1]));
                } else {
                    
                    array.splice(i - 1, 3, operations[array[i]](array[i - 1], array[i + 1]));
                    i--;
                }
            } else {
                i++;
            }
        }
    }
    return array[0];
};


const betweenParanthesis = function(array) {
    while (array.includes('(')) {
        const left = array.lastIndexOf('(');
        const right = array.indexOf(')', left);
        if (right === -1) throw new Error();
        const result = calculate(array.slice(left + 1, right));
        array.splice(left, right - left + 1, result);
    }
    
    
    return array;
};


const equals = function() {
    try {
        let inputString = inputField.value.replace(/\s+/g, '');
        let array = inputString.split('');
        if (array.length === 1) {
            document.getElementById('results').value = array[0];
            return;
        }
        array = arrToNumbers(array);
        array = betweenParanthesis(array);
        const r = calculate(array);

        if (isNaN(r)) throw new Error();

        document.getElementById('results').value = parseFloat(r.toFixed(10));
    } catch (error) {
        document.getElementById('results').value = 'SYNTAX ERROR';
    }
};
